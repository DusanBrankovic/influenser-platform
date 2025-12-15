import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const dropdownItems: Record<string, string[]> = {
  Industrija: ["Marketing", "IT", "Moda", "Fitness", "Finansije"],
  Vrednosti: ["Autentičnost", "Kvalitet", "Transparentnost", "Pouzdanost"],
  Ocena: ["5 ★", "4 ★ i više", "3 ★ i više"],
  "Godine iskustva": ["0–1 godina", "2–4 godine", "5–9 godina", "10+ godina"],
  Mreža: ["Instagram", "TikTok", "YouTube", "LinkedIn"],
};

export function SearchFilters() {


return (
<div className="space-y-6">

    <div className="rounded-2xl bg-neutral-300 p-4">
    <Input
        placeholder="Ime influensera ili ključna reč..."
        className="h-12 rounded-xl bg-white"/>
    </div>

    <div className="flex flex-wrap gap-3">
        {Object.entries(dropdownItems).map(([label, items]) => (
        <DropdownMenu key={label}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="rounded-full px-4 flex items-center gap-2"
            >
              {label}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48">
            {items.map((item) => (
              <DropdownMenuItem
                key={item}
                className="cursor-pointer"
                onSelect={() => console.log(label, item)}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
</div>


);
}