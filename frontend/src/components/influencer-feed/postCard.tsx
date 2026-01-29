import type { Influencer } from "@/types/influencer.types";
import type { Post } from "@/types/post.types";
import { ThumbsUp } from "lucide-react";
import PostHeader from "./postHeader";
import PostGallery from "./postGallery";
import PostButtons from "./postButtons";

type PostCardProps = {
  influencer: Influencer;
  post: Post;
  isEditable?: boolean;
}

export default function PostCard({
  influencer,
  post,
  isEditable = true
}: PostCardProps) {
  return (
    <div className="border border-primary rounded-lg p-6 mb-16 bg-white">
      <PostHeader
        influencer={influencer}
        post={post}
        isEditable={isEditable}
      />
      <div className="mb-4">{post.text}</div>
      {post.images.length > 0 && <PostGallery images={post.images} />}
      <div className="flex items-center justify-between text-gray-600 text-sm cursor-default">
        <div className="flex gap-1 items-center">
          <ThumbsUp className="w-5 h-5" /> {post.numLikes ?? 0}
        </div>
        <button className="text-gray-500 hover:text-gray-800 cursor-pointer">
            {post.numComments ?? 0} komentara
        </button>
      </div>

      <hr className="my-5 border-primary" />

      <PostButtons postId={post.id} likedByLoggedUser={post.likedByLoggedUser} savedByLoggedUser={post.savedByLoggedUser} />
    </div>
  );
};