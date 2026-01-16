import { Link, useMatchRoute } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoogleFontIcon } from "@/assets/icons/GoogleFontIcon";
import type { BottomNavItem as Item } from "./bottomNav.types";

type Props = {
  item: Item;
  heightPx: number;
};

export function BottomNavItem({ item, heightPx }: Props) {
  const matchRoute = useMatchRoute();

  const isActive =
    item.type === "route" || item.type === "profile"
      ? Boolean(matchRoute({ to: item.to, fuzzy: item.fuzzy ?? true }))
      : false;

  const baseBtn = cn(
    `h-[${heightPx}px]`,
    "w-full rounded-none px-2",
    "flex flex-col items-center justify-center gap-1"
  );

  if (item.type === "profile") {
    return (
      <Link to={item.to} className="w-full">
        <Button
          type="button"
          variant={isActive ? "default" : "ghost"}
          className={cn(
            baseBtn,
            isActive && "bg-primary text-primary-foreground"
          )}
          aria-label={item.ariaLabel ?? item.label}
        >
          <Avatar
            className={cn(
              "h-7 w-7",
              isActive && "ring-2 ring-primary-foreground/40"
            )}
          >
            {item.avatarUrl ? (
              <AvatarImage src={item.avatarUrl} alt="Profile avatar" />
            ) : null}
            <AvatarFallback className="text-[11px]">
              {item.avatarFallback}
            </AvatarFallback>
          </Avatar>
          <span className="text-[12px] leading-none whitespace-nowrap">
            {item.label}
          </span>
        </Button>
      </Link>
    );
  }

  return (
    <Link to={item.to} className="w-full">
      <Button
        type="button"
        variant={isActive ? "default" : "ghost"}
        className={cn(
          baseBtn,
          isActive && "bg-primary text-primary-foreground"
        )}
        aria-label={item.ariaLabel ?? item.label}
      >
        <GoogleFontIcon icon={item.icon} />
        <span className="text-[12px] leading-none whitespace-nowrap">
          {item.label}
        </span>
      </Button>
    </Link>
  );
}
