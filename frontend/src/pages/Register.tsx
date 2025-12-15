"use client";
import { useForm } from "@tanstack/react-form";
import { toast, Toaster } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { GoogleFontIcon } from "@/assets/icons/GoogleFontIcon";
import { InputGroup, InputGroupButton } from "@/components/ui/input-group";

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
    path: ["confirmPassword"], // Specifies where the error message should be attached
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
});

const Register = ({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) => {
  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: formSchema && passwordConfirmationSchema,
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
    },
  });

  const formFieldsArr: Array<{
    name: "password" | "confirmPassword" | "username" | "fullname" | "email";
    icon: string;
    placeholder: string;
  }> = [
    {
      name: "fullname",
      icon: "person",
      placeholder: "Ime i Prezime",
    },
    {
      name: "username",
      icon: "alternate_email",
      placeholder: "Korisnicko ime",
    },
    {
      name: "email",
      icon: "Mail",
      placeholder: "E-mail",
    },
    {
      name: "password",
      icon: "lock",
      placeholder: "Lozinka",
    },
    {
      name: "confirmPassword",
      icon: "lock",
      placeholder: "Potvrdi lozinku",
    },
  ];

  return (
    <div className="h-screen w-full flex flex-col justify-start items-center">
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
              {formFieldsArr.map(({ name, icon, placeholder }) => (
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
              <div className="flex items-center gap-3">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Zapamti me</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Prihvatam uslove koriscenja</Label>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-full">
            <Field orientation="horizontal">
              <Button
                type="submit"
                className="w-full outline-none"
                form="bug-report-form"
                size="lg"
              >
                Registrujte se
              </Button>
            </Field>
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

          <Toaster />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
