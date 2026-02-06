import { getUserIdFromToken } from "@/auth/authStore";
import { getSavedPosts } from "@/services/postService";
import type { SavedPost } from "@/types/post.types";
import { useQuery } from "@tanstack/react-query";
import UserHeader from "../UserHeader";
import { transformToFormat } from "@/utils/transformDate";
import SinglePostModal from "../influencer-feed/post/SinglePostModal";
import { useState } from "react";
import type { CommentDto } from "@/types/comment.types";

export default function SavedPostsFeed() {
  const userId = getUserIdFromToken();
  const [openSinglePostModal, setOpenSinglePostModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const { data, isLoading, error } = useQuery<SavedPost[]>({
    queryKey: ["savedPosts", userId],
    queryFn: () => getSavedPosts(),
    enabled: !!userId,
  });

  const onOpenModal = (postId: number) => {
    setSelectedPostId(postId);
    setOpenSinglePostModal(true);
  };

  const onCloseModal = () => {
    setSelectedPostId(null);
    setOpenSinglePostModal(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching saved posts</div>;
  return (
    <div className="flex flex-col p-10 gap-6">
      {data?.length === 0 && (
        <div className="flex items-center justify-center py-20 text-muted-foreground text-lg">
          No saved posts yet
        </div>
      )}
      {selectedPostId !== null && (
        <SinglePostModal
          influencer={
            data?.find((post) => post.id === selectedPostId)
              ?.user as SavedPost["user"]
          }
          post={data?.find((post) => post.id === selectedPostId) as SavedPost}
          openedPost={openSinglePostModal}
          closeModal={() => onCloseModal()}
          comments={
            data?.find((post) => post.id === selectedPostId)
              ?.comments as CommentDto[]
          }
        />
      )}
      {data?.map((post) => (
        <div
          key={post.id}
          className="flex flex-col gap-4 w-full p-6 justify-between rounded-lg border bg-white border-black  cursor-pointer"
          onClick={() => onOpenModal(post.id)}
        >
          <UserHeader
            name={post.user.name}
            profileUrl={post.user.profileUrl}
            textBelowName={transformToFormat(post.createdAt)}
          />
          <div className="flex gap-10">
            {post.images && post.images.length > 0 && (
              <SmallGallery images={post.images} />
            )}
            {post.text && (
              <p className={`${post.images.length > 0 ? "w-4/5" : "w-full"}`}>
                {post.text}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function SmallGallery({ images }: { images: string[] }) {
  if (images.length < 3) {
    return (
      <div
        className={`grid gap-px mb-4 overflow-hidden rounded-xl aspect-15/12 max-w-50
    ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"}
  `}
      >
        {images.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            className="w-full h-full object-cover"
            alt=""
          />
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="flex gap-px aspect-15/12 overflow-hidden rounded-xl mb-4 max-w-50">
        <div className="flex gap-px h-full">
          <img src={images[0]} className="w-1/3 h-full object-cover" alt="" />
          <img src={images[1]} className="w-1/3 h-full object-cover" alt="" />
          <img src={images[2]} className="w-1/3 h-full object-cover" alt="" />
        </div>
      </div>
    );
  }

  if (images.length > 3) {
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-px aspect-15/12 overflow-hidden rounded-xl mb-4 max-w-50">
        {" "}
        {images.slice(0, 4).map((imgUrl, i) => (
          <img
            key={i}
            src={imgUrl}
            className="w-full h-full object-cover"
            alt=""
          />
        ))}{" "}
      </div>
    );
  }
}
