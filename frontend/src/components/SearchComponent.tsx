import { Input } from "@/components/ui/input";

type SearchComponentProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchComponent({ value, onChange }: SearchComponentProps) {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl bg-neutral-300 p-4">
      <Input
        className="w-full"
        placeholder="Pretraži po imenu ili opisu..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>

  );
}
