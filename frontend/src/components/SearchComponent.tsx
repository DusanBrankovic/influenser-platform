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
import MultiSelectDropdown from "./MultiSelectDropDown";

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

  const [experience_range, setExperienceRange] = React.useState<
    number | undefined
  >(undefined);

  const [valuesOpen, setValuesOpen] = React.useState(false);
  const [industriesOpen, setIndustriesOpen] = React.useState(false);
  const [experienceOpen, setExperienceOpen] = React.useState(false);

  const runSearch = (next?: Partial<SearchParams>) => {
    onSearch({
      name: next?.name ?? name.trim(),
      value: next?.value ?? selectedValues,
      industry: next?.industry ?? selectedIndustries,
      experience_range:
        "experience_range" in (next ?? {})
          ? next?.experience_range
          : experience_range,
    });
  };

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
            className="h-10 w-full rounded-lg bg-white pr-10 sm:flex-[9]"
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
            className="flex h-10 w-full items-center justify-center rounded-lg bg-neutral-500 px-4 hover:bg-gray-500 sm:flex-[1]"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-evenly gap-3">
        <MultiSelectDropdown
          open={valuesOpen}
          onOpenChange={setValuesOpen}
          triggerLabel={valuesLabel}
          options={valueEnumValues}
          selected={selectedValues}
          onChange={(next) => {
            setSelectedValues(next);
            runSearch({ value: next });
          }}
          prettyLabel={(opt) => ValueLabels[opt]}
        />

        <MultiSelectDropdown
          open={industriesOpen}
          onOpenChange={setIndustriesOpen}
          triggerLabel={industriesLabel}
          options={industryEnumValues}
          selected={selectedIndustries}
          onChange={(next) => {
            setSelectedIndustries(next);
            runSearch({ industry: next });
          }}
          prettyLabel={(opt) => IndustryLabels[opt]}
        />

        <DropdownMenu open={experienceOpen} onOpenChange={setExperienceOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              className="min-w-[200px] justify-between rounded-lg bg-neutral-300 px-4"
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
                  className="flex cursor-pointer items-center justify-between"
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