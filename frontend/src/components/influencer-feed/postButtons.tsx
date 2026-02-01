import { likePost, savePost } from "@/services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageSquareText, ThumbsUp } from "lucide-react";
import { IoMdThumbsUp } from "react-icons/io";
import { TbCopyPlusFilled, TbCopyPlus } from "react-icons/tb";
import { toast } from "react-toastify";

type PostButtonsProps = {
  influencerId: number;
  postId: number;
  likedByLoggedUser: boolean;
  savedByLoggedUser: boolean;
  toggleComments: () => void;
};

export default function PostButtons({ influencerId, postId, likedByLoggedUser, savedByLoggedUser, toggleComments }: PostButtonsProps) {
  const queryClient = useQueryClient();
  const likePostMutation = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", influencerId],
      });
    },
    onError: () => {
      toast("Failed to like post. Please try again.", { type: "error" });
    },
  });

  const savePostMutation = useMutation({
    mutationFn: savePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", influencerId],
      });
    },
    onError: () => {
      toast("Failed to save post. Please try again.", { type: "error" });
    },
  });
  
  const handleLikePost = (id: number) => {
    likePostMutation.mutate(id);
  };

  const handleCommentPost = () => {
    toggleComments();
  };

  const handleSavePost = (id: number) => {
    savePostMutation.mutate(id);
  };

  return (
    <div className="flex justify-around px-[20%]">
      <button
        onClick={() => handleLikePost(postId)}
        className="flex gap-2 items-center text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        {!likedByLoggedUser && <ThumbsUp className='w-7 h-7' />}
        {likedByLoggedUser && <IoMdThumbsUp className='w-8 h-8' fill="#1e85ff"/>}
      </button>
      <button
        onClick={() => handleCommentPost()}
        className="flex gap-2 items-center text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        <MessageSquareText className="w-7 h-7" />
      </button>
      <button
        onClick={() => handleSavePost(postId)}
        className="flex gap-2 items-center text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        {!savedByLoggedUser &&<TbCopyPlus className='w-8 h-8' />}
        {savedByLoggedUser &&<TbCopyPlusFilled className='w-8 h-8' fill="#ffb732"/>}
      </button>
    </div>
  );
};