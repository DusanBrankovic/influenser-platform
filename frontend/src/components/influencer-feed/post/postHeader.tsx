import { deletePost } from "@/services/postService";
import type { Influencer } from "@/types/influencer.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { toast } from "react-toastify";
import { useCustomContext } from "@/state-management/useContextHook";
import type { Post } from "@/types/post.types";
import { transformToFormat } from "@/utils/transformDate";
import ConfirmModal from "@/components/ConfirmModal";
import UserHeader from "@/components/UserHeader";


type PostHeaderProps = {
  influencer?: Influencer;
  post: Post;
  isEditable?: boolean;
};

export default function PostHeader({
  influencer,
  post,
  isEditable = true,
}: PostHeaderProps) {
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
        text={
          "Are you sure you want to delete this post? This action cannot be undone."
        }
        isOpen={isOpenConfirmModal}
        onClose={() => setIsOpenConfirmModal(false)}
        onConfirm={() => handleDeletePost(post.id)}
      />

      <UserHeader
        name={influencer?.name || ""}
        profileUrl={influencer?.profilePicture || null}
        textBelowName={transformToFormat(post.createdAt)}
      />

      {isEditable && (
        <div className="flex gap-4 text-gray-500">
          <button
            className="hover:text-gray-800 cursor-pointer"
            onClick={handleEditPost}
          >
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
