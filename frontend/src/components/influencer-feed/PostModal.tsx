import { createPost, editPost } from "@/services/postService";
import { useCustomContext } from "@/state-management/useContextHook";
import { useEffect, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../Spinner";
import { insertAtCursor } from "@/utils/insertAtCursor";
import { EmojiPickerButton } from "../EmojiButton";
import AvatarInitials from "../AvatarInitials";
import { getLoggedInInfluencer } from "@/services/influencerService";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostModal() {
  const { isOpenPostModal, isPostEditMode, selectedPostId } = useCustomContext();

  // ✅ Get influencer from react-query (cached by ProfilePage if already fetched)
  const { data: influencer, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getLoggedInInfluencer,
    enabled: isOpenPostModal, // only fetch when modal is open
  });

  useEffect(() => {
    if (isOpenPostModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenPostModal]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-90 bg-opacity-50 w-screen h-screen ${
        isOpenPostModal ? "" : "hidden"
      }`}
    >
      <ToastContainer />

      <div className="bg-white rounded-lg shadow-md w-1/3 h-[80%] p-10 flex flex-col relative">
        {/* ✅ Header loader */}
        {isLoading && (
          <div className="flex w-full items-center justify-start mb-4 gap-3">
            <Skeleton className="h-[50px] w-[50px] rounded-full" />
            <Skeleton className="h-6 w-40 rounded" />
          </div>
        )}

        {/* ✅ If influencer isn't available (not logged in / error), don't crash */}
        {!isLoading && !influencer && (
          <div className="flex flex-col gap-3">
            <div className="text-sm text-black/70">
              Couldn&apos;t load your profile.
            </div>
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded-lg cursor-pointer self-end"
              onClick={() => {
                // close modal
                // (you have closePostModal in PostFooter, but we can just do nothing here
                // or you can import it here if you want)
              }}
            >
              Close
            </button>
          </div>
        )}

        {/* ✅ Render real content when influencer exists */}
        {!isLoading && influencer && (
          <>
            <PostHeader name={influencer.name} profileUrl={influencer.profileImage} />
            <PostContent />
            <PostFooter
              influencerId={influencer.userId}
              isEditMode={isPostEditMode}
              postId={selectedPostId || 0}
            />
          </>
        )}
      </div>
    </div>
  );
}

const PostHeader = ({
  name,
  profileUrl,
}: {
  name: string;
  profileUrl: string | null;
}) => {
  return (
    <div className="flex w-full items-center justify-start mb-4 gap-3">
      <div className="h-[50px] w-[50px] rounded-full overflow-hidden flex items-center justify-center">
        {profileUrl ? (
          <img
            src={profileUrl}
            className="h-full w-full object-cover"
            alt={`${name} profile`}
          />
        ) : (
          <AvatarInitials name={name} size={50} circle />
        )}
      </div>
      <h2 className="font-bold text-lg">{name}</h2>
    </div>
  );
};

const PostContent = () => {
  const { images, removeImage, postText, setPostText } = useCustomContext();
  const [indexImageDisplayed, setIndexImageDisplayed] = useState<number>(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEmoji = (emoji: string) => {
    setPostText(insertAtCursor(postText, emoji, textareaRef.current));

    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  const showImage = () => {
    const image = images[indexImageDisplayed];
    if (!image) return "";
    if (typeof image === "string") return image;
    return URL.createObjectURL(image);
  };

  const onRemoveImage = (index: number) => {
    setIndexImageDisplayed(0);
    removeImage(index);
  };

  return (
    <div className="flex flex-col gap-4 h-[80%] relative">
      <textarea
        ref={textareaRef}
        className={`w-full border border-primary rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary ${
          images.length > 0 ? "h-1/3" : "h-full"
        }`}
        placeholder="What's on your mind?"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />
      <div className="absolute top-3 right-3">
        <EmojiPickerButton onSelect={handleEmoji} />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-1 min-h-[80%]">
          <div className="relative h-full overflow-hidden">
            <img
              src={showImage()}
              className="rounded-lg object-cover h-full w-full"
              alt="Post media"
            />
            <button
              onClick={() => onRemoveImage(indexImageDisplayed)}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full px-2"
            >
              ✕
            </button>

            <button
              onClick={() =>
                setIndexImageDisplayed((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className={`absolute top-1/2 left-1 bg-black/60 text-white rounded-full px-2 ${
                indexImageDisplayed === 0 ? "hidden" : ""
              }`}
            >
              {"<"}
            </button>

            <button
              onClick={() =>
                setIndexImageDisplayed((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              className={`absolute top-1/2 right-1 bg-black/60 text-white rounded-full px-2 ${
                indexImageDisplayed === images.length - 1 ? "hidden" : ""
              }`}
            >
              {">"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const PostFooter = ({
  influencerId,
  isEditMode,
  postId,
}: {
  influencerId: number;
  isEditMode: boolean;
  postId: number;
}) => {
  const { closePostModal } = useCustomContext();
  const { images, postText, addImages, resetPost } = useCustomContext();

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", influencerId] });
      closePostModal();
      resetPost();
    },
    onError: () => {
      toast("Failed to create post. Please try again.", { type: "error" });
    },
  });

  const editPostMutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", influencerId] });
      closePostModal();
      resetPost();
    },
    onError: () => {
      toast("Failed to edit post. Please try again.", { type: "error" });
    },
  });

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const filesArray = Array.from(target.files);
      addImages(filesArray);
      target.value = "";
    }
  };

  const discardPost = () => {
    resetPost();
    closePostModal();
  };

  const onCreatePost = () => {
    if (!postText && images.length === 0) {
      toast("Cannot create an empty post.", { type: "error" });
      return;
    }
    const formData = new FormData();
    formData.append("text", postText);
    images.forEach((img) => formData.append("images", img));
    createPostMutation.mutate(formData);
  };

  const onEditPost = () => {
    if (!postText && images.length === 0) {
      toast("Cannot create an empty post.", { type: "error" });
      return;
    }
    const formData = new FormData();
    formData.append("postId", postId.toString());
    formData.append("text", postText);

    const newImages = images.filter((img) => typeof img !== "string");
    const existingImageUrls = images.filter((img) => typeof img === "string");

    formData.append("existingImageUrls", JSON.stringify(existingImageUrls));
    newImages.forEach((img) => formData.append("newImages", img));

    editPostMutation.mutate(formData);
  };

  const onActionClick = () => {
    if (isEditMode) onEditPost();
    else onCreatePost();
  };

  // ✅ fix precedence + show overlay correctly
  const isPending = createPostMutation.isPending || editPostMutation.isPending;

  return (
    <div className="w-full flex items-center justify-between mt-6 relative">
      {isPending && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl z-10">
          <Spinner />
        </div>
      )}

      <div className="relative">
        <button className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer">
          <LuImagePlus className="w-5 h-5 mx-5" />
        </button>
        <input
          type="file"
          id="myFile"
          name="filename"
          multiple
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={uploadImage}
        />
      </div>

      <div className="flex gap-3">
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer"
          onClick={onActionClick}
          disabled={isPending}
        >
          {isEditMode ? "Update Post" : "Create Post"}
        </button>

        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-lg cursor-pointer"
          onClick={discardPost}
          disabled={isPending}
        >
          Discard
        </button>
      </div>
    </div>
  );
};
