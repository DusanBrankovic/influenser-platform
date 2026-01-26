import { accountTypes } from "@/utils/accountTypes";
import { AccountTypeCard } from "./AccountTypeCard";
import type { UserRole } from "@/types/auth.types";
interface SelectAccountViewProps {
  onRoleChange: (field: string, value: UserRole) => void;
}

export const SelectAccountView = ({ onRoleChange }: SelectAccountViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3 space-y-4">
      {accountTypes.map(
        ({ title, role, description, icon, fill = "outlined" }) => (
          <AccountTypeCard
            key={title}
            title={title}
            description={description}
            icon={icon}
            fill={fill}
            onClick={() => onRoleChange("role", role)}
          />
        ),
      )}
    </div>
  );
};
