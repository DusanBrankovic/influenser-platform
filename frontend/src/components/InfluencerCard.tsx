import { Card, CardContent } from "@/components/ui/card"
import { BadgeCheck } from "lucide-react"
import MockImage from "@/assets/img/MockImage";
import type { Influencer } from "@/types/influencer.types";

type ProfileCardProps = {
  influencer: Influencer;
};

export default function InfluencerCard({ influencer }: ProfileCardProps) {

  return (
    <Card className="w-full max-w-[420px] overflow-hidden rounded-3xl bg-white shadow-sm">
      <CardContent className="p-4 sm:p-5">

          <div className="overflow-hidden rounded-2xl bg-[#C4C4C4]">
            <MockImage imageStyle="w-full h-64 object-cover" />
          </div>


        {/* Header */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-xl sm:text-2xl font-semibold leading-tight"><strong>{influencer.name}</strong></h3>
              <BadgeCheck className="h-5 w-5 text-black/80" aria-label="Verified" />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
                {influencer.experience}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}