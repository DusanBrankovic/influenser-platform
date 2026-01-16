interface GoogleFontIconProps {
  icon: string;
  fill?: "outlined" | "filled";
  size?: number;
}

export const GoogleFontIcon = ({
  icon,
  fill = "outlined",
  size = 24,
}: GoogleFontIconProps) => {
  const fillValue = fill === "filled" ? 1 : 0;
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontSize: `${size}px`,
        lineHeight: 1,
        fontVariationSettings: `'FILL' ${fillValue}, 'wght' 100, 'GRAD' 0, 'opsz' ${size}`,
      }}
      id={icon}
    >
      {icon}
    </span>
  );
};
