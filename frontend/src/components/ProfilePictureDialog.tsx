import * as React from "react";
import AvatarInitials from "@/components/AvatarInitials";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Pencil, X as XIcon } from "lucide-react";

type ProfilePictureDialogProps = {
  name: string;
  profilePicture?: string | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onUpload: (file: File) => void;
  onDelete: () => void;
};

export default function ProfilePictureDialog({
  name,
  profilePicture,
  open,
  onOpenChange,
  onUpload,
}: ProfilePictureDialogProps) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => fileInputRef.current?.click();

  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await onUpload(file);
    e.target.value = "";
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <div className="absolute -bottom-20 left-6 z-20 h-20 w-20 cursor-pointer rounded-full bg-white/80 p-2 shadow-sm transition hover:scale-105 sm:h-40 sm:w-40">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
            {profilePicture ? (
              <img
                src={profilePicture}
                className="h-full w-full object-cover"
                alt={`${name} profile`}
              />
            ) : (
              <AvatarInitials name={name} size={145} />
            )}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/35 opacity-0 transition hover:opacity-100">
              <span className="text-white text-sm">Edit</span>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent 
        showCloseButton={false}
        className="border-0 bg-transparent p-0 shadow-none">
        <VisuallyHidden>
          <DialogTitle>Profile picture</DialogTitle>
        </VisuallyHidden>

        <div className="relative w-[min(720px,95vw)] overflow-hidden rounded-2xl bg-[#8f8f8f] text-white shadow-2xl">
          <div className="flex items-center justify-between px-8 py-6">
            <h2 className="text-2xl font-semibold">Change profile photo</h2>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/70 hover:bg-white/10"
              aria-label="Close"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-center py-10">
            <div className="h-44 w-44 overflow-hidden rounded-full bg-white/70">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  className="h-full w-full object-cover"
                  alt={`${name} preview`}
                />
              ) : (
                <AvatarInitials name={name} size={176} circle />
              )}
            </div>
          </div>

          <div className="mx-8 h-px bg-white/40" />

          <div className="flex justify-center px-10 py-6">
            <button
              type="button"
              onClick={openFilePicker}
              className="flex w-24 cursor-pointer flex-col items-center gap-2"
            >
              <Pencil className="h-7 w-7" />
              <span className="text-center text-xs">Change photo</span>
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePictureChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}