import * as React from "react";
import InfluencerCard from "@/components/InfluencerCard";
import SearchComponent from "@/components/SearchComponent";
import type { Influencer } from "@/types/influencer.types";

export default function InfluenserList({ influencers }: { influencers: Influencer[] }) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return influencers;

    return influencers.filter((inf) => {
      const name = (inf.name ?? "").toLowerCase();
      const headline = (inf.headline ?? "").toLowerCase();
      return name.includes(q) || headline.includes(q);
    });
  }, [influencers, query]);

  return (
    <div className="w-full px-6 sm:px-10">
  <div className="mx-auto w-full max-w-6xl space-y-8">
    {/* Title */}
    <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
      Pronađite influensere
      <span className="block">za saradnju</span>
    </h1>

    {/* Search (narrower than the grid, centered in the same column) */}
    <div className="w-full max-w-4xl">
      <SearchComponent value={query} onChange={setQuery} />
    </div>

    {/* Cards grid */}
    <div
        className="
            grid
            grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
            gap-4
            justify-items-start
            place-content-start
            w-full
        "
        >
        {filtered.map((influencer) => (
            <InfluencerCard key={influencer.userId} influencer={influencer} />
        ))}
        </div>
  </div>
</div>

  );
}
