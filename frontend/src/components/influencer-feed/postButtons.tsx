import { MessageSquareText, ThumbsUp } from "lucide-react";
import { IoMdThumbsUp } from "react-icons/io";
import { TbCopyPlusFilled, TbCopyPlus } from "react-icons/tb";

type PostButtonsProps = {
  postId: number;
  likedByLoggedUser: boolean;
  savedByLoggedUser: boolean;
  toggleComments: () => void;
};

export default function PostButtons({ postId, likedByLoggedUser, savedByLoggedUser, toggleComments }: PostButtonsProps) {
  const handleLikePost = (id: number) => {
    console.log(`Like post with ID: ${id}`);
  };
  const handleCommentPost = () => {
    toggleComments();
  };
  const handleSavePost = (id: number) => {
    console.log(`Share post with ID: ${id}`);
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