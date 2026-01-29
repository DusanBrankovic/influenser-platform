import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type EditProfilePopupValues = {
  headline: string;
  experience: string;
};

type EditBioAndExperiencePopUpProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  initialValues?: Partial<EditProfilePopupValues>;

  onSave: (values: EditProfilePopupValues) => void;
  onCancel?: () => void;

  saving?: boolean;
};

export function EditBioAndExperiencePopUp({
  open,
  onOpenChange,
  initialValues,
  onSave,
  onCancel,
  saving = false,
}: EditBioAndExperiencePopUpProps) {
  const [description, setDescription] = React.useState(
    initialValues?.headline ?? ""
  );
  const [yearsOfExperience, setYearsOfExperience] = React.useState(
    initialValues?.experience ?? ""
  );

  React.useEffect(() => {
    if (!open) return;
    setDescription(initialValues?.headline ?? "");
    setYearsOfExperience(initialValues?.experience ?? "");
  }, [open, initialValues?.headline, initialValues?.experience]);

  const handleClose = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleSave = () => {
    onSave({
      headline: description.trim(),
      experience: yearsOfExperience.trim(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-3xl rounded-2xl p-0"
      >
        <div className="p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-lg font-semibold">
              Opis profila
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
                <Label className="font-semibold">Opis profila</Label>

                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Bio will appear here..."
                    className="
                    h-[110px]
                    resize-none
                    overflow-y-auto
                    overflow-x-hidden
                    break-all
                    whitespace-pre-wrap
                    rounded-xl
                    border border-black/70
                    bg-white
                    p-4
                    "
                />
                </div>


            <div className="space-y-2">
              <Label className="font-semibold">Godine iskustva</Label>
              <Input
                value={yearsOfExperience}
                onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, "");
                    setYearsOfExperience(cleaned);
                }}
                onKeyDown={(e) => {
                    if (["e", "E", "+", "-", "."].includes(e.key)) {
                    e.preventDefault();
                    }
                }}
                placeholder="Years of experience..."
                className="h-11 rounded-xl border border-black/70 bg-white"
                inputMode="numeric"
                maxLength={3}
                />

            </div>

            <div className="flex justify-end gap-4 pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClose}
                className="h-10 rounded-full px-10 bg-neutral-200 hover:bg-neutral-300"
                disabled={saving}
              >
                Odustani
              </Button>

              <Button
                type="button"
                onClick={handleSave}
                className="h-10 rounded-full px-10 bg-neutral-200 text-black hover:bg-neutral-300"
                disabled={saving}
              >
                Sačuvaj
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
