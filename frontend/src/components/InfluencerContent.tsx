import { useState } from "react";
import InfluencerProfileFeed from "./influencer-feed/InfluencerProfileFeed";
import type { Influencer } from "@/types/influencer.types";
import SavedPostsFeed from "./infuencer-saved-posts/SavedPostsFeed";
import { getUserIdFromToken } from "@/auth/authStore";

type NavContent = {
  name: string;
  selected: boolean;
  display: boolean;
};

type InfluencerContentProps = {
  influencer: Influencer;
  isEditable?: boolean;
};

export default function InfluencerContent({ influencer, isEditable }: InfluencerContentProps) {
  const userId = getUserIdFromToken();
  const [navContent, setNavContent] = useState<NavContent[]>([
    { name: "Posts", selected: true, display: true },
    { name: "Campaigns", selected: false , display: true },
    { name: "Saved Items", selected: false, display:  influencer.userId === userId },
    { name: "Reviews", selected: false, display: true },
  ]);

  const filteredNavContent = navContent.filter(item => item.display);

  if (filteredNavContent.length !== navContent.length) {
    setNavContent(filteredNavContent);
  }

  const isSelectedItem = (name: string) =>
    navContent.find((item) => item.name === name)?.selected;

  return (
    <div>
      <div className="flex justify-between items-center rounded-xl">
        <ContentNavBar navContent={filteredNavContent} setNavContent={setNavContent} />
      </div>

      {isSelectedItem("Posts") && (
        <InfluencerProfileFeed
          influencer={influencer}
          isEditable={isEditable}
        />
      )}

      {isSelectedItem("Campaigns") && (<InfluencerProfileFeed
          influencer={influencer}
          isEditable={isEditable}
        />
      )}
      {isSelectedItem("Saved Items") && (<SavedPostsFeed/>
      )}
      {isSelectedItem("Reviews") && (<InfluencerProfileFeed
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
