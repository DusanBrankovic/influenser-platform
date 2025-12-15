import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import HourglassIcon from "../assets/icons/hourglass-triangle.svg";
import SignIn from "@/pages/SignIn";
import Register from "@/pages/Register";
import { useState } from "react";

export function AuthTabsCard() {
  const [tab, setTab] = useState<"signin" | "register">("signin");

  return (
    <div className="h-screen w-full flex flex-row items-center justify-between">
      <div className="flex flex-1 justify-center items-center flex-col relative text-primary px-3 gap-10">
        <Card className="h-[600px] w-1/2 items-center justify-center flex flex-col border border-primary">
          <div className="max-h-32 max-w-32">
            <img src={HourglassIcon} className="w-full" alt="Slika pescanika" />
          </div>
          <div className="flex flex-col w-full max-w-xs rounded-3xl px-5 border border-white/10 items-center justify-center">
            <CardTitle className="text-xl">Design in progress</CardTitle>
            <CardContent className="flex flex-1 items-center justify-center text-sm lowercase text-primary sm:text-wrap">
              Ovde bi trebalo da dođe neki kreirani baner
            </CardContent>
          </div>
        </Card>
      </div>

      <div className="max-w-1/2 h-screen relative flex flex-col flex-1 bg-background pt-6">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="relative flex w-full items-end justify-stretch rounded-t-xl border-border bg-transparent px-0">
            <TabsTrigger
              value="signin"
              className="
                    flex-[0.35]
                    rounded-t-xl border-x border-t
                    bg-background text-foreground
                    px-4 py-2 text-3xl font-bold
                    data-[state=active]:bg-muted
                    data-[state=active]:flex-[0.65]
                    data-[state=active]:text-foreground
                    data-[state=active]:z-10
                    transition-all duration-200
                  "
            >
              Prijava
            </TabsTrigger>

            <TabsTrigger
              value="register"
              className="
                    flex-[0.35]
                    rounded-t-xl border-x border-t 
                     bg-background text-foreground
                    px-4 py-2 text-3xl font-bold
                    -ml-px
                     data-[state=active]:bg-muted
                    data-[state=active]:flex-[0.65]
                    data-[state=active]:text-foreground
                    data-[state=active]:z-10
                    transition-all duration-200
                  "
            >
              Registracija
            </TabsTrigger>
          </TabsList>

          <div className="rounded-b-xl bg-muted px-6 py-12">
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
              <SignIn onSwitchToSignUp={() => setTab("register")} />
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
              <Register onSwitchToSignIn={() => setTab("signin")} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
