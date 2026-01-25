import { createPost } from "@/services/postService";
import { useCustomContext } from "@/state-management/useContextHook";
import { useRouteContext } from "@tanstack/react-router";
import { useEffect } from "react";
import { LuImagePlus } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../Spinner";

export default function CreatePostModal() {
  const { createPost } = useCustomContext();
  const { influencer } = useRouteContext({
    from: "/_private/profile",
  });
  useEffect(() => {
    if (createPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [createPost]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 w-screen h-screen ${createPost ? "" : "hidden"}`}
    >
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-md w-1/2 h-[70%] p-10 flex flex-col">
        <CreatePostHeader
          name={influencer.name}
          profileUrl={influencer.profileUrl}
        />
        <CreatePostContent />
        <CreatePostFooter influencerId={influencer.userId} />
      </div>
    </div>
  );
}

const CreatePostHeader = ({
  name,
  profileUrl,
}: {
  name: string;
  profileUrl: string | null;
}) => {
  return (
    <div className="flex w-full items-center justify-start mb-4 gap-3">
      <img
        src={
          profileUrl ||
          "https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D"
        }
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <h2 className="font-bold text-lg">{name}</h2>
    </div>
  );
};

const CreatePostContent = () => {
  const { images, removeImage, postText, setPostText } = useCustomContext();
  return (
    <div className="flex flex-col gap-4 h-[80%]">
      <textarea
        className="w-full h-full border border-primary rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="What's on your mind?"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      ></textarea>
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 overflow-y-auto h-64">
          {images.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                className="rounded-lg object-cover h-32 w-full"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full px-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CreatePostFooter = ({ influencerId }: { influencerId: number }) => {
  const { closeCreatePost } = useCustomContext();
  const { images, postText, addImages, resetPost } = useCustomContext();

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", influencerId],
      });

      closeCreatePost();
      resetPost();
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
    closeCreatePost();
  };

  const createAPost = () => {
    if (!postText && images.length === 0) {
      toast("Cannot create an empty post.", { type: "error" });
      return;
    }
    const formData = new FormData();
    formData.append("text", postText);
    images.forEach((img) => formData.append("images", img));

    createPostMutation.mutate(formData);
  };

  return (
    <div className="w-full flex items-center justify-between mt-6">
      {createPostMutation.isPending && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl">
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
          onChange={(e) => uploadImage(e)}
        />
      </div>
      <div className="flex gap-3">
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer"
          onClick={createAPost}
        >
          Post
        </button>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-lg cursor-pointer"
          onClick={discardPost}
        >
          Discard
        </button>
      </div>
    </div>
  );
};
