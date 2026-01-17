import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type SearchParams = {
  name: string;
  value?: string;
  industry?: string;
};

type SearchComponentProps = {
  valueEnumValues: string[];
  industryEnumValues: string[];
  onSearch: (params: SearchParams) => void;
};

export default function SearchComponent({
  valueEnumValues,
  industryEnumValues,
  onSearch,
}: SearchComponentProps) {
  const [name, setSearch] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>();
  const [selectedIndustry, setSelectedIndustry] = React.useState<string | undefined>();

  const submitSearch = () => {
    onSearch({
      name: name.trim(),
      value: selectedValue,
      industry: selectedIndustry,
    });
  };

  return (
    <form
      className="mx-auto w-full rounded-2xl bg-neutral-300 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        submitSearch();
      }}
    >
      <Input
        className="w-full bg-white rounded-lg"
        placeholder="Pretraži po imenu ili opisu..."
        value={name}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="rounded-full px-4 flex items-center gap-2">
              {selectedValue ?? "Vrednosti"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {valueEnumValues.map((opt) => (
              <DropdownMenuItem
                key={opt}
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  setSelectedValue(opt);
                }}
              >
                {opt}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="rounded-full px-4 flex items-center gap-2">
              {selectedIndustry ?? "Industrije"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {industryEnumValues.map((opt) => (
              <DropdownMenuItem
                key={opt}
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  setSelectedIndustry(opt);
                }}
              >
                {opt}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Button type="submit" className="mt-4 w-full" onClick={submitSearch}>
        Pretraži
      </Button>
    </form>
  );
}
