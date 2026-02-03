type PostGalleryProps = {
  images: string[];
}

export default function PostGallery({ images }: PostGalleryProps) {
  if (images.length < 3) {
    return (
      <div
        className={`grid gap-px mb-4 overflow-hidden rounded-xl aspect-15/12
    ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"}
  `}
      >
        {images.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            className="w-full h-full object-cover"
            alt=""
          />
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="flex gap-px aspect-15/12 overflow-hidden rounded-xl mb-4">
        <img src={images[0]} className="w-1/2 h-full object-cover" alt="" />

        <div className="flex flex-col gap-px w-1/2 h-full">
          <img src={images[1]} className="w-full h-1/2 object-cover" alt="" />
          <img src={images[2]} className="w-full h-1/2 object-cover" alt="" />
        </div>
      </div>
    );
  }
  if (images.length > 3) {
    return (
      <div className="flex flex-col gap-px aspect-15/12 overflow-hidden rounded-xl mb-4">
        <img src={images[0]} className="w-full h-3/5 object-cover" alt="" />

        <div className="flex gap-px h-2/5">
          {images.slice(1, 4).map((imgUrl, index) => {
            const isLastVisible = index === 2;
            const hasMore = images.length > 4;
            const remaining = images.length - 4;

            return (
              <div key={index} className="relative w-1/3 h-full">
                <img
                  src={imgUrl}
                  className={`w-full h-full object-cover ${isLastVisible && hasMore ? "brightness-50" : ""}`}
                  alt=""
                />

                {isLastVisible && hasMore && (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold">
                    +{remaining}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};