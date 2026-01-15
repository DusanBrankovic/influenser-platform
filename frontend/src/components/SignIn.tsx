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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@radix-ui/react-separator";
import type { User } from "@/auth/auth.types";
import { useAuthStore } from "@/auth/authStore";
import type { SignInProps } from "./signin.types";
import { useNavigate } from "@tanstack/react-router";
import FormField from "./FormField";

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

const signInSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters.")
    .max(12, "Username title must be at most 32 characters."),
  password: passwordSchema,
  rememberMe: z.boolean(),
});

const SignIn: React.FC<SignInProps> = ({ onSwitchToSignUp, onGuest }) => {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async ({
    value,
  }: {
    value: {
      username: string;
      password: string;
      rememberMe: boolean;
    };
  }) => {
    const { username, password } = value;

    const user: User = {
      fullname: "User",
      email: "user@local",
      username: username || "username",
      headline: "Login",
      role: "user",
      password,
    };

    login(user, "token");

    localStorage.setItem(
      "auth",
      JSON.stringify({ isAuthenticated: true, user })
    );
    navigate({ to: "/profile" });
  };

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: handleSubmit,
  });

  const formFieldsArr: Array<{
    name: "password" | "username";
    icon: string;
    placeholder: string;
    type: string;
  }> = [
    {
      name: "username",
      icon: "alternate_email",
      placeholder: "Broj telefona, e-mail ili korisnicko ime",
      type: "text",
    },

    {
      name: "password",
      icon: "lock",
      placeholder: "Lozinka",
      type: "password",
    },
  ];

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <Card className="rounded-none w-full ">
        <CardHeader></CardHeader>
        <CardContent>
          <form
            id="sign-in-form"
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
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
            <FieldGroup className="flex flex-col md:flex-row justify-between items-baseline py-5">
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
              <p className="mt-4 text-sm">
                <Button
                  type="button"
                  variant="link"
                  className="h-auto text-primary font-normal underline"
                >
                  Zaboravili ste lozinku?
                </Button>
              </p>
            </FieldGroup>
            <Field orientation="horizontal">
              <Button type="submit" className="outline-none w-full" size="lg">
                Prijavite se
              </Button>
            </Field>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-full gap-6 justify-center items-center">
            <Field className="flex flex-row flex-1 gap-8 justify-center items-center">
              <Separator
                orientation="horizontal"
                decorative
                className="w-100% border border-background my-4"
              />
              <p className="flex flex-row flex-1 text-primary/80 font-medium justify-center items-center">
                ILI
              </p>
              <Separator
                orientation="horizontal"
                decorative
                className="w-100% border border-background my-4"
              />
            </Field>
            {/*feat-146-temporarily removing third party sign ins*/}
            {/* <Field className="max-w-max flex flex-col gap-2.5 py-5 justify-center items-center">
              <Button variant="default" size="sm">
                <img src={google} />
                <span className="font-light">Prijavite se uz Google </span>
              </Button>
              <Button variant="default" size="sm">
                <img src={apple} />
                <span className="font-light">Prijavite se uz Apple </span>
              </Button>
            </Field> */}
            <Field
              className="flex flex-row flex-1 justify-center items-center gap-2"
              orientation="horizontal"
            >
              <p className="mt-4 text-sm text-primary">
                Nemate nalog?
                <Button
                  type="button"
                  variant="link"
                  className="h-auto pl-2 align-baseline text-primary font-extrabold underline"
                  onClick={onSwitchToSignUp}
                >
                  Kreirajte nalog
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
                Nastavi kao gost
              </Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
export default SignIn;
