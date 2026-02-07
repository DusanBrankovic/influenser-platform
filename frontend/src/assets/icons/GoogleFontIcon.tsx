interface GoogleFontIconProps {
  icon: string;
  variant?: "outlined" | "rounded" | "sharp";
  filled?: boolean;
  size?: number;
  weight?: 100 | 500;
}

export const GoogleFontIcon = ({
  icon,
  variant = "outlined",
  filled = false,
  size = 24,
  weight = 100,
}: GoogleFontIconProps) => {
  return (
    <span
      className={`material-symbols-${variant}`}
      style={{
        fontSize: `${size}px`,
        lineHeight: 1,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
      }}
    >
      {icon}
    </span>
  );
};