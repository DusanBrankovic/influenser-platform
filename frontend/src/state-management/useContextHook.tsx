import { useContext } from "react"
import { Context } from "./context"

export function useCustomContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "useCustomContext must be used within ContextProvider"
    )
  }

  return context
}
