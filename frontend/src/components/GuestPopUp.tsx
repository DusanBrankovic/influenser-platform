import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useNavigate } from "@tanstack/react-router";

type GuestPopUpProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function GuestPopUp({
  open,
  setOpen,
}: GuestPopUpProps) {
    
    const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden">
        <div className="bg-white px-6 py-10 sm:px-10 sm:py-12">
          <DialogHeader className="space-y-0">
            <DialogTitle className="text-center text-lg sm:text-xl font-semibold leading-snug">
              You must be logged in to view the full influencer profile
            </DialogTitle>
          </DialogHeader>

          <div className="mt-8 flex flex-col items-center">
            <Button
              type="button"
              onClick={() => navigate({ to: "/auth", search: { tab: "register" } })}
              className="w-[220px] h-[52px] rounded-2xl bg-zinc-300 text-black font-semibold hover:bg-zinc-300/90"
            >
              Register
            </Button>

            <p className="mt-6 mb-4 text-center text-sm text-black/70">
              Or sign in if you already have an account
            </p>

            <Button
              type="button"
              onClick={() => navigate({ to: "/auth", search: { tab: "signin" } })}
              className="w-[220px] h-[52px] rounded-2xl bg-zinc-300 text-black font-semibold hover:bg-zinc-300/90"
            >
              Sign in
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


