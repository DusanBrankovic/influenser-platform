import { useCustomContext } from "@/state-management/useContextHook";
import AvatarInitials from "../AvatarInitials";
import { useQuery } from "@tanstack/react-query";
import { getLoggedInInfluencer } from "@/services/influencerService";
import { Skeleton } from "@/components/ui/skeleton";

export default function CreatePostCard() {
  const { openPostModal, setIsPostEditMode, setSelectedPostId } =
    useCustomContext();

  const { data: influencer, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getLoggedInInfluencer,
  });

  const onOpenPostModal = () => {
    setIsPostEditMode(false);
    setSelectedPostId(null);
    openPostModal();
  };

  if (isLoading) {
    return (
      <div className="border border-primary rounded-lg p-6 mb-16 bg-white flex gap-4 items-center">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-14 w-5/6 rounded-lg" />
      </div>
    );
  }

  // If not logged in / request failed / null
  if (!influencer) {
    return null; // or render a disabled card / prompt to login
  }

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
