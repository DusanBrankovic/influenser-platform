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
import { IndustryLabels, ValueLabels } from "@/data/prettifyEnums";

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

  const submitSearch = (overrides: Partial<SearchParams> = {}) => {
    onSearch({
      name: name.trim(),
      value: ("value" in overrides) ? overrides.value : selectedValue,
      industry: ("industry" in overrides) ? overrides.industry : selectedIndustry,
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
            type="button"
            className="h-10 w-full sm:flex-[1] rounded-lg px-4 flex items-center justify-center bg-neutral-500 hover:bg-gray-500"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-evenly gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="min-w-[200px] justify-between rounded-lg px-4 bg-neutral-300"
              >
                <span className="ps-2">
                  {selectedValue ? ValueLabels[selectedValue] : "Values"}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[240px] max-h-64 overflow-y-auto">
              {valueEnumValues.map((opt) => (
                <DropdownMenuItem
                  key={opt}
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedValue(opt)
                    submitSearch({ value: opt });
                    }
                  }
                >
                  {ValueLabels[opt]}
                </DropdownMenuItem>
              ))}

              <DropdownMenuItem
                className="cursor-pointer text-muted-foreground"
                onSelect={() => {
                    setSelectedValue(undefined)
                    submitSearch({ value: undefined });
                    }
                  }
              >
                Clear selection
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="min-w-[200px] justify-between rounded-lg px-4 bg-neutral-300"
              >
                <span className="ps-2">
                  {selectedIndustry
                    ? IndustryLabels[selectedIndustry]
                    : "Industries"}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[240px] max-h-64 overflow-y-auto">
              {industryEnumValues.map((opt) => (
                <DropdownMenuItem
                  key={opt}
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedIndustry(opt)
                    submitSearch({ industry: opt });
                    }
                  }
                >
                  {IndustryLabels[opt]}
                </DropdownMenuItem>
              ))}

              <DropdownMenuItem
                className="cursor-pointer text-muted-foreground"
                onSelect={() => {
                    setSelectedIndustry(undefined)
                    submitSearch({ industry: undefined });
                    }
                  }
              >
                Clear selection
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
    </form>
  );
}
