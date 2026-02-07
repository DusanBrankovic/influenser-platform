import * as React from "react";
import InfluencerProfileFeed from "./influencer-feed/InfluencerProfileFeed";
import type { Influencer } from "@/types/influencer.types";
import SavedPostsFeed from "./infuencer-saved-posts/SavedPostsFeed";
import { getUserIdFromToken } from "@/auth/authStore";
import { ReviewFeed } from "./influencer-reviewa/ReviewFeed";

type NavContent = {
  name: string;
  display: boolean;
};

type InfluencerContentProps = {
  influencer: Influencer;
  isEditable?: boolean;
};

export default function InfluencerContent({
  influencer,
  isEditable,
}: InfluencerContentProps) {
  const userId = getUserIdFromToken();

  const [selectedTab, setSelectedTab] = React.useState<string>("Posts");

  const navContent: NavContent[] = React.useMemo(() => {
    return [
      { name: "Posts", display: true },
      { name: "Campaigns", display: false },
      { name: "Saved Items", display: Boolean(isEditable)},
      { name: "Reviews", display: true },
    ];
  }, [influencer.userId, userId, isEditable]);

  const filteredNavContent = React.useMemo(
    () => navContent.filter((i) => i.display),
    [navContent],
  );

  React.useEffect(() => {
    const stillVisible = filteredNavContent.some((i) => i.name === selectedTab);
    if (!stillVisible) setSelectedTab("Posts");
  }, [filteredNavContent, selectedTab]);

  const isSelectedItem = (name: string) => selectedTab === name;

  return (
    <div>
      <div className="flex justify-between items-center rounded-xl">
        <ContentNavBar
          navContent={filteredNavContent}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>

      {isSelectedItem("Posts") && (
        <InfluencerProfileFeed influencer={influencer} isEditable={isEditable} />
      )}

      {isSelectedItem("Campaigns") && (
        <InfluencerProfileFeed influencer={influencer} isEditable={isEditable} />
      )}

      {isSelectedItem("Saved Items") && <SavedPostsFeed />}

      {isSelectedItem("Reviews") && <ReviewFeed influencer={influencer} />}
    </div>
  );
}

function ContentNavBar({
  navContent,
  selectedTab,
  setSelectedTab,
}: {
  navContent: { name: string; display: boolean }[];
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
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

  return navContent.map((item, idx) => {
    const selected = item.name === selectedTab;

    return (
      <div
        key={item.name}
        className={`bg-background w-full py-4 text-center cursor-pointer border-b border-primary hover:bg-white
          ${calculateBorderClasses(idx, navContent.length, selected)}`}
        onClick={() => setSelectedTab(item.name)}
      >
        {item.name}
      </div>
    );
  });
}