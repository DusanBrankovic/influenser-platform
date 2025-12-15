import { Form } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import InputField from "@/components/InputField";
import { FormField } from "@/components/ui/form";

const formSchema = z.object({
  fullname: z.string().includes(" ", {
    message: "Molim Vas upisite svoje puno ime.",
  }),
  username: z.string().min(2, {
    message: "Korisnicko ime mora sadrzati minimum 2 karaktera.",
  }),
  email: z.string().includes("@", {
    message: "Upisite vasu e-mail adresu u pravilnom formatu.",
  }),
  password: z
    .string()
    .min(8, { message: "Lozinka mora sadrzati minimum 8 karaktera." }),
  confirmpassword: z
    .string()
    .min(8, { message: "Lozinke se moraju podudarati!" }),
});

const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="fullname"
          render={() => (
            <InputField
              fieldplaceholder="Ime i prezime"
              fieldtype="text"
              inputValue=""
            />
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={() => (
            <InputField
              fieldplaceholder="Korisnicko ime"
              fieldtype="text"
              inputValue=""
            />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={() => (
            <InputField
              fieldplaceholder="E-mail"
              fieldtype="email"
              inputValue=""
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={() => (
            <InputField
              fieldplaceholder="Lozinka"
              fieldtype="password"
              inputValue=""
            />
          )}
        />
        <FormField
          control={form.control}
          name="confirmpassword"
          render={() => (
            <InputField
              fieldplaceholder="Potvrdi lozinku"
              fieldtype="password"
              inputValue=""
            />
          )}
        />

        <Checkbox id="memorize" />
        <Checkbox id="terms" />

        <Button
          type="submit"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <p>Registrujte se</p>
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
