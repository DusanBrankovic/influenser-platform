import { useState } from "react"
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react"
import { Smile } from "lucide-react"

type Props = {
  onSelect: (emoji: string) => void
}

export const EmojiPickerButton = ({ onSelect }: Props) => {
  const [open, setOpen] = useState(false)

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onSelect(emojiData.emoji)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="text-gray-500 hover:text-primary"
      >
        <Smile size={20} />
      </button>

      {open && (
        <div className="absolute top-6 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  )
}
