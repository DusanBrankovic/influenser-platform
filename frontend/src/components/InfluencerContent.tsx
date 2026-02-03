import { useState } from "react";
import InfluencerProfileFeed from "./influencer-feed/InfluencerProfileFeed";
import type { Influencer } from "@/types/influencer.types";

type NavContent = {
  name: string;
  selected: boolean;
};

type InfluencerContentProps = {
  influencer: Influencer;
  isEditable?: boolean;
};

export default function InfluencerContent({ influencer, isEditable }: InfluencerContentProps) {
  const [navContent, setNavContent] = useState<NavContent[]>([
    { name: "Objave", selected: true },
    { name: "Kampanje", selected: false },
    { name: "Sačuvane stavke", selected: false },
    { name: "Pregled ocena i komentara", selected: false },
  ]);

  const isSelectedItem = (name: string) =>
    navContent.find((item) => item.name === name)?.selected;

  return (
    <div>
      <div className="flex justify-between items-center rounded-xl">
        <ContentNavBar navContent={navContent} setNavContent={setNavContent} />
      </div>

      {isSelectedItem("Objave") && (
        <InfluencerProfileFeed
          userId={influencer.userId}
          influencer={influencer}
          isEditable={isEditable}
        />
      )}

      {isSelectedItem("Kampanje") && (<InfluencerProfileFeed
          userId={influencer.userId}
          influencer={influencer}
          isEditable={isEditable}
        />
      )}
      {isSelectedItem("Sačuvane stavke") && (<InfluencerProfileFeed
          userId={influencer.userId}
          influencer={influencer}
          isEditable={isEditable}
        />
      )}
      {isSelectedItem("Pregled ocena i komentara") && (<InfluencerProfileFeed
          userId={influencer.userId}
          influencer={influencer}
          isEditable={isEditable}
        />
      )}
    </div>
  );
}

function ContentNavBar({
  navContent,
  setNavContent,
}: {
  navContent: NavContent[];
  setNavContent: React.Dispatch<React.SetStateAction<NavContent[]>>;
}) {
  const calculateBorderClasses = (idx: number, length: number, selected: boolean) => {
    const isFirst = idx === 0;
    const isLast = idx === length - 1;
    const isMiddle = idx > 0 && idx < length - 1;

    return [
      isFirst && "rounded-tl-xl hover:border-r",
      isLast && "rounded-tr-xl hover:border-l",
      isMiddle && "hover:border-x",
      selected && "bg-white",
      selected && isFirst && "border-r border-primary",
      selected && isLast && "border-l border-primary",
      selected && isMiddle && "border-x border-primary",
    ]
      .filter(Boolean)
      .join(" ");
  };

  const onSelect = (name: string) => {
    setNavContent((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.name === name,
      }))
    );
  };

  return navContent.map((item, idx) => (
    <div
      key={idx}
      className={`bg-background w-full py-4 text-center cursor-pointer border-b border-primary hover:bg-white
        ${calculateBorderClasses(idx, navContent.length, item.selected)}`}
      onClick={() => onSelect(item.name)}
    >
      {item.name}
    </div>
  ));
}
