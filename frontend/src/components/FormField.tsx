import { InputGroup, InputGroupButton } from "./ui/input-group";
import { GoogleFontIcon } from "@/assets/icons/GoogleFontIcon";
import { Input } from "./ui/input";
import { Field, FieldError } from "./ui/field";
import { PasswordIcon } from "./PasswordIcon";
import { useState, type FocusEventHandler } from "react";

interface FormFieldProps {
  name: string;
  isInvalid: boolean;
  icon: string;
  field: {
    name: string;
    state: {
      value: string | number | readonly string[] | undefined;
      meta: {
        errors: ({ message?: string | undefined } | undefined)[];
      };
    };
    handleBlur: FocusEventHandler<HTMLInputElement>;
    handleChange: (value: string) => void;
  };
  placeholder: string;
  inputType: string;
}

export default function FormField({
  isInvalid,
  icon,
  field,
  placeholder,
  inputType,
}: FormFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Field data-invalid={isInvalid}>
      <InputGroup>
        <InputGroupButton className="border-none shadow-none">
          <GoogleFontIcon icon={icon} />
        </InputGroupButton>
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder={placeholder}
          autoComplete="off"
          type={
            inputType != "password" || (inputType === "password" && isVisible)
              ? "text"
              : "password"
          }
        />
        {inputType === "password" && (
          <InputGroupButton onClick={() => setIsVisible(!isVisible)}>
            <PasswordIcon isVisible={isVisible} />
          </InputGroupButton>
        )}
      </InputGroup>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
