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

type ExperienceOption = {
  label: string;
  max?: number;
};

const EXPERIENCE_OPTIONS: ExperienceOption[] = [
  { label: "Experience" },
  { label: "< 1", max: 1 },
  { label: "1 - 2", max: 2 },
  { label: "2 – 3", max: 3 },
  { label: "3 – 4", max: 4 },
  { label: "4 – 5", max: 5 },
  { label: "> 5", max: 100 },
];

type SearchParams = {
  name: string;
  value?: string[];
  industry?: string[];
  experience_range?: number;
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

  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = React.useState<string[]>(
    [],
  );

  const [experience_range, setExperienceRange] = React.useState<number | undefined>(
    undefined,
  );

  const [valuesOpen, setValuesOpen] = React.useState(false);
  const [industriesOpen, setIndustriesOpen] = React.useState(false);
  const [experienceOpen, setExperienceOpen] = React.useState(false);

  const runSearch = (next?: Partial<SearchParams>) => {
    onSearch({
      name: next?.name ?? name.trim(),
      value: next?.value ?? selectedValues,
      industry: next?.industry ?? selectedIndustries,
      experience_range:
        "experience_range" in (next ?? {}) ? next?.experience_range : experience_range,
    });
  };

  const toggleInArray = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];

  const valuesLabel =
    selectedValues.length === 0
      ? "Values"
      : selectedValues.length === 1
        ? ValueLabels[selectedValues[0]]
        : `${selectedValues.length} values`;

  const industriesLabel =
    selectedIndustries.length === 0
      ? "Industries"
      : selectedIndustries.length === 1
        ? IndustryLabels[selectedIndustries[0]]
        : `${selectedIndustries.length} industries`;

  const experienceLabel = (() => {
    if (experience_range == null) return "Experience";
    const opt = EXPERIENCE_OPTIONS.find((o) => o.max === experience_range);
    return opt?.label ?? "Experience";
  })();

  return (
    <form
      className="bg-neutral-200"
      onSubmit={(e) => {
        e.preventDefault();
        runSearch();
      }}
    >
      <div className="mx-auto w-full rounded-2xl bg-neutral-300 p-4">
        <div className="relative flex w-full flex-col items-center justify-center sm:flex-row sm:items-center sm:gap-4">
          <Input
            className="h-10 w-full sm:flex-[9] bg-white rounded-lg pr-10"
            placeholder="Search by name..."
            value={name}
            onChange={(e) => {
              const nextName = e.target.value;
              setSearch(nextName);
              runSearch({ name: nextName.trim() });
            }}
            onClear={() => {
              setSearch("");
              runSearch({ name: "" });
            }}
          />

          {name && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                runSearch({ name: "" });
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <Button
            type="button"
            onClick={() => runSearch()}
            className="h-10 w-full sm:flex-[1] rounded-lg px-4 flex items-center justify-center bg-neutral-500 hover:bg-gray-500"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-evenly gap-3">
        {/* Values */}
        <DropdownMenu open={valuesOpen} onOpenChange={setValuesOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              className="min-w-[200px] justify-between rounded-lg px-4 bg-neutral-300"
            >
              <span className="ps-2">{valuesLabel}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[240px] max-h-64 overflow-y-auto">
            {valueEnumValues.map((opt) => {
              const isSelected = selectedValues.includes(opt);

              return (
                <DropdownMenuItem
                  key={opt}
                  className="cursor-pointer flex items-center justify-between"
                  onSelect={(e) => {
                    e.preventDefault();
                    const next = toggleInArray(selectedValues, opt);
                    setSelectedValues(next);
                    runSearch({ value: next });
                  }}
                >
                  <span>{ValueLabels[opt]}</span>
                  {isSelected ? <span className="text-xs">✓</span> : null}
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuItem
              className="cursor-pointer text-muted-foreground"
              onSelect={(e) => {
                e.preventDefault();
                setSelectedValues([]);
                runSearch({ value: [] });
              }}
            >
              Clear selection
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Industries */}
        <DropdownMenu open={industriesOpen} onOpenChange={setIndustriesOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              className="min-w-[200px] justify-between rounded-lg px-4 bg-neutral-300"
            >
              <span className="ps-2">{industriesLabel}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[240px] max-h-64 overflow-y-auto">
            {industryEnumValues.map((opt) => {
              const isSelected = selectedIndustries.includes(opt);

              return (
                <DropdownMenuItem
                  key={opt}
                  className="cursor-pointer flex items-center justify-between"
                  onSelect={(e) => {
                    e.preventDefault();
                    const next = toggleInArray(selectedIndustries, opt);
                    setSelectedIndustries(next);
                    runSearch({ industry: next });
                  }}
                >
                  <span>{IndustryLabels[opt]}</span>
                  {isSelected ? <span className="text-xs">✓</span> : null}
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuItem
              className="cursor-pointer text-muted-foreground"
              onSelect={(e) => {
                e.preventDefault();
                setSelectedIndustries([]);
                runSearch({ industry: [] });
              }}
            >
              Clear selection
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Experience (single select, max only) */}
        <DropdownMenu open={experienceOpen} onOpenChange={setExperienceOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              className="min-w-[200px] justify-between rounded-lg px-4 bg-neutral-300"
            >
              <span className="ps-2">{experienceLabel}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[240px] max-h-64 overflow-y-auto">
            {EXPERIENCE_OPTIONS.slice(1).map((opt) => {
              const isSelected = experience_range === opt.max;

              return (
                <DropdownMenuItem
                  key={opt.label}
                  className="cursor-pointer flex items-center justify-between"
                  onSelect={(e) => {
                    e.preventDefault();
                    setExperienceRange(opt.max);
                    runSearch({ experience_range: opt.max });
                  }}
                >
                  <span>{opt.label}</span>
                  {isSelected ? <span className="text-xs">✓</span> : null}
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuItem
              className="cursor-pointer text-muted-foreground"
              onSelect={(e) => {
                e.preventDefault();
                setExperienceRange(undefined);
                runSearch({ experience_range: undefined });
              }}
            >
              Clear selection
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </form>
  );
}