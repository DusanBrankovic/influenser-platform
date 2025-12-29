import InfluenserItem from "@/components/InfluenserItem";

interface InfluencerListProps {
  mode: "guest" | "authed";
}

const InfluenserList = ({ mode }: InfluencerListProps) => {
  const influencers = [
    {
      id: 1,
      name: "Alex Johnson",
      headline: "Tech Influencer",
    },
    {
      id: 2,
      name: "Sarah Williams",
      headline: "Fashion & Lifestyle",
    },
    {
      id: 3,
      name: "Mike Chen",
      headline: "Travel & Adventure",
    },
    {
      id: 4,
      name: "Emma Davis",
      headline: "Fitness Coach",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Influencers {mode === "authed" && "(Authenticated)"}</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {influencers.map((influencer) => (
          <InfluenserItem key={influencer.id} influenser={influencer} />
        ))}
      </div>
    </div>
  );
};

export default InfluenserList;
