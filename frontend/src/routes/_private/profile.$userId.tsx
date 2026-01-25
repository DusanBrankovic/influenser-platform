import { createFileRoute, redirect } from "@tanstack/react-router";
import ProfilePage from "@/pages/ProfilePage";
import { getLoggedInInfluencer } from "@/services/influencerService";
import { getAccessTokenData } from "@/auth/authStore";

export const Route = createFileRoute("/_private/profile/$userId")({
  beforeLoad: async ({params}) => {

    const { userId } = params;

    const loggedUserId = getAccessTokenData()?.sub;

    console.log("Fetching influencer profile for userId:", userId);

    const influencer = await getLoggedInInfluencer(loggedUserId!);

    if (!influencer) {
      throw redirect({ to: "/auth" });
    }

    if(Number(userId) != loggedUserId)
    {
      
    }

    return {
      influencer,
    };
  },

  component: ProfilePage,
});
