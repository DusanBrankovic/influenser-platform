import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
  .min(8, { message: "Lozinka mora imati najmanje 8 karaktera." })
  .max(32, { message: "Lozinka može imati najviše 32 karaktera." })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Lozinka mora sadržati bar jedno veliko slovo.",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Lozinka mora sadržati bar jedno malo slovo.",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Lozinka mora sadržati bar jedan broj.",
  })
  .refine((password) => /[!@#$%^&*()_+={}[\]|:;"'<>,.?/-]/.test(password), {
    message: "Lozinka mora sadržati bar jedan specijalni karakter.",
  });

const passwordConfirmationSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lozinke se ne poklapaju.",
    path: ["confirmPassword"],
  });

const formSchema = z.object({
  username: z
    .string()
    .min(5, "Korisničko ime mora imati najmanje 5 karaktera.")
    .max(12, "Korisničko ime može imati najviše 12 karaktera."),
  fullname: z
    .string()
    .min(5, "Ime i prezime mora imati najmanje 5 karaktera.")
    .max(100, "Ime i prezime može imati najviše 100 karaktera.")
    .includes(" ", { message: "Unesite ime i prezime (sa razmakom)." }),
  email: z
    .email({ message: "Unesite ispravnu e-mail adresu." })
    .min(5, "E-mail adresa mora imati najmanje 5 karaktera.")
    .max(32, "E-mail adresa može imati najviše 32 karaktera."),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Morate prihvatiti uslove korišćenja.",
  }),
  rememberMe: z.boolean()
});

const combinedSchema = formSchema.merge(passwordConfirmationSchema);

const Register = ({ 
  onSwitchToSignIn
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
        role: "INFLUENCER"
      };

      console.log("Registering user:", user);
      registerApi(user);

      setIsRegistered()
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
      placeholder: "Ime i Prezime",
      type: "text",
    },
    {
      name: "username",
      icon: "alternate_email",
      placeholder: "Korisnicko ime",
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
      placeholder: "Lozinka",
      type: "password",
    },
    {
      name: "confirmPassword",
      icon: "lock",
      placeholder: "Potvrdi lozinku",
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
                      <Label htmlFor="rememberMe">Zapamti me</Label>
                    </div>
                  )}
                </form.Field>
                <form.Field name="termsAccepted">
                  {(field) => {
                    const showError =
                      (form.state.submissionAttempts > 0 || field.state.meta.isTouched) &&
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
                          <Label htmlFor="termsAccepted">Prihvatam uslove koriscenja</Label>
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
                  Registrujte se
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
                  Vec imate nalog?
                  <Button
                    type="button"
                    variant="link"
                    className="pl-2 align-baseline text-primary font-extrabold underline"
                    onClick={onSwitchToSignIn}
                  >
                    Ulogujte se
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
