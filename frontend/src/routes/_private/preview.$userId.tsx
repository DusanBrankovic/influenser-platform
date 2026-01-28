// import InfluencerPreview from "@/pages/InfluencerPreview";
// import { getLoggedInInfluencer } from "@/services/influencerService";
// import { createFileRoute, redirect } from "@tanstack/react-router";

// export const Route = createFileRoute("/_private/preview/$userId")({
//   beforeLoad: async ({ params }) => {
//     const { userId } = params;

//     console.log("Fetching influencer profile for userId:", userId);

//     const influencer = await getLoggedInInfluencer(Number(userId));

//     if (!influencer) {
//       throw redirect({ to: "/auth" });
//     }

//     return {
//       influencer,
//     };
//   },

//   component: InfluencerPreview,
// });