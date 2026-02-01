import type { CommentDto } from "@/types/comment.types";
import { transformToFormat } from "@/utils/transformDate";
import UserHeader from "./UserHeader";
import type { Influencer } from "@/types/influencer.types";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { EmojiPickerButton } from "./EmojiButton";
import { insertAtCursor } from "@/utils/insertAtCursor";
import { SendIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "@/services/commentService";
import { useCustomContext } from "@/state-management/useContextHook";

type CommentsSectionProps = {
  influencer: Influencer;
  postId: number;
  comments: CommentDto[];
};

export default function CommentsSection({
  influencer,
  postId,
  comments,
}: CommentsSectionProps) {
  return (
    <div className="mt-10">
        <ToastContainer />
      <AddCommentSection postId={postId} influencer={influencer} />
      <div className="p-6 flex flex-col gap-6">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

function AddCommentSection({
  postId,
  influencer,
}: {
  postId: number;
  influencer: Influencer;
}) {
  const [comment, setComment] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { setIsLoading } = useCustomContext();
  const queryClient = useQueryClient();

  
  const addCommentMutation = useMutation({
      mutationFn: addComment,
      onSuccess: () => {
          setComment("");
          queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        },
        onError: () => {
            toast("Error adding comment", { type: "error" });
        },
    });

  const isLoading = addCommentMutation.isPending;

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const handleEmoji = (emoji: string) => {
    setComment(insertAtCursor(comment, emoji, inputRef.current));
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const addAComment = () => {
    if (comment.trim() === "") {
      toast("Comment cannot be empty", { type: "error" });
      return;
    }
    addCommentMutation.mutate({ postId, content: comment });
  };
  return (
    <div
      className="p-6 bg-white flex gap-4 items-center justify-start cursor-pointer relative"
      role="button"
      tabIndex={0}
    >
      <UserHeader
        name={influencer?.name}
        profileUrl={influencer?.profileImage}
        displayName={false}
      />

      <textarea
        ref={inputRef}
        rows={1}
        style={{ resize: "none" }}
        className="border border-primary rounded-lg p-4 bg-white w-5/6"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="absolute top-10 right-[11%]">
        <EmojiPickerButton onSelect={handleEmoji} />
      </div>
      <SendIcon onClick={addAComment} />
    </div>
  );
}
function CommentCard({ comment }: { comment: CommentDto }) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center w-full">
        <div className="flex">
          <UserHeader
            name={comment.userName}
            profileUrl={comment.userProfilePicture}
          />
        </div>
        <div className="text-gray-500 text-xs">
          {transformToFormat(comment.createdAt)}
        </div>
      </div>
      <p className="text-gray-700 ps-15 p-4 pt-0">{comment.content}</p>
    </div>
  );
}
