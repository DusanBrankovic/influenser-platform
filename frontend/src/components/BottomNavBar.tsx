import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GoogleFontIcon } from "@/assets/icons/GoogleFontIcon";

import type { BottomNavProps } from "./bottomNav.types";
import { BottomNavItem } from "./BottomNavItem";
import { useAuthStore } from "@/auth/authStore";
import { useNavigate } from "@tanstack/react-router";

export function BottomNav({
  items,
  className,
  maxWidthClassName = "max-w-screen-md",
  heightPx = 60,
}: BottomNavProps) {
  const logoutUser = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 w-full",
        "border-t bg-primary",
        className
      )}
      aria-label="Bottom navigation"
    >
      <div
        className={cn("mx-auto grid w-full", maxWidthClassName)}
        style={{
          gridTemplateColumns: `repeat(${items.length + 1}, 1fr)`,
        }}
      >
        {items.map((item) => (
          <div key={item.key} className="w-full">
            {/* Safer: use inline height to avoid Tailwind dynamic class issues */}
            <div style={{ height: heightPx }}>
              <BottomNavItem item={item} heightPx={heightPx} />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            logoutUser();
            navigate({ to: "/auth", replace: true });
          }}
          className={cn(
            "w-full rounded-none px-2",
            "flex flex-col items-center justify-center gap-1",
            "text-destructive hover:text-destructive hover:bg-destructive/10"
          )}
          style={{ height: heightPx }}
          aria-label="Logout"
        >
          <GoogleFontIcon icon="logout" />
          <span className="text-[12px] leading-none whitespace-nowrap">
            Izloguj me
          </span>
        </Button>
      </div>
    </nav>
  );
}
