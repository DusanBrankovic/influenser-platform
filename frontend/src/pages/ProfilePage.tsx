import React from "react";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/auth/authStore";
import { Separator } from "@radix-ui/react-separator";
import MockImage from "@/assets/img/MockImage";
import InfluenserBio from "@/components/InfluenserBio";
import BusinessAreaItem from "@/components/BusinessAreaItem";
import { businessAreas } from "@/utils/businessAreas";
import { values } from "@/utils/values";

export default function ProfilePage(): React.ReactElement {
  const user = useAuthStore((s) => s.user);

  if (!user) console.log("No user found in auth store");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 bg-linear-to-r from-blue-400 to-purple-500">
        <div className="absolute bottom-0 left-8 transform translate-y-1/2">
          <MockImage imageStyle="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {user?.fullname || "Jane Doe"}
          </h1>
          <p className="text-xl text-gray-600">
            @{user?.username || "janedoe"}
          </p>
          <div>
            <span className="text-lg text-gray-700 font-semibold mt-2">
              {user?.headline || "Lifestyle & Wellness Influencer"}
            </span>
            <Separator orientation="horizontal" className="border mx-2" />
            {user?.email || null}
          </div>
        </div>

        <InfluenserBio />

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Personal Values
          </h2>
          <div className="flex flex-wrap gap-3">
            {values.map((value) => (
              <Badge key={value} variant="secondary">
                {value}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Business Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {businessAreas.map((area) => (
              <BusinessAreaItem key={area.title} area={area} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
