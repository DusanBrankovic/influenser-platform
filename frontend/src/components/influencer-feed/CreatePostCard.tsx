import { useCustomContext } from "@/state-management/useContextHook";
import AvatarInitials from "../AvatarInitials";
import { useRouteContext } from "@tanstack/react-router";

export default function CreatePostCard() {
  const { openPostModal, setIsPostEditMode, setSelectedPostId } =
    useCustomContext();

  const { influencer } = useRouteContext({
    from: "/_private/profile",
  });

  const onOpenPostModal = () => {
    setIsPostEditMode(false);
    setSelectedPostId(null);
    openPostModal();
  };

  return (
    <div
      className="border border-primary rounded-lg p-6 mb-16 bg-white flex gap-4 items-center justify-start cursor-pointer"
      onClick={onOpenPostModal}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpenPostModal();
      }}
    >
      <div className="h-16 w-16 rounded-full overflow-hidden flex items-center justify-center">
        {influencer.profileImage ? (
          <img
            src={influencer.profileImage}
            className="h-full w-full object-cover"
            alt={`${influencer.name} profile`}
          />
        ) : (
          <AvatarInitials name={influencer.name} size={64} circle />
        )}
      </div>

      <h2 className="border border-primary rounded-lg p-4 bg-white w-5/6">
        Start creating new post...
      </h2>
    </div>
  );
}
