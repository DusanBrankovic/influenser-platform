type AvatarInitialsProps = {
  name: string;
  size?: number;
  circle?: boolean;
};

export default function AvatarInitials({
  name,
  size = 48,
  circle = false,
}: AvatarInitialsProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{ width: size, height: size }}
      className={`flex items-center justify-center ${
        circle ? "rounded-full" : "rounded-2xl"
      } bg-[#C4C4C4] text-gray-700 font-semibold select-none text-xl`}
    >
      {initials}
    </div>
  );
}
