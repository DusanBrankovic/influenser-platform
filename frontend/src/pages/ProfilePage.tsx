import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import {
  Pencil,
  Plus,
  X,
  Star,
  Phone,
  Mail,
  Globe,
  MapPin,
  Share2,
} from "lucide-react";
import { useRouteContext } from "@tanstack/react-router";
import { togglePrivateProfile } from "@/services/influencerService";
import { useState } from "react";
import InfluencerContent from "@/components/InfluencerContent";

function Stars({ value = 4, outOf = 5 }: { value?: number; outOf?: number }) {
  const v = Math.max(0, Math.min(value, outOf));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: outOf }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < v ? "fill-black text-black" : "text-black/30"}`}
        />
      ))}
    </div>
  );
}

export default function InfluencerProfile() {

  const [lastAction, setLastAction] = useState<"published" | "unpublished" | null>(null);

  const [bio, setBio] = React.useState(
    "U opisu profila influenser može ukratko da predstavi sebe, da naznači koji je njegov fokus i cilj sa budućim kampanjama. Trebalo bi navesti u par rečenica oko čega se bazira njegov sadržaj pre nego što pregledamo kompletan profil. Ovaj prozor može imati ograničenje u vidu maksimalnog broja simbola."
  );

  const { influencer } = useRouteContext({
    from: "/_private/profile",
  });

  const industries = ["Industrija 1", "Industrija 2", "Industrija 3"];
  const values = ["Vrednosti 1", "Vrednosti 2", "Vrednosti 3", "Vrednosti 4"];

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <div className="relative h-44 sm:h-44 bg-[#9B9B9B]">
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-4 h-10 w-10 rounded-lg"
          aria-label="Edit cover"
        >
          <Pencil className="h-5 w-5" />
        </Button>

        <div className="absolute left-6 sm:left-12 -bottom-20">
          <div className="relative h-20 w-20 sm:h-40 sm:w-40 rounded-full bg-white/80 p-2 shadow-sm">
            <div className="h-full w-full rounded-full bg-white flex items-center justify-center border">
              <Pencil className="h-6 w-6 text-black/60" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-10 pt-14 sm:pt-16">
        <div className="mx-auto flex max-w-5xl items-center justify-end gap-2 sm:gap-3">

           <div className="min-h-[20px] text-sm">
              {lastAction === "published" && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                  Profile published
                </span>
              )}

              {lastAction === "unpublished" && (
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-800">
                  Profile unpublished
                </span>
              )}
            </div>

          <Button className="rounded-full" size="sm" onClick={() => 
            {
              togglePrivateProfile(false)
              setLastAction("published");
            }
          }>
            <Plus className="mr-2 h-4 w-4" />
            Publish
          </Button>
          <Button variant="outline" className="rounded-full" size="sm" onClick={() => 
            {
              togglePrivateProfile(true)
              setLastAction("unpublished");
            }
          }>
            <X className="mr-2 h-4 w-4" />
            Unpublish
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-8 pb-10 pt-4">
        <Card className="mx-auto max-w-5xl rounded-2xl border border-black bg-white">
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <CardTitle className="text-xl sm:text-2xl">{influencer.name}</CardTitle>
                <p className="text-sm text-black">@{influencer.userId}</p>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-2">
                <div className="flex items-center gap-2">
                  <Badge className="rounded-full bg-white text-black border border-black">
                    ocena
                    <span className="mx-2 inline-flex items-center">
                      <Stars value={4} outOf={5} />
                    </span>
                    <span className="font-semibold">4/5</span>
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-black">500k</span> pratilaca
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 1) Bio */}
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
              <div className="space-y-2">
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[92px] resize-none rounded-xl bg-white/60 border border-black"
                />
                <Button variant="link" className="h-auto p-0 text-black/70">
                  Pročitaj više
                </Button>
              </div>
            </div>

            {/* 2) Experience + tags */}
            <div className="space-y-3">
              <div className="text-sm font-semibold">3 godine iskustva</div>

              <div className="flex flex-wrap gap-2">
                {industries.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="rounded-md bg-black/20 text-black hover:bg-black/25"
                  >
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {values.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="rounded-md bg-black/20 text-black hover:bg-black/25"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="rounded-xl border border-black bg-white">
                <CardContent className="p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-black/70" />
                      <span>064 123 123</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-black/70" />
                      <span>imeprezime123@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-black/70" />
                      <span>www.influenser123.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-black/70" />
                      <span>Beograd</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Share2 className="h-4 w-4 text-black/70" />
                      <span>Društvene mreže</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="hidden md:block rounded-xl border border-dashed border-black/15 bg-transparent" />
            </div>
              <CardContent className="rounded-xl border border-black bg-white p-0">
                <InfluencerContent />
              </CardContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}