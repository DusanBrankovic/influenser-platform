import type { Influencer } from "@/types/influencer.types";
import type { Post } from "@/types/post.types";
import { ThumbsUp } from "lucide-react";
import PostHeader from "./postHeader";
import PostGallery from "./postGallery";
import PostButtons from "./postButtons";
import { useQuery } from "@tanstack/react-query";
import type { CommentDto } from "@/types/comment.types";
import { getCommentsForPost } from "@/services/commentService";
import CommentsSection from "../../CommentsSection";
import { useState } from "react";
import SinglePostModal from "./SinglePostModal";

type PostCardProps = {
  influencer: Influencer;
  post: Post;
  isEditable?: boolean;
};

export default function PostCard({
  influencer,
  post,
  isEditable = true,
}: PostCardProps) {
  const [showCommentsSection, setShowCommentsSection] = useState(false);
  const [openSinglePostModal, setOpenSinglePostModal] = useState(false);
  const { data } = useQuery<CommentDto[]>({
    queryKey: ["comments", post.id],
    queryFn: () => getCommentsForPost(post.id),
    enabled: !!post.id,
  });

  return (
    <div className="border border-primary rounded-lg p-6 mb-16 bg-white">
      <SinglePostModal
        influencer={{...influencer, profileUrl: influencer.profileUrl || ''} }
        comments={data ?? []}
        post={post}
        openedPost={openSinglePostModal}
        closeModal={() => setOpenSinglePostModal(false)}
      />
      <PostHeader influencer={influencer} post={post} isEditable={isEditable} />
      <div className="mb-4">{post.text}</div>
      {post.images.length > 0 && (
        <div
          className="cursor-pointer"
          onClick={() => setOpenSinglePostModal(true)}
        >
          <PostGallery images={post.images} />
        </div>
      )}
      <div className="flex items-center justify-between text-gray-600 text-sm cursor-default">
        <div className="flex gap-1 items-center">
          <ThumbsUp className="w-5 h-5" /> {post.numOfLikes ?? 0}
        </div>
        <button
          className="text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={() => setShowCommentsSection(!showCommentsSection)}
        >
          {data?.length ?? 0} komentara
        </button>
      </div>

      <hr className="my-5 border-primary" />

      <PostButtons
        influencerId={influencer.userId}
        postId={post.id}
        likedByLoggedUser={post.isLikedByUser}
        savedByLoggedUser={post.isSavedByUser}
        toggleComments={() => setShowCommentsSection(!showCommentsSection)}
      />
      {showCommentsSection && (
        <CommentsSection
          postId={post.id}
          comments={data ?? []}
          influencer={{...influencer, profileUrl: influencer.profileUrl || ''} }
        />
      )}
    </div>
  );
}
