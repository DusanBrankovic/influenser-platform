import { IoMdCloseCircleOutline } from "react-icons/io";
import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import { leaveReview } from "@/services/reviewService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { useCustomContext } from "@/state-management/useContextHook";

type ReviewModalProps = {
  userId: number;
  openReviewModal: boolean;
  setOpenReviewModal: (open: boolean) => void;
};

export function ReviewModal({
    userId,
  openReviewModal,
  setOpenReviewModal,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { setIsLoading } = useCustomContext();
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: leaveReview,
    onSuccess: () => {
      setRating(0);
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["reviews", userId] });
    },
    onError: () => {
      toast("Error adding comment", { type: "error" });
    },
  });

  const isLoading = addCommentMutation.isPending;
  useEffect(() => {
      setIsLoading(isLoading);
    }, [isLoading, setIsLoading]);


  async function submitReview() {
    if (rating === 0) {
      toast("Please enter a rating", { type: "error" });
      return;
    }
    await leaveReview({ rating, comment, userId });
    setOpenReviewModal(false);
  }

  if (!openReviewModal) return null;
  return (
      <div className="fixed inset-0 z-50 flex flex-col items-center w-screen h-screen backdrop-brightness-50 bg-opacity-50 justify-center">
        <ToastContainer />
      <div className="bg-white rounded-lg shadow-md w-1/3 p-10 flex flex-col gap-10 h-1/2">
        <Header setOpenReviewModal={setOpenReviewModal} />
        <div className="w-full flex flex-col justify-start gap-2">
          <p className="w-fit font-semibold ps-2">Enter a rating</p>
          <StarRating
            value={rating}
            onChange={(value) => {
              setRating(value);
            }}
          />
        </div>
        <textarea
          className="w-full h-1/3 p-3 border border-gray-300 rounded-lg resize-none ring-primary focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="self-end px-6 py-2 bg-primary text-white rounded-lg cursor-pointer"
          onClick={submitReview}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function Header({
  setOpenReviewModal,
}: {
  setOpenReviewModal: (open: boolean) => void;
}) {
  return (
    <div className="flex justify-between w-full">
      <h2 className="text-2xl font-semibold">Leave a review</h2>
      <button
        className="cursor-pointer"
        onClick={() => setOpenReviewModal(false)}
      >
        <IoMdCloseCircleOutline className="text-3xl" />
      </button>
    </div>
  );
}
