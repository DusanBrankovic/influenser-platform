import { useCustomContext } from "@/state-management/useContextHook";
import { useRouteContext } from "@tanstack/react-router";

export default function CreatePostCard() {
  const { openCreatePost } = useCustomContext();
  const { influencer } = useRouteContext({
    from: "/_private/profile",
  });

  const createPost = () => {
    openCreatePost();
  };

  return (
    <div
      className="border border-primary rounded-lg p-6 mb-16 bg-white flex gap-4 items-center justify-start cursor-pointer"
      onClick={createPost}
    >
      <img
        src={
          influencer.profileUrl ||
          "https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D"
        }
        className="w-12 h-12 rounded-full object-cover"
      />
      <h2 className="border border-primary rounded-lg p-4 bg-white w-5/6">
        Start creating new post...
      </h2>
    </div>
  );
}
