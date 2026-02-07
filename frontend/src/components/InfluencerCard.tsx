import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { Influencer } from "@/types/influencer.types";
import { useNavigate } from "@tanstack/react-router";
import AvatarInitials from "./AvatarInitials";
import { Badge } from "./ui/badge";
import GuestPopUp from "./GuestPopUp";
import { IndustryLabels, ValueLabels } from "@/data/prettifyEnums";

type ProfileCardProps = {
  influencer: Influencer;
  isGuest?: boolean;
};

export default function InfluencerCard({
  influencer,
  isGuest = false,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
     console.log("clicked", { isGuest });
    if (isGuest) {
      setOpen(true);
      return;
    }

    navigate({
      to: "/preview/$userId",
      params: { userId: influencer.userId + "" },
    });
  };

  return (
    <>
      <Card
        onClick={handleClick}
        className="w-full max-w-[270px] max-h-[600px] overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      >
        <CardContent className="p-4">
          <div className="w-full overflow-hidden rounded-2xl flex items-center justify-center">
            {influencer.profilePicture ? (
                      <img
                        src={influencer.profilePicture}
                        className="h-full w-full object-cover"
                        alt={`${influencer.name} avatar`}
                      />
                    ) : (
                      <AvatarInitials name={influencer.name} size={240} />
                    )}
          </div>

          <div className="mt-3 flex flex-col items-start gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-m sm:text-m leading-tight">
                <strong>{influencer.name}</strong>
              </h3>

              <p className="text-sm text-muted-foreground">
                {influencer.experience? (
                  <span>{influencer.experience} years</span>
                ) : (
                  ""
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {influencer.industries.slice(0, 3).map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="rounded-md bg-[#8C8C8C] text-white"
                >
                  {IndustryLabels[t as keyof typeof IndustryLabels]}
                </Badge>
              ))}
            </div>


            <div className="flex flex-wrap gap-2">
              {influencer.values.slice(0, 3).map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="rounded-md bg-black/20 text-black"
                >
                  {ValueLabels[t as keyof typeof ValueLabels]}
                </Badge>
              ))}
            </div>

          </div>
        </CardContent>
      </Card>

      <GuestPopUp open={open} setOpen={setOpen} />
    </>
  );
}
