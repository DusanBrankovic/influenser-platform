interface GoogleFontIconProps {
  icon: string;
}

export const GoogleFontIcon = ({ icon }: GoogleFontIconProps) => {
  return (
    <span className="material-symbols-outlined" id={icon}>
      {icon}
    </span>
  );
};
