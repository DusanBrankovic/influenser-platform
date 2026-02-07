import * as React from "react";
import InfluencerCard from "@/components/InfluencerCard";
import SearchComponent from "@/components/SearchComponent";
import type { Influencer } from "@/types/influencer.types";

type SearchParams = {
  name: string;
  value?: string[];
  industry?: string[];
};

export default function GuestInfluencerList({
  influencers: initialInfluencers,
  valueEnumValues,
  industryEnumValues,
}: {
  influencers: Influencer[];
  valueEnumValues: string[];
  industryEnumValues: string[];
}) {
  const [influencers, setInfluencers] =
    React.useState<Influencer[]>(initialInfluencers);

  return (
    <div className="w-full bg-muted/40">
      <div className="mx-auto max-w-5xl px-6 sm:px-10 py-16 space-y-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
          Find influencers
          <span className="block">to collaborate with</span>
        </h1>

        <div className="w-full">
          <div className="w-full rounded-2xl bg-muted">
            <SearchComponent
              valueEnumValues={valueEnumValues}
              industryEnumValues={industryEnumValues}
              onSearch={(params: SearchParams) => {
                const q = params.name?.trim().toLowerCase() ?? "";
                const selectedValues = params.value ?? [];
                const selectedIndustries = params.industry ?? [];

                const filtered = initialInfluencers.filter((inf) => {
                  const matchesName =
                    !q || inf.name.toLowerCase().includes(q);

                  const matchesValues =
                    selectedValues.length === 0 ||
                    selectedValues.some((v) => inf.values.includes(v));

                  const matchesIndustries =
                    selectedIndustries.length === 0 ||
                    selectedIndustries.some((i) => inf.industries.includes(i));

                  return matchesName && matchesIndustries && matchesValues;
                });

                setInfluencers(filtered);
              }}
            />
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
            gap-4
            justify-items-center
            place-content-start
            w-full
          "
        >
          {influencers.map((influencer) => (
            <InfluencerCard
              key={influencer.userId}
              influencer={influencer}
              isGuest={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}