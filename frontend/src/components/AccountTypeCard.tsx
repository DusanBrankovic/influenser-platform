import { GoogleFontIcon } from "@/assets/icons/GoogleFontIcon";
import { Card } from "./ui/card";

type AccountTypeCardProps = {
  title: string;
  description: string;
  icon: string;
  fill?: "outlined" | "filled" | "rounded";
  onClick: () => void;
};

export const AccountTypeCard = ({
  title,
  description,
  icon,
  fill = "outlined",
  onClick,
}: AccountTypeCardProps) => {
  const variant =
    fill === "rounded"
      ? "rounded"
      : "outlined";

  const filled = fill === "filled";

  return (
    <div
      className="max-w-76 max-h-64 flex cursor-pointer flex-col items-center justify-center"
      onClick={onClick}
    >
      <Card className="flex w-full cursor-pointer flex-col items-center justify-center gap-1 border-2 border-primary bg-background p-11 transition-shadow duration-200 hover:shadow-2xl">
        <GoogleFontIcon
          icon={icon}
          variant={variant}
          filled={filled}
          size={50}
          weight={500}
        />

        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className="text-2xl font-bold text-primary">{title}</h2>
          <p className="px-3 text-center text-sm font-normal text-primary">
            {description}
          </p>
        </div>
      </Card>
    </div>
  );
};