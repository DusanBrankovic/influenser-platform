import { useState, type ReactNode } from "react"
import { Context, type ImageType } from "./context"

export function ContextProvider({ children }: { children: ReactNode }) {
  const [isOpenPostModal, setIsOpenPostModal] = useState(false)
  const [isPostEditMode, setIsPostEditMode] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const [images, setImages] = useState<ImageType[]>([])
  const [postText, setPostText] = useState("")

  return (
    <Context.Provider
      value={{
        isOpenPostModal,
        openPostModal: () => setIsOpenPostModal(true),
        closePostModal: () => setIsOpenPostModal(false),
        images,
        addImages: (images: ImageType[]) => {
          setImages((prevImages) => [...prevImages, ...images])
        },
        removeImage: (imageIndex: number) => {
          setImages((prevImages) =>
            prevImages.filter((_, index) => index !== imageIndex)
          )
        },
        resetPost: () => {
          setPostText("");
          setImages([]);
        },
        setImages,
        postText,
        setPostText,
        isPostEditMode,
        setIsPostEditMode,
        selectedPostId,
        setSelectedPostId,
      }}
    >
      {children}
    </Context.Provider>
  )
}
