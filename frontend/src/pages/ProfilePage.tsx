import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { faker } from "@faker-js/faker";
import { useAuthStore } from "@/auth/authStore";
import { Separator } from "@radix-ui/react-separator";

export default function ProfilePage(): React.ReactElement {
  const generateRandomImage = () => {
    return faker.image.avatar();
  };

  const user = useAuthStore((s) => s.user);

  if (!user) console.log("No user found in auth store");

  const values = ["Authenticity", "Sustainability", "Growth"];

  const businessAreas = [
    {
      title: "Wellness & Health",
      description:
        "Content focused on nutrition, fitness, and holistic wellness practices.",
    },
    {
      title: "Sustainable Living",
      description:
        "Eco-friendly products, zero-waste lifestyle, and environmental advocacy.",
    },
    {
      title: "Personal Development",
      description:
        "Self-improvement, mindfulness, and mental health awareness.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 bg-linear-to-r from-blue-400 to-purple-500">
        <div className="absolute bottom-0 left-8 transform translate-y-1/2">
          <img
            src={generateRandomImage()}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
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
          <p className="text-lg text-gray-700 font-semibold mt-2">
            {user?.headline || "Lifestyle & Wellness Influencer"}
            <Separator orientation="horizontal" className="border mx-2" />
            {user?.email || null}
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
          <p className="text-gray-700 leading-relaxed">
            Passionate about sustainable living, mental wellness, and authentic
            connections. Sharing my journey towards a more mindful and
            purposeful life with my community.
          </p>
        </div>

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
              <Card key={area.title}>
                <CardHeader>
                  <CardTitle className="text-base">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
