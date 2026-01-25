import { deletePost } from "@/services/postService";
import type { Influencer } from "@/types/influencer.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmModal from "../ConfirmModal";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCustomContext } from "@/state-management/useContextHook";
import type { Post } from "@/types/post.types";

type PostHeaderProps = {
  influencer: Influencer;
  post: Post;
};

export default function PostHeader({ influencer, post }: PostHeaderProps) {
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
      queryClient.invalidateQueries({
        queryKey: ["posts", influencer.userId],
      });
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
    setPostText(post.text);
    setImages(post.images || []);
    setIsPostEditMode(true);
    setSelectedPostId(post.id);
    openPostModal();
  };

  const handleDeletePost = (id: number) => {
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
      <div className="flex gap-4">
        <img
          src={
            "https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D"
          }
          alt={influencer.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col items-start">
          <div className="font-bold text-lg">{influencer.name}</div>
          <div className="text-gray-500 text-xs">
            {transformToFormat(post.createdAt)}
          </div>
        </div>
      </div>
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
    </div>
  );
}
