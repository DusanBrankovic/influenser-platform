import AvatarInitials from "@/components/AvatarInitials";
import InfluencerContent from "@/components/InfluencerContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { togglePrivateProfile, updateInfluencer } from "@/services/influencerService";
import { useRouteContext, useRouter } from "@tanstack/react-router";
import { Globe, Mail, MapPin, Pencil, Phone, Share2 } from "lucide-react";
import React from "react";
import { EditBioAndExperiencePopUp } from "@/components/EditBioAndExperiencePopUp"; // adjust path
import type { UpdateInfluencerDto } from "@/types/influencer.types";

export default function ProfilePage() {

  const { influencer, isPublished } = useRouteContext({
    from: "/_private/profile",
  });

  const router = useRouter();

  const [isToggled, setIsToggled] = React.useState<boolean>(() => !isPublished);

  const [editOpen, setEditOpen] = React.useState(false);

  const handleToggle = (checked: boolean) => {
    setIsToggled(checked);
    togglePrivateProfile(!checked);
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <div className="relative h-44 bg-[#9B9B9B]">
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-4 h-10 w-10 rounded-lg"
          aria-label="Edit cover"
        >
          <Pencil className="h-5 w-5" />
        </Button>

        <div className="absolute -bottom-20 left-6 z-20 h-20 w-20 sm:h-40 sm:w-40 rounded-full bg-white/80 p-2 shadow-sm">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
            {influencer.profileImage ? (
              <img
                src={influencer.profileImage}
                className="h-full w-full object-cover"
                alt={`${influencer.name} profile`}
              />
            ) : (
              <AvatarInitials name={influencer.name} size={145} />
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-10 pt-20 sm:px-8">
        <Card className="mx-auto max-w-5xl rounded-2xl border-none">
          <CardHeader className="py-3 ps-15">
            <div className="flex flex-row justify-between gap-3">
              <div className="min-w-0">
                <CardTitle className="text-xl sm:text-2xl">
                  {influencer.name}
                </CardTitle>
                <p className="text-sm text-black">@{influencer.userId}</p>
              </div>

              <div className="flex items-center">
                <div className="relative flex h-8 w-[200px] items-center rounded-full bg-neutral-800 p-1">
                  <div
                    className={`absolute top-1 bottom-1 w-[48%] rounded-full bg-neutral-500 transition-all duration-300 ${
                      isToggled ? "left-1" : "left-1/2"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => handleToggle(true)}
                    className="relative z-10 w-1/2 text-center text-sm font-semibold text-white"
                  >
                    Publish
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggle(false)}
                    className="relative z-10 w-1/2 text-center text-sm font-semibold text-white"
                  >
                    Unpublish
                  </button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-2">
              <Label className="ps-5 font-semibold text-black">Bio</Label>

              <div className="relative">
                <Textarea
                  value={influencer.headline ?? ""}
                  disabled
                  placeholder="Headline will appear here..."
                  className="min-h-23 resize-none rounded-xl border border-black bg-white/60 p-5 disabled:cursor-default disabled:opacity-100"
                />

                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute bottom-3 right-3 h-8 w-8"
                  onClick={() => setEditOpen(true)}
                  type="button"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Label className="ps-5 font-semibold text-black">
                Years of experience
              </Label>

              <div className="relative rounded-xl border border-black p-3">
                <Input
                  className="p-0 ps-2 pr-12"
                  value={influencer.experience ?? ""}
                  disabled
                />

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setEditOpen(true)}
                  className="absolute right-2.5 top-1/2 h-8 w-8 -translate-y-1/2"
                  type="button"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Label className="ps-5 font-semibold text-black">Categories</Label>

              <div className="relative flex flex-col gap-3 rounded-xl border border-black p-3 pb-5">
                <Label className="ps-2 font-semibold text-black">
                  Industries
                </Label>
                <div className="flex flex-wrap gap-2 ps-1">
                  {(influencer.industries ?? []).map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="rounded-sm bg-[#8C8C8C] text-white"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                <Label className="ps-2 font-semibold text-black">Values</Label>
                <div className="flex flex-wrap gap-2 ps-1">
                  {(influencer.values ?? []).map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="rounded-sm bg-black/20 text-black"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute bottom-3 right-3 h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 pb-5">
              <Label className="ps-5 font-semibold text-black">Contact</Label>

              <div className="relative flex flex-col gap-3 rounded-xl border border-black p-5 pb-5">
                <div className="grid gap-4 md:grid-cols-2 text-sm">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-black/70" />
                      <span>Placeholder</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-black/70" />
                      <span>Placeholder</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-black/70" />
                      <span>Placeholder</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-black/70" />
                      <span>Placeholder</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Share2 className="h-4 w-4 text-black/70" />
                      <span>Placeholder</span>
                    </div>
                  </div>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute bottom-3 right-3 h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <CardContent className="rounded-xl border border-black bg-white p-0">
              <InfluencerContent influencer={influencer} isEditable />
            </CardContent>
          </CardContent>
        </Card>
      </div>

      <EditBioAndExperiencePopUp
        open={editOpen}
        onOpenChange={setEditOpen}
        initialValues={{
          headline: influencer.headline ?? "",
          experience: String(influencer.experience ?? ""),
        }}
        onSave={async (vals) => {
          var updateInfluencerDto: UpdateInfluencerDto = {
            headline: vals.headline,
            experience: Number(vals.experience)
          }
          await updateInfluencer(updateInfluencerDto);
          await router.invalidate({
            filter: (match) => match.routeId === "/_private/profile",
          }); 
          setEditOpen(false);
        }}
        onCancel={() => setEditOpen(false)}
      />
    </div>
  );
}
