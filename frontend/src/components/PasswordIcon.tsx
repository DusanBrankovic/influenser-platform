import { GoogleFontIcon } from "@/assets/icons/GoogleFontIcon";

export const PasswordIcon = ({ isVisible }: { isVisible: boolean }) => {
  return <GoogleFontIcon icon={isVisible ? "visibility_off" : "visibility"} />;
};
