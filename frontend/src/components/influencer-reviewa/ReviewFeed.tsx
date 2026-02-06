import { getUserReviews } from "@/services/reviewService";
import type { ReviewDto } from "@/types/review.types";
import UserHeader from "../UserHeader";
import { useQuery } from "@tanstack/react-query";
import type { Influencer } from "@/types/influencer.types";
import { useState } from "react";
import { ReviewModal } from "./ReviewModal";
import { getUserIdFromToken } from "@/auth/authStore";
import { transformToFormat } from "@/utils/transformDate";
import StarRating from "./StarRating";

type ReviewFeedProps = {
  influencer: Influencer;
};

export function ReviewFeed({ influencer }: ReviewFeedProps) {
  const { data, isLoading, error } = useQuery<ReviewDto[]>({
    queryKey: ["reviews", influencer.userId],
    queryFn: () => getUserReviews(influencer.userId),
    enabled: !!influencer.userId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reviews</div>;

  return (
    <div className="mt-10 pb-10 px-20 text-center">
      <AddNewReviewCard influencer={influencer} />
      {data?.length ? (
        data.map((review: ReviewDto) => (
          <ReviewCard key={review.id} review={review} />
        ))
      ) : (
        <div>No reviews found</div>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewDto }) {
  return (
    <div className="mt-10 border-b py-4 flex flex-col gap-4 justify-start">
      <div className="flex justify-between">
        <UserHeader
          name={review.reviewerName}
          profileUrl={review.reviewerProfilePicture}
        />
        <p className="text-sm text-gray-400">
          {transformToFormat(review.createdAt)}
        </p>
      </div>
      <StarRating value={review.rating} disabled={true} onChange={() => {}} text="ocena"/>
      <p className="w-full text-start mt-1">{review.comment}</p>
    </div>
  );
}

function AddNewReviewCard({ influencer }: { influencer: Influencer }) {
  const loggedUserId = getUserIdFromToken();
  const [openReviewModal, setOpenReviewModal] = useState(false);

  if (loggedUserId === influencer.userId) return null;
  return (
    <div className="border-b py-4 flex flex-col gap-10">
      <ReviewModal
        userId={influencer.userId}
        openReviewModal={openReviewModal}
        setOpenReviewModal={setOpenReviewModal}
      />
      <div className="flex justify-between">
        <UserHeader name={influencer.name} profileUrl={influencer.profileUrl} />
      </div>
      <div
        className="bg-background rounded-lg p-4 text-primary font-semibold cursor-pointer w-3/5 mx-auto"
        onClick={() => setOpenReviewModal(true)}
      >
        Leave a review...
      </div>
    </div>
  );
}
