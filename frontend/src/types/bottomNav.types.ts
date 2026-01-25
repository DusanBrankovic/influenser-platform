export type IconName = string;

export type NavActionItem = {
  key: string;
  label: string;
  icon: IconName;
  ariaLabel?: string;
  onClick: () => void | Promise<void>;
  variant?: "ghost" | "default";
};

export type NavRouteItem = {
  key: string;
  type: "route";
  to: string;
  param?: number;
  label: string;
  icon: IconName;
  ariaLabel?: string;
  fuzzy?: boolean;
};

export type NavProfileItem = {
  key: string;
  type: "profile";
  to: string;
  param: number;
  label: string;
  ariaLabel?: string;
  fuzzy?: boolean;
  avatarUrl?: string | null;
  avatarFallback: string;
};

export type BottomNavItem = NavRouteItem | NavProfileItem;

export type BottomNavProps = {
  items: BottomNavItem[];
  logout?: NavActionItem;
  className?: string;
  maxWidthClassName?: string;
  heightPx?: number;
};
