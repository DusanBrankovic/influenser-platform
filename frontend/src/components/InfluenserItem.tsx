import MockImage from "@/assets/img/MockImage";
import type { InfluenserProps } from "./influenser.types";

const InfluenserItem: React.FC<InfluenserProps> = ({ influenser }) => {
  const { id, name, headline } = influenser;

  return (
    <div
      key={id}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <MockImage imageStyle="w-full h-64 object-cover" />

      <div style={{ padding: "15px" }}>
        <h3 style={{ margin: "0 0 5px 0" }}>{name}</h3>
        <p style={{ margin: 0, color: "#666" }}>{headline}</p>
      </div>
    </div>
  );
};

export default InfluenserItem;
