import { Card, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import HourglassIcon from "../assets/icons/hourglass-triangle.svg";
import SignIn from "@/components/SignIn";
import Register from "@/components/Register";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

const AuthTabsCard: React.FC = () => {
  const [tab, setTab] = useState<"signin" | "register">("signin");
  const navigate = useNavigate();

  const handleGuest = async () => {
    navigate({ to: "/guest" });
  };

  return (
    <div className="h-full w-full flex md:flex-row flex-col items-center justify-between md:items-stretch">
      <div className="flex flex-1 flex-col relative text-primary px-3 my-14 md:my-0 md:min-h-screen md:items-center md:justify-center">
        <Card className="w-full md:w-1/2 md:h-[80vh] md:max-h-180 flex flex-col items-center justify-center border border-primary">
          <div className="max-h-32 max-w-32">
            <img src={HourglassIcon} className="w-full" alt="Slika pescanika" />
          </div>
          <div className="flex flex-col w-full max-w-xs rounded-3xl px-5 border border-white/10 items-center justify-center">
            <CardTitle className="text-xl">Design in progress</CardTitle>
          </div>
        </Card>
      </div>

      <div className="w-full md:w-1/2 relative flex flex-col flex-1 bg-background">
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as "signin" | "register")}
          className=" h-full w-full"
        >
          <TabsList className="relative w-full items-end justify-stretch rounded-t-xl border-border bg-transparent px-0">
            <TabsTrigger
              value="signin"
              className="
                    flex-[0.35]
                    rounded-t-2xl border-x border-t
                    bg-background text-foreground
                    px-4 py-10 text-3xl font-bold
                    data-[state=active]:bg-muted
                    data-[state=active]:flex-[0.65]
                    data-[state=active]:text-foreground
                    data-[state=active]:z-10
                    transition-all duration-200
                  "
            >
              Sign In
            </TabsTrigger>

            <TabsTrigger
              value="register"
              className="
                    flex-[0.35]
                    rounded-t-2xl border-x border-t 
                     bg-background text-foreground
                    px-4 py-10 text-3xl font-bold
                    -ml-px
                     data-[state=active]:bg-muted
                    data-[state=active]:flex-[0.65]
                    data-[state=active]:text-foreground
                    data-[state=active]:z-10
                    transition-all duration-200
                  "
            >
              Register
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-1 min-h-min bg-muted px-6 py-12">
            <TabsContent
              value="signin"
              className="
              
                    p-0
                    data-[state=active]:opacity-100
                    data-[state=active]:translate-y-0
                    data-[state=inactive]:opacity-0
                    data-[state=inactive]:translate-y-1
                    data-[state=inactive]:pointer-events-none
                    transition-all duration-200
                  "
            >
              <SignIn
                onGuest={handleGuest}
                onSwitchToSignUp={() => setTab("register")}
              />
            </TabsContent>

            <TabsContent
              value="register"
              className="
              p-0
                    data-[state=active]:opacity-100
                    data-[state=active]:translate-y-0
                    data-[state=inactive]:opacity-0
                    data-[state=inactive]:translate-y-1
                    data-[state=inactive]:pointer-events-none
                    transition-all duration-200
                  "
            >
              <Register 
                onSwitchToSignIn={() => setTab("signin")}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthTabsCard;
