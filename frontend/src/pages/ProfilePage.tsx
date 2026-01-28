import AvatarInitials from "@/components/AvatarInitials";
import InfluencerContent from "@/components/InfluencerContent";
import ProfilePageSkeleton from "@/components/ProfilePageSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getLoggedInInfluencer } from "@/services/influencerService";
import { useQuery } from "@tanstack/react-query";
import { Globe, Mail, MapPin, Pencil, Phone, Share2 } from "lucide-react";

export default function ProfilePage() {
  const {
    data: influencer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getLoggedInInfluencer,
  });

  if (isLoading) return <ProfilePageSkeleton />;

  if (isError || !influencer) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] flex items-center justify-center p-6">
        <Card className="max-w-md w-full rounded-2xl">
          <CardHeader>
            <CardTitle>Couldn&apos;t load profile</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-black/70">
            Please refresh and try again.
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <div className="h-full w-full overflow-hidden rounded-full flex items-center justify-center">
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

      <div className="px-4 sm:px-8 pb-10 pt-20">
        <Card className="mx-auto max-w-5xl rounded-2xl border-none">
          <CardHeader className="py-3 ps-15">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <CardTitle className="text-xl sm:text-2xl">
                  {influencer.name}
                </CardTitle>
                <p className="text-sm text-black">@{influencer.userId}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-black ps-5">Bio</Label>

              <div className="relative">
                <Textarea
                  value={influencer.headline ?? ""}
                  placeholder="Headline will appear here..."
                  disabled
                  className="min-h-23 resize-none rounded-xl bg-white/60 border border-black disabled:cursor-default disabled:opacity-100 p-5 pr-5"
                />

                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute bottom-3 right-3 h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <Label className="font-semibold text-black ps-5">
                Years of experience
              </Label>

              <div className="rounded-xl border border-black p-3">
                <div className="relative">
                  <Input
                    className="p-0 ps-2 pr-12"
                    value={influencer.experience ?? ""}
                    placeholder="Experience will appear here..."
                    disabled
                  />

                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <Label className="font-semibold text-black ps-5">Categories</Label>

              <div className="relative flex flex-col gap-3 rounded-xl border border-black p-3 pb-5">
                <Label className="font-semibold text-black ps-2">
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

                <Label className="font-semibold text-black ps-2">Values</Label>
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

            <div className="flex flex-col gap-2 mt-6">
              <Label className="font-semibold text-black ps-5">Contact</Label>

              <div className="relative flex flex-col gap-3 rounded-xl border border-black p-5 pb-5 mb-6">
                <div className="grid gap-4 md:grid-cols-2">
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
              <InfluencerContent influencer={influencer} isEditable={true} />
            </CardContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}