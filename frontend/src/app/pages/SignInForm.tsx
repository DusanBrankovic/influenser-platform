import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import InputField from "@/components/InputField";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(8, { message: "Password needs to have at least 8 characters." }),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
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
          name="password"
          render={() => (
            <InputField
              fieldplaceholder="Lozinka"
              fieldtype="password"
              inputValue=""
            />
          )}
        />

        <Checkbox id="memorize" />

        <Button
          type="submit"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
