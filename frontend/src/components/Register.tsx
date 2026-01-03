"use client";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { GoogleFontIcon } from "@/assets/icons/GoogleFontIcon";
import { InputGroup, InputGroupButton } from "@/components/ui/input-group";
import type { User } from "@/auth/auth.types";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .max(32, { message: "Password must be a maximum of 32 characters long." })
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
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

const formSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters.")
    .max(12, "Username title must be at most 32 characters."),
  fullname: z
    .string()
    .min(5, "Fullname must be at least 20 characters.")
    .max(100, "Fullname must be at most 100 characters.")
    .includes(" "),
  email: z
    .email()
    .min(5, "Email title must be at least 5 characters.")
    .max(32, "Email title must be at most 32 characters."),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  rememberMe: z.boolean().refine((val) => val === true, {
    message: "Remember your password",
  }),
});

const combinedSchema = formSchema.merge(passwordConfirmationSchema);

const Register = ({
  onSwitchToSignIn,
  onRegister,
}: {
  onSwitchToSignIn: () => void;
  onRegister: (user: User, token: string) => void;
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
      await onRegister(
        {
          fullname: value.fullname,
          username: value.username,
          email: value.email,
          headline: "Registered",
          role: "user",
          password: value.password,
        },
        "token"
      );
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

  return (
    <div className="w-full flex flex-col justify-start items-center">
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
                      <Field data-invalid={isInvalid}>
                        <InputGroup>
                          <InputGroupButton className="border-none shadow-none outline-l-none">
                            <GoogleFontIcon icon={icon} />
                          </InputGroupButton>
                          <Input
                            id={field.name}
                            className="border-l-0 outline-l-0 shadow-none"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder={placeholder}
                            autoComplete="off"
                            type={type}
                          />
                        </InputGroup>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
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
                {(field) => (
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="termsAccepted"
                      checked={field.state.value}
                      onCheckedChange={(val) => field.handleChange(!!val)}
                    />
                    <Label htmlFor="termsAccepted">
                      Prihvatam uslove koriscenja
                    </Label>
                  </div>
                )}
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
    </div>
  );
};

export default Register;
