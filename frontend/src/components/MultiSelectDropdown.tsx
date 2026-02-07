import { Check, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

type MultiSelectDropdownProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  triggerLabel: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  prettyLabel: (opt: string) => string;
};

export default function MultiSelectDropdown({
  open,
  onOpenChange,
  triggerLabel,
  options,
  selected,
  onChange,
  prettyLabel,
}: MultiSelectDropdownProps) {
  const toggle = (value: string) =>
    selected.includes(value)
      ? selected.filter((x) => x !== value)
      : [...selected, value];

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          className="min-w-[200px] justify-between rounded-lg bg-neutral-300 px-4"
        >
          <span className="ps-2">{triggerLabel}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[260px] max-h-72 overflow-y-auto rounded-md bg-neutral-200 p-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt);

          return (
            <DropdownMenuItem
              key={opt}
              className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 focus:bg-neutral-300"
              onSelect={(e) => {
                e.preventDefault();
                onChange(toggle(opt));
              }}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-[3px] border border-neutral-500 bg-transparent">
                {isSelected ? <Check className="h-3 w-3" /> : null}
              </span>

              <span className="text-sm text-neutral-900">
                {prettyLabel(opt)}
              </span>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuItem
          className="mt-1 cursor-pointer rounded-md px-2 py-2 text-sm text-muted-foreground focus:bg-neutral-300"
          onSelect={(e) => {
            e.preventDefault();
            onChange([]);
          }}
        >
          Clear selection
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
