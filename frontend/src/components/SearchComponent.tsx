import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, Search, X } from "lucide-react";

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
    <form className="bg-neutral-200"
      onSubmit={(e) => {
        e.preventDefault();
        submitSearch();
      }}
    >
      <div className="mx-auto w-full rounded-2xl bg-neutral-300 p-4">
        <div className="flex w-full flex-col items-center justify-center sm:flex-row sm:items-center sm:gap-4">
          <Input
            className="h-10 w-full sm:flex-[9] bg-white rounded-lg"
            placeholder="Search by name..."
            value={name}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
          />

          {name && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <Button
            type="submit"
            onClick={submitSearch}
            className="h-10 w-full sm:flex-[1] rounded-lg px-4 flex items-center justify-center bg-neutral-500 hover:bg-gray-500"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-evenly gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="rounded-lg px-4 flex items-center gap-5 bg-neutral-300">
                {selectedValue ?? "Values"}
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
              <Button variant="secondary" className="rounded-lg px-4 flex items-center gap-5 bg-neutral-300">
                {selectedIndustry ?? "Industries"}
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
    </form>
  );
}
