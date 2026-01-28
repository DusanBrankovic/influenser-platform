import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  onClear?: () => void;
};

function Input({ className, type, onClear, value, ...props }: InputProps) {
  const hasValue = typeof value === "string" && value.length > 0;

  return (
    <div className="relative w-full">
      <input
        type={type}
        data-slot="input"
        value={value}
        className={cn(
          "w-full py-5 pr-10 min-w-0 rounded-xs border-none bg-transparent px-3 text-base outline-none shadow-0 md:text-sm",
          className
        )}
        {...props}
      />

      {hasValue && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-black"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export { Input };
