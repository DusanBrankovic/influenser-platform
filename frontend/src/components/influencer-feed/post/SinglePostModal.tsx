import type { Post } from "@/types/post.types";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import UserHeader from "@/components/UserHeader";
import type { Influencer } from "@/types/influencer.types";
import type { CommentDto } from "@/types/comment.types";
import { transformToFormat } from "@/utils/transformDate";
import CommentsSection from "@/components/CommentsSection";
import PostButtons from "./postButtons";
import { ThumbsUp } from "lucide-react";

type PostProps = {
  influencer: Influencer;
  comments: CommentDto[];
  post: Post;
  openedPost: boolean;
  closeModal: () => void;
};
export default function SinglePostModal({
  influencer,
  comments,
  post,
  closeModal,
  openedPost,
}: PostProps) {
  const [indexImageDisplayed, setIndexImageDisplayed] = useState<number>(0);
  useEffect(() => {
    if (openedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openedPost]);

  const showImage = () => {
    const image = post.images[indexImageDisplayed];
    if (!image) return "";
    if (typeof image === "string") {
      return image;
    }
    return URL.createObjectURL(image);
  };
  if (!openedPost) return null;
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white w-screen h-screen p-10 ${openedPost ? "" : "hidden"}`}
    >
      <button
        onClick={closeModal}
        className="absolute top-6 right-6 cursor-pointer"
      >
        <MdClose size={24} />
      </button>
      <div className="w-2/3 h-full">
        <div className="relative h-full w-full flex justify-center items-center">
          <div className="h-fit w-fit rounded-lg border border-gray-300 overflow-hidden bg-white">
            <img src={showImage()} className="max-h-250 max-w-250 object-fit" />
          </div>
          <button
            onClick={() =>
              setIndexImageDisplayed((prev) =>
                prev === 0 ? post.images.length - 1 : prev - 1,
              )
            }
            className={`absolute top-1/2 left-1 bg-black/60 text-white rounded-full px-2 ${indexImageDisplayed === 0 ? "hidden" : ""}`}
          >
            {"<"}
          </button>
          <button
            onClick={() =>
              setIndexImageDisplayed((prev) =>
                prev === post.images.length - 1 ? 0 : prev + 1,
              )
            }
            className={`absolute top-1/2 right-1 bg-black/60 text-white rounded-full px-2 ${indexImageDisplayed === post.images.length - 1 ? "hidden" : ""}`}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="w-1/3 h-full p-10 overflow-y-auto flex flex-col">
        <UserHeader
          name={influencer.name}
          profileUrl={influencer.profileUrl}
          textBelowName={transformToFormat(post.createdAt)}
        />
        <div className="mt-4">{post.text}</div>
        <div className="flex items-center justify-between text-gray-600 text-sm cursor-default mt-10">
          <div className="flex gap-1 items-center">
            <ThumbsUp className="w-5 h-5" /> {post.numOfLikes ?? 0}
          </div>
          <button className="text-gray-500 hover:text-gray-800 cursor-pointer">
            {comments.length ?? 0} komentara
          </button>
        </div>

        <hr className="my-5 border-primary" />

        <PostButtons
          influencerId={influencer.userId}
          postId={post.id}
          likedByLoggedUser={post.isLikedByUser}
          savedByLoggedUser={post.isSavedByUser}
          toggleComments={() => {}}
        />
        <CommentsSection
          postId={post.id}
          comments={comments}
          influencer={influencer}
        />
      </div>
    </div>
  );
}
