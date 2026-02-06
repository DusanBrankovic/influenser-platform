import { Star } from 'lucide-react'
import { useState } from 'react'

type StarRatingProps = {
  value: number
  onChange: (value: number) => void
  text?: string
  max?: number
  size?: number
  disabled?: boolean
}

export default function StarRating({
  value,
  onChange,
  text = '',
  max = 5,
  size = 20,
  disabled = false,
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null)

  const activeValue = hover ?? value

  return (
    <div
      className="p-3 rounded-4xl border border-primary w-fit"
      role="radiogroup"
      aria-label="Rating"
      style={{ display: 'inline-flex', gap: 2 }}
    >
      {text && <p className='me-2'>{text}</p>}
      {Array.from({ length: max }, (_, i) => {
        const ratingValue = i + 1
        const filled = ratingValue <= activeValue

        return (
          <button
            key={ratingValue}
            type="button"
            role="radio"
            aria-checked={ratingValue === value}
            disabled={disabled}
            onClick={() => onChange(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            style={{
              cursor: disabled ? 'default' : 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              lineHeight: 0,
            }}
          >
            <Star fill={filled ? 'black' : 'white'} size={size} />
          </button>
        )
      })}
      <p className="ms-2">{value}/5</p>
    </div>
  )
}
