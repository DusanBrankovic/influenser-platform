import { getInfluencerPosts } from "@/services/postService";
import type { Post } from "@/types/post.types";
import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import PostCard from "./postCard";
import CreatePostCard from "./CreatePostCard";
import PostModal from "./PostModal";

export default function InfluencerProfileFeed() {
  const { influencer } = useRouteContext({
    from: "/_private/profile",
  });

  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts", influencer.userId],
    queryFn: () => getInfluencerPosts(influencer.userId),
    enabled: !!influencer.userId,
  });

  if (isLoading) {
    return <div className="mt-10 p-10 px-20 text-center">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="mt-10 p-10 px-20 text-center">Error loading posts.</div>
    );
  }
 
  return (
    <div className="mt-10 p-10 px-20">
      <CreatePostCard />
      <PostModal />
      {data?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((post) => (
        <PostCard key={post.id} influencer={influencer} post={post} />
      ))}
    </div>
  );
}
