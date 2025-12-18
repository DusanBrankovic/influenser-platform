import { faker } from "@faker-js/faker";

interface InfluencerListProps {
  mode: "guest" | "authed";
}

const InfluenserList = ({ mode }: InfluencerListProps) => {
  const generateRandomImage = () => {
    return faker.image.avatar();
  };

  const influencers = [
    {
      id: 1,
      name: "Alex Johnson",
      headline: "Tech Influencer",
      image: generateRandomImage(),
    },
    {
      id: 2,
      name: "Sarah Williams",
      headline: "Fashion & Lifestyle",
      image: generateRandomImage(),
    },
    {
      id: 3,
      name: "Mike Chen",
      headline: "Travel & Adventure",
      image: generateRandomImage(),
    },
    {
      id: 4,
      name: "Emma Davis",
      headline: "Fitness Coach",
      image: generateRandomImage(),
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
          <div
            key={influencer.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={influencer.image}
              alt={influencer.name}
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 5px 0" }}>{influencer.name}</h3>
              <p style={{ margin: 0, color: "#666" }}>{influencer.headline}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfluenserList;
