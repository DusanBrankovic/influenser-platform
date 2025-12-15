import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import type { InputFieldProps } from "@/types/input.types";
import { Input } from "@/components/ui/input";

const InputField: React.FC<InputFieldProps> = ({
  fieldplaceholder,
  fieldtype,
  inputValue,
}: InputFieldProps) => {
  return (
    <FormItem>
      <FormControl>
        <Input
          placeholder={fieldplaceholder}
          type={fieldtype}
          value={inputValue}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default InputField;
