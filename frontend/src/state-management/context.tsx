// CreatePostContext.tsx
import { createContext } from "react"

type ContextType = {
  createPost: boolean
  openCreatePost: () => void
  closeCreatePost: () => void
  postText: string
  setPostText: (text: string) => void
  images: File[]
  addImages: (images: File[]) => void
  removeImage: (imageIndex: number) => void
  resetPost: () => void
}

export const Context = createContext<ContextType | undefined>(
  undefined
)

