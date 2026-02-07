import * as React from "react";
import AvatarInitials from "@/components/AvatarInitials";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pencil,
  Camera,
  Trash2,
  X as XIcon,
  Image as ImageIcon,
} from "lucide-react";

type profilePictureDialogProps = {
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
  onDelete,
}: profilePictureDialogProps) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => fileInputRef.current?.click();

  const handleprofilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onUpload(file);
    e.target.value = "";
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <div className="absolute -bottom-20 left-6 z-20 h-20 w-20 sm:h-40 sm:w-40 cursor-pointer rounded-full bg-white/80 p-2 shadow-sm transition hover:scale-105">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
            {profilePicture ? (
              <img
                src={profilePicture}
                className="h-full w-full object-cover"
                alt=""
              />
            ) : (
              <AvatarInitials name={name} size={145} />
            )}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/35 opacity-0 transition hover:opacity-100">
              <span className="text-white text-sm">Change</span>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="border-0 bg-transparent p-0 shadow-none">
        <div className="relative w-[min(720px,95vw)] rounded-2xl bg-[#8f8f8f] text-white shadow-2xl overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between px-8 py-6">
            <h2 className="text-2xl font-semibold">
              Profilna fotografija
            </h2>
            <button
              onClick={() => onOpenChange(false)}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/70"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          {/* center */}
          <div className="flex justify-center py-10">
            <div className="grid h-44 w-44 place-items-center rounded-full bg-white/70">
              <ImageIcon className="h-14 w-14 text-[#555]" />
            </div>
          </div>

          <div className="mx-8 h-px bg-white/40" />

          {/* actions */}
          <div className="flex justify-between px-10 py-6">
            <button
              onClick={openFilePicker}
              className="flex w-24 flex-col items-center gap-2"
            >
              <Pencil className="h-7 w-7" />
              <span className="text-xs text-center">
                Izmeni fotografiju
              </span>
            </button>

            <button
              onClick={openFilePicker}
              className="flex w-24 flex-col items-center gap-2"
            >
              <Camera className="h-7 w-7" />
              <span className="text-xs text-center">
                Obnovi fotografiju
              </span>
            </button>

            <button
              onClick={onDelete}
              className="flex w-24 flex-col items-center gap-2"
            >
              <Trash2 className="h-7 w-7" />
              <span className="text-xs text-center">
                Obriši fotografiju
              </span>
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleprofilePictureChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}