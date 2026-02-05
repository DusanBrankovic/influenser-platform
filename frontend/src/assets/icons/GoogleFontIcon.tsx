interface GoogleFontIconProps {
  icon: string;
  fill?: "outlined" | "filled" | "rounded";
  size?: number;
  weight?: 100 | 500;
}

export const GoogleFontIcon = ({
  icon,
  fill = "outlined",
  size = 24,
  weight = 100,
}: GoogleFontIconProps) => {
  const fillValue = fill === "filled" || fill === "rounded" ? 1 : 0;
  return (
    <span
      className={`material-symbols-${fill}`}
      style={{
        fontSize: `${size}px`,
        lineHeight: 1,
        fontVariationSettings: `'FILL' ${fillValue}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
      }}
      id={icon}
    >
      {icon}
    </span>
  );
};
