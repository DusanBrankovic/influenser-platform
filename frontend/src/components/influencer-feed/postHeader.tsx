import { deletePost } from "@/services/postService";
import type { Influencer } from "@/types/influencer.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmModal from "../ConfirmModal";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCustomContext } from "@/state-management/useContextHook";
import type { Post } from "@/types/post.types";
import AvatarInitials from "../AvatarInitials";

type PostHeaderProps = {
  influencer?: Influencer;
  post: Post;
  isEditable?: boolean;
};

export default function PostHeader({ influencer, post, isEditable = true }: PostHeaderProps) {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const {
    openPostModal,
    setPostText,
    setImages,
    setIsPostEditMode,
    setSelectedPostId,
  } = useCustomContext();

  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      if (influencer?.userId) {
        queryClient.invalidateQueries({
          queryKey: ["posts", influencer.userId],
        });
      }
    },
    onError: () => {
      toast("Failed to delete post. Please try again.", { type: "error" });
    },
  });

  const transformToFormat = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(dateString).toLocaleDateString("sr-RS", options);
  };

  const handleEditPost = () => {
    if (!isEditable) return;

    setPostText(post.text);
    setImages(post.images || []);
    setIsPostEditMode(true);
    setSelectedPostId(post.id);
    openPostModal();
  };

  const handleDeletePost = (id: number) => {
    if (!isEditable) return;

    deletePostMutation.mutate(id);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <ConfirmModal
        text={"Are you sure you want to delete this post? This action cannot be undone."}
        isOpen={isOpenConfirmModal}
        onClose={() => setIsOpenConfirmModal(false)}
        onConfirm={() => handleDeletePost(post.id)}
      />

      <div className="flex gap-4">
        <div className="h-16 w-16 rounded-full overflow-hidden flex items-center justify-center">
          {influencer?.profileImage ? (
            <img src={influencer.profileImage} className="h-full w-full object-cover" />
          ) : (
            <AvatarInitials name={influencer?.name || ""} size={50} circle />
          )}
        </div>

        <div className="flex flex-col items-start">
          <div className="font-bold text-lg">{influencer?.name}</div>
          <div className="text-gray-500 text-xs">{transformToFormat(post.createdAt)}</div>
        </div>
      </div>

      {isEditable && (
        <div className="flex gap-4 text-gray-500">
          <button className="hover:text-gray-800 cursor-pointer" onClick={handleEditPost}>
            Edit
          </button>
          <button
            className="hover:text-gray-800 cursor-pointer"
            onClick={() => setIsOpenConfirmModal(true)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
