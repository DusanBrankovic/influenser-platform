import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { getActions } from "@/auth/authStore";
import type { SignInProps } from "../types/signin.types";
import { useNavigate } from "@tanstack/react-router";
import FormField from "./FormField";
import { loginApi } from "@/services/authService";
import type { LoginPayload } from "@/types/auth.types";
import { useState } from "react";

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

const signInSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address." })
    .min(5, "Email must be at least 5 characters long.")
    .max(32, "Email can be at most 32 characters long."),
  password: passwordSchema,
  rememberMe: z.boolean(),
});

const { setAccessToken } = getActions();

const SignIn: React.FC<SignInProps> = ({ onSwitchToSignUp, onGuest }) => {
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async ({
    value,
  }: {
    value: { email: string; password: string; rememberMe: boolean };
  }) => {
    setAuthError(null);

    try {
      const payload: LoginPayload = {
        email: value.email,
        password: value.password,
        rememberMe: value.rememberMe,
      };

      const response = await loginApi(payload);
      setAccessToken(response.accessToken);

      navigate({ to: "/profile" });
    } catch (err: any) {
      const status = err?.status;
      if (status === 401 || status === 403) setAuthError("Incorrect email or password.");
      else setAuthError("An error occurred. Please try again.");
    }
  };

  const form = useForm({
    defaultValues: { email: "", password: "", rememberMe: false },
    validators: { onSubmit: signInSchema },
    onSubmit: handleSubmit,
  });

  const formFieldsArr: Array<{
    name: "password" | "email";
    icon: string;
    placeholder: string;
    type: string;
  }> = [
    { name: "email", icon: "alternate_email", placeholder: "E-mail", type: "text" },
    { name: "password", icon: "lock", placeholder: "Password", type: "password" },
  ];

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <Card className="rounded-none w-full">
        <CardHeader />
        <CardContent>
          <form
            id="sign-in-form"
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {formFieldsArr.map(({ name, icon, placeholder, type }) => (
                <form.Field
                  key={name}
                  name={name}
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
                      />
                    );
                  }}
                />
              ))}
            </FieldGroup>

            {authError && (
              <Label className="block rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {authError}
              </Label>
            )}

            <FieldGroup className="flex flex-col md:flex-row justify-between items-baseline py-5">
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
            </FieldGroup>

            <Field orientation="horizontal">
              <Button type="submit" className="outline-none w-full" size="lg">
                Sign in
              </Button>
            </Field>
          </form>
        </CardContent>

        <CardFooter>
          <div className="flex flex-col w-full gap-6 justify-center items-center">
            <Field
              className="flex flex-row flex-1 justify-center items-center gap-2"
              orientation="horizontal"
            >
              <p className="mt-4 text-sm text-primary">
                Don’t have an account?
                <Button
                  type="button"
                  variant="link"
                  className="h-auto pl-2 align-baseline text-primary font-extrabold underline"
                  onClick={onSwitchToSignUp}
                >
                  Create one
                </Button>
              </p>
            </Field>

            <p className="flex flex-row justify-center items-center mt-4 text-sm">
              <Button
                type="button"
                variant="link"
                onClick={onGuest}
                className="h-auto pl-2 align-baseline text-primary font-extrabold"
              >
                Continue as guest
              </Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
