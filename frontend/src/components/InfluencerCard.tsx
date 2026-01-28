// import { Card, CardContent } from "@/components/ui/card"
// import type { Influencer } from "@/types/influencer.types";
// import { useNavigate } from "@tanstack/react-router";
// import AvatarInitials from "./AvatarInitials";
// import { Badge } from "./ui/badge";

// type ProfileCardProps = {
//   influencer: Influencer;
// };

// export default function InfluencerCard({ influencer }: ProfileCardProps) {

//   const navigate  = useNavigate();

//   return (
//     <Card 
//       onClick={() =>
//           navigate({
//             to: "/preview/$userId",
//             params: { userId: influencer.userId+'' },
//           })
//         }
//       className="w-full max-w-[270px] max-h-[600px] overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow">
//       <CardContent className="p-4">
//         <div className="w-full overflow-hidden rounded-2xl flex items-center justify-center">
//           {influencer.profileImage ? (
//             <img
//               src={influencer.profileImage}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//               <AvatarInitials name={influencer.name} size={240} />
//           )}
//         </div>


//         <div className="mt-3 flex flex-col items-start gap-3">
//           <div className="min-w-0">
//             <h3 className="truncate text-m sm:text-m leading-tight">
//               <strong>{influencer.name}</strong>
//             </h3>

//             <p className="text-sm text-muted-foreground">
//               {influencer.experience} years
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {influencer.industries.slice(0, 3).map((t) => (
//               <Badge
//                 key={t}
//                 variant="secondary"
//                 className="rounded-md bg-[#8C8C8C] text-white"
//               >
//                 {t}
//               </Badge>
//             ))}
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {influencer.values.slice(0, 3).map((t) => (
//               <Badge
//                 key={t}
//                 variant="secondary"
//                 className="rounded-md bg-black/20 text-black"
//               >
//                 {t}
//               </Badge>
//             ))}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }