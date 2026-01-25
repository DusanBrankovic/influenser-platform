import { deletePost } from "@/services/postService";
import type { Influencer } from "@/types/influencer.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AreYouSureModal from "../AreYouSureModal";
import { useState } from "react";
import { toast } from "react-toastify";

type PostHeaderProps = {
  influencer: Influencer;
  postTimestamp: string;
  postId: number;
};

export default function PostHeader({
  influencer,
  postTimestamp,
  postId,
}: PostHeaderProps) {
  const [ isOpen, setIsOpen ] = useState(false);
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
  const handleEditPost = (id: number) => {
    console.log(`Edit post with ID: ${id}`);
  };

  const handleDeletePost = (id: number) => {
    deletePostMutation.mutate(id);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <AreYouSureModal
        text={"Are you sure you want to delete this post? This action cannot be undone."}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => handleDeletePost(postId)}
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
          <div className="text-gray-500 text-xs">{postTimestamp}</div>
        </div>
      </div>
      <div className="flex gap-4 text-gray-500">
        <button
          className="hover:text-gray-800 cursor-pointer"
          onClick={() => handleEditPost(postId)}
        >
          Edit
        </button>
        <button
          className="hover:text-gray-800 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
