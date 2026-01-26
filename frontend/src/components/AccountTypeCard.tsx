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
  return (
    <div
      className="max-w-76 max-h-64 flex flex-col items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <Card className="w-full flex flex-col items-center justify-center border-2 border-primary gap-1 bg-background cursor-pointer hover:shadow-2xl  transition-shadow duration-200 p-11">
        <GoogleFontIcon icon={icon} fill={fill} size={50} weight={500} />
        <div className="flex flex-col justify-center items-center gap-1">
          <h2 className="text-2xl text-primary font-bold">{title}</h2>
          <p className="text-sm px-3 text-primary font-normal text-center">
            {description}
          </p>
        </div>
      </Card>
    </div>
  );
};
