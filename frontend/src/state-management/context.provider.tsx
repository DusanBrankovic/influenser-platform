import { useState, type ReactNode } from "react"
import { Context } from "./context"

export function ContextProvider({ children }: { children: ReactNode }) {
  const [createPost, setCreatePost] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [postText, setPostText] = useState("")

  return (
    <Context.Provider
      value={{
        createPost,
        openCreatePost: () => setCreatePost(true),
        closeCreatePost: () => setCreatePost(false),
        images,
        addImages: (images: File[]) => {
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
        postText,
        setPostText,
      }}
    >
      {children}
    </Context.Provider>
  )
}
