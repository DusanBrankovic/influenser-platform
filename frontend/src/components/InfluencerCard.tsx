import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BadgeCheck, Bookmark, Star } from "lucide-react"
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { AspectRatio } from "./ui/aspect-ratio";

type ProfileCardProps = {
  name?: string;
  yearsLabel?: string;
  rating?: number;
  ratingOutOf?: number;
  tags?: string[];
  imageUrl?: string;
  bookmarked?: boolean;
  onBookmarkToggle?: () => void;
};

export default function InfluencerCard({
  name = "Ime Prezime",
  yearsLabel = "Godine iskustva",
  rating = 4,
  ratingOutOf = 5,
  tags = ["Industrija", "Industrija", "Industrija", "Vrednost", "Vrednost", "Vrednost"],
  imageUrl,
  bookmarked = false,
  onBookmarkToggle,
}: ProfileCardProps) {

const safeRating = Math.max(0, Math.min(rating, ratingOutOf));
  return (
    <Card className="w-full max-w-[420px] overflow-hidden rounded-3xl bg-white shadow-sm">
      <CardContent className="p-4 sm:p-5">

          <div className="overflow-hidden rounded-2xl bg-[#C4C4C4]">
            <AspectRatio ratio={1 / 1}>
              {imageUrl ? (
                <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                    <div className="flex items-center justify-center">
                      <svg
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-black"
                      >
                        <path
                          d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M21 16l-5.5-5.5L6 20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                </div>
              )}
            </AspectRatio>
          </div>


        {/* Header */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-xl sm:text-2xl font-semibold leading-tight"><strong>{name}</strong></h3>
              <BadgeCheck className="h-5 w-5 text-black/80" aria-label="Verified" />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
                {yearsLabel}
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: ratingOutOf }).map((_, i) => {
                  const filled = i < safeRating;
                  return (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        filled ? "fill-black text-black" : "fill-transparent text-black/25"
                      }`}
                    />
                  );
                })}
              </div>
              <div className="text-lg sm:text-xl font-semibold">
                {safeRating}/{ratingOutOf}
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((t, idx) => (
                <Badge
                  key={`${t}-${idx}`}
                  variant="secondary"
                  className="rounded-md bg-black/45 text-white hover:bg-black/50"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onBookmarkToggle}
            className="shrink-0 rounded-xl border-black/10"
            aria-label="Bookmark"
          >
            <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-black text-black" : "text-black/70"}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
