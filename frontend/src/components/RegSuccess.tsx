import { GoogleFontIcon } from "@/assets/icons/GoogleFontIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getActions } from "@/auth/authStore";

const { setIsUnregistered } = getActions();

const RegSuccessScreen = ({
  onSwitchToSignIn,
}: {
  onSwitchToSignIn: () => void;
}) => {
  return (
    <Card className="rounded-none w-full ">
      <CardContent>
        <div className="flex flex-col w-full gap-8 justify-center items-center">
          <span className="text-muted-foreground">
            <GoogleFontIcon size={64} fill="filled" icon="check_circle" />
          </span>
          <p className="text-3xl font-bold">
            Your account has been successfully created!
          </p>
          <p className="w-2/3 p-2.5 text-base text-primary text-center">
            After entering your basic information, sign in to your account so
            you can start editing your influencer profile!
          </p>
          <div className="w-full flex flex-row flex-1 gap-8 justify-center items-center">
            <Button
              type="button"
              onClick={() => {
                onSwitchToSignIn();
                setIsUnregistered();
              }}
              className="outline-none w-full"
              size="lg"
            >
              Sign In
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegSuccessScreen;
