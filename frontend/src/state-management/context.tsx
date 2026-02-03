import { createContext } from "react"

export type ImageType = File | string;

type ContextType = {
  isOpenPostModal: boolean
  openPostModal: () => void
  closePostModal: () => void
  postText: string
  setPostText: (text: string) => void
  images: ImageType[]
  addImages: (images: ImageType[]) => void
  removeImage: (imageIndex: number) => void
  setImages: (images: ImageType[]) => void
  resetPost: () => void
  isPostEditMode: boolean
  setIsPostEditMode: (isEditMode: boolean) => void
  selectedPostId: number | null
  setSelectedPostId: (postId: number | null) => void,
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const Context = createContext<ContextType | undefined>(
  undefined
)

