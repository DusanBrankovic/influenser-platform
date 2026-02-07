import AvatarInitials from "@/components/AvatarInitials";
import InfluencerContent from "@/components/InfluencerContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  togglePrivateProfile,
  updateInfluencer,
  deleteInfluencer,
} from "@/services/influencerService";
import { useRouteContext, useRouter } from "@tanstack/react-router";
import { Globe, Mail, MapPin, Pencil, Phone, Share2, Settings, LogOut, Trash2 } from "lucide-react";
import React from "react";
import { EditBioAndExperiencePopUp } from "@/components/EditBioAndExperiencePopUp"; // adjust path
import type { UpdateInfluencerDto } from "@/types/influencer.types";
import { IndustryLabels, ValueLabels } from "@/data/prettifyEnums";
import Spinner from "@/components/Spinner";
import { CanAccess } from "@/auth/CanAccess";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { getActions } from "@/auth/authStore";
import ConfirmModal from "@/components/ConfirmModal";

export default function ProfilePage() {
  const { influencer, isPublished } = useRouteContext({
    from: "/_private/profile",
  });

  const router = useRouter();

  const [isToggled, setIsToggled] = React.useState<boolean>(() => !isPublished);

  const [editOpen, setEditOpen] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

  const { clearTokens, setIsUnregistered } = getActions();

  const handleToggle = (checked: boolean) => {
    setIsToggled(checked);
    togglePrivateProfile(!checked);
  };

  const handleLogout = () => {
    setIsUnregistered();
    clearTokens();
    router.navigate({ to: "/auth", replace: true });
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteInfluencer(influencer.userId);
      setIsUnregistered();
      clearTokens();
      router.navigate({ to: "/auth", replace: true });
    } catch (error) {
      console.error("Failed to delete profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] relative">
      <Spinner />
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
                <p className="text-sm text-black">@{influencer.nametag}</p>
              </div>
              <CanAccess roles={["INFLUENCER"]}>
                <div className="flex items-center gap-2 sm:gap-3 pr-2 sm:pr-5">
                  
                  <div className="relative flex h-8 w-44 sm:w-50 items-center rounded-full bg-neutral-800 p-1">
                    <div
                      className={`absolute top-1 bottom-1 w-[48%] rounded-full bg-neutral-500 transition-all duration-300 ${isToggled ? "left-1" : "left-1/2"
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
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg border-black/10 bg-white/50 hover:bg-white shrink-0"
                      >
                        <Settings className="h-5 w-5 text-black" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl border-black/10 p-2">
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center gap-2 cursor-pointer rounded-lg text-black hover:bg-black/5"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Izloguj se</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setIsConfirmOpen(true)}
                        className="flex items-center gap-2 cursor-pointer rounded-lg text-red-600 focus:text-red-600 focus:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Obriši profil</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CanAccess>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-2">
              <Label className="ps-5 font-semibold text-black">Bio</Label>

              <div className="relative">
                <Textarea
                  value={influencer.description ?? ""}
                  disabled
                  placeholder="Description will appear here..."
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
            <CanAccess roles={["INFLUENCER"]}>
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
            </CanAccess>

            <CanAccess roles={["INFLUENCER"]}>
              <div className="mt-6 flex flex-col gap-2">
                <Label className="ps-5 font-semibold text-black">
                  Categories
                </Label>

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
                        {IndustryLabels[t as keyof typeof IndustryLabels]}
                      </Badge>
                    ))}
                  </div>

                  <Label className="ps-2 font-semibold text-black">
                    Values
                  </Label>

                  <div className="flex flex-wrap gap-2 ps-1">
                    {(influencer.values ?? []).map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="rounded-sm bg-black/20 text-black"
                      >
                        {ValueLabels[t]}
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
            </CanAccess>
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
            <CanAccess roles={["INFLUENCER"]}>
              <CardContent className="rounded-xl border border-black bg-white p-0 mb-20">
                <InfluencerContent influencer={influencer} isEditable />
              </CardContent>
            </CanAccess>
          </CardContent>
        </Card>
      </div>

      <EditBioAndExperiencePopUp
        open={editOpen}
        onOpenChange={setEditOpen}
        initialValues={{
          description: influencer.description ?? "",
          experience: String(influencer.experience ?? ""),
        }}
        onSave={async (vals) => {
          const updateInfluencerDto: UpdateInfluencerDto = {
            description: vals.description,
            experience: Number(vals.experience),
          };
          await updateInfluencer(updateInfluencerDto);
          await router.invalidate({
            filter: (match) => match.routeId === "/_private/profile",
          });
          setEditOpen(false);
        }}
        onCancel={() => setEditOpen(false)}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteProfile}
        text="Da li ste sigurni da želite da obrišete profil?"
      />
    </div>
  );
}
