import { createFileRoute, redirect } from "@tanstack/react-router";
import ProfilePage from "@/pages/ProfilePage";
import { getLoggedInInfluencer } from "@/services/influencerService";
import { getAccessTokenData } from "@/auth/authStore";

export const Route = createFileRoute("/_private/profile")({
  beforeLoad: async () => {

    const userId = getAccessTokenData()?.sub;

    console.log("Fetching influencer profile for userId:", userId);

    const influencer = await getLoggedInInfluencer(userId!);

    if (!influencer) {
      throw redirect({ to: "/auth" });
    }

    return {
      influencer,
    };
  },

  component: ProfilePage,
});