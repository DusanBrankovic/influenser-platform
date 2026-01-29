import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import FormField from "./FormField";
import { registerApi } from "@/services/authService";
import RegSuccessScreen from "./RegSuccess";
import { getActions, useIsRegistered } from "@/auth/authStore";
import type { RegisterPayload } from "@/types/auth.types";

const { setIsRegistered } = getActions();

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .max(32, { message: "Password can be at most 32 characters long." })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter.",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter.",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number.",
  })
  .refine((password) => /[!@#$%^&*()_+={}[\]|:;"'<>,.?/-]/.test(password), {
    message: "Password must contain at least one special character.",
  });

const passwordConfirmationSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const formSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters long.")
    .max(12, "Username can be at most 12 characters long."),
  fullname: z
    .string()
    .min(5, "Full name must be at least 5 characters long.")
    .max(100, "Full name can be at most 100 characters long.")
    .includes(" ", { message: "Please enter both first and last name (with a space)." }),
  email: z
    .email({ message: "Please enter a valid email address." })
    .min(5, "Email must be at least 5 characters long.")
    .max(32, "Email can be at most 32 characters long."),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms of service.",
  }),
  rememberMe: z.boolean(),
});

const combinedSchema = formSchema.merge(passwordConfirmationSchema);

const Register = ({
  onSwitchToSignIn,
}: {
  onSwitchToSignIn: () => void;
}) => {
  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
      termsAccepted: false,
    },

    validators: {
      onSubmit: combinedSchema,
    },
    onSubmit: async ({ value }) => {
      const user: RegisterPayload = {
        email: value.email,
        name: value.fullname,
        password: value.password,
        role: "INFLUENCER",
      };

      console.log("Registering user:", user);
      registerApi(user);

      setIsRegistered();
    },
  });

  const formFieldsArr: Array<{
    name: "password" | "confirmPassword" | "username" | "fullname" | "email";
    icon: string;
    placeholder: string;
    type: string;
  }> = [
    {
      name: "fullname",
      icon: "person",
      placeholder: "Full Name",
      type: "text",
    },
    {
      name: "username",
      icon: "alternate_email",
      placeholder: "Username",
      type: "text",
    },
    {
      name: "email",
      icon: "Mail",
      placeholder: "E-mail",
      type: "email",
    },
    {
      name: "password",
      icon: "lock",
      placeholder: "Password",
      type: "password",
    },
    {
      name: "confirmPassword",
      icon: "lock",
      placeholder: "Confirm password",
      type: "password",
    },
  ];

  const isRegistered = useIsRegistered();

  return (
    <div className="w-full flex flex-col justify-start items-center">
      {isRegistered ? (
        <RegSuccessScreen onSwitchToSignIn={onSwitchToSignIn} />
      ) : (
        <Card className="w-full">
          <CardHeader></CardHeader>
          <CardContent className="w-100%">
            <form
              id="sign-up-form"
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                {formFieldsArr.map(({ name, icon, placeholder, type }) => (
                  <form.Field
                    name={name}
                    key={name}
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <FormField
                          field={field}
                          name={field.name}
                          icon={icon}
                          inputType={type}
                          isInvalid={isInvalid}
                          placeholder={placeholder}
                          key={name}
                        />
                      );
                    }}
                  />
                ))}
              </FieldGroup>

              <FieldGroup className="flex flex-col gap-2.5 py-5">
                <form.Field name="rememberMe">
                  {(field) => (
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="rememberMe"
                        checked={field.state.value ?? false}
                        onCheckedChange={(val) => field.handleChange(!!val)}
                      />
                      <Label htmlFor="rememberMe">Remember me</Label>
                    </div>
                  )}
                </form.Field>

                <form.Field name="termsAccepted">
                  {(field) => {
                    const showError =
                      (form.state.submissionAttempts > 0 ||
                        field.state.meta.isTouched) &&
                      !field.state.meta.isValid;

                    return (
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id="termsAccepted"
                            checked={field.state.value}
                            onCheckedChange={(val) => field.handleChange(!!val)}
                            onBlur={field.handleBlur} // important
                          />
                          <Label htmlFor="termsAccepted">
                            I accept the terms of service
                          </Label>
                        </div>

                        {showError && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors?.[0]?.message}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>
              </FieldGroup>

              <Field orientation="horizontal">
                <Button type="submit" className="w-full outline-none" size="lg">
                  Register
                </Button>
              </Field>
            </form>
          </CardContent>

          <CardFooter>
            <div className="flex flex-col w-full">
              <Field
                className="flex flex-row flex-1 justify-center items-center gap-2"
                orientation="horizontal"
              >
                <p className="mt-4 text-sm text-primary">
                  Already have an account?
                  <Button
                    type="button"
                    variant="link"
                    className="pl-2 align-baseline text-primary font-extrabold underline"
                    onClick={onSwitchToSignIn}
                  >
                    Sign in
                  </Button>
                </p>
              </Field>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Register;
