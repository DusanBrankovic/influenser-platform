import { GoogleFontIcon } from "@/assets/icons/GoogleFontIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
            Uspe&scaron;no ste kreirali nalog&#x21;
          </p>
          <p className="w-2/3 p-2.5 text-base text-primary text-center">
            Nakon &scaron;to ste uneli osnovne podatke prijavite se na nalog
            kako bi mogli da ure&#273;ujete Va&scaron; profil influensera&#x21;
          </p>
          <div className="w-full flex flex-row flex-1 gap-8 justify-center items-center">
            <Button
              type="button"
              onClick={onSwitchToSignIn}
              className="outline-none w-full"
              size="lg"
            >
              Prijavite se
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegSuccessScreen;
