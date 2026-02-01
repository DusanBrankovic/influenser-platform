import { getInfluencerPosts } from "@/services/postService";
import type { Post } from "@/types/post.types";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./postCard";
import CreatePostCard from "./CreatePostCard";
import PostModal from "./PostModal";
import type { Influencer } from "@/types/influencer.types";

type Props = {
  userId?: number;
  influencer: Influencer;
  isEditable?: boolean;
};

export default function InfluencerProfileFeed({ influencer, isEditable = true }: Props) {
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts", influencer.userId],
    queryFn: () => getInfluencerPosts(influencer.userId),
    enabled: !!influencer.userId,
  });

  if (isLoading) return <div className="mt-10 p-10 px-20 text-center">Loading posts...</div>;
  if (error) return <div className="mt-10 p-10 px-20 text-center">Error loading posts.</div>;

  return (
    <div className="mt-10 p-10 px-20">
      {isEditable && (
        <>
          <CreatePostCard />
          <PostModal />
        </>
      )}

      {(() => {
        const sortedPosts =
          data
            ?.slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            ) ?? [];

        if (sortedPosts.length === 0) {
          return (
            <div className="flex items-center justify-center py-20 text-muted-foreground text-lg">
              No posts yet
            </div>
          );
        }

        return sortedPosts.map((post) => (
          <PostCard
            key={post.id}
            influencer={influencer}
            post={post}
            isEditable={isEditable}
          />
        ));
      })()}
    </div>

  );
}
