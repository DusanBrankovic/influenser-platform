// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";

// import {
//   // Star,
//   Phone,
//   Mail,
//   Globe,
//   MapPin,
//   Share2,
// } from "lucide-react";
// import { useRouteContext } from "@tanstack/react-router";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import AvatarInitials from "@/components/AvatarInitials";
// import InfluencerContent from "@/components/InfluencerContent";
// // import InfluencerContent from "@/components/InfluencerContent";

// // function Stars({ value = 4, outOf = 5 }: { value?: number; outOf?: number }) {
// //   const v = Math.max(0, Math.min(value, outOf));
// //   return (
// //     <div className="flex items-center gap-1">
// //       {Array.from({ length: outOf }).map((_, i) => (
// //         <Star
// //           key={i}
// //           className={`h-4 w-4 ${i < v ? "fill-black text-black" : "text-black/30"}`}
// //         />
// //       ))}
// //     </div>
// //   );
// // }

// export default function InfluencerPreview() {

//   const { influencer } = useRouteContext({
//     from: "/_private/preview/$userId",
//   });

//   return (
//     <div className="min-h-screen bg-[#F3F3F3]">
//       <div className="relative h-44 bg-[#9B9B9B]">
//         <div className="absolute -bottom-20 left-6 z-20 h-20 w-20 sm:h-40 sm:w-40 rounded-full bg-white/80 p-2 shadow-sm">
//           <div className="h-full w-full overflow-hidden rounded-full flex items-center justify-center">
//             {influencer.profileImage ? (
//               <img
//                 src={influencer.profileImage}
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <AvatarInitials name={influencer.name} size={145} />
//             )}
//           </div>
//         </div>
//       </div>


//       <div className="px-4 sm:px-8 pb-10 pt-20">
//         <Card className="mx-auto max-w-5xl rounded-2xl border-none">
//           <CardHeader className="py-3 ps-15">
//             <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
//               <div className="min-w-0">
//                 <CardTitle className="text-xl sm:text-2xl">{influencer.name}</CardTitle>
//                 <p className="text-sm text-black">@{influencer.userId}</p>
//               </div>

//               {/* <div className="flex flex-col items-start sm:items-end gap-2">
//                 <div className="flex items-center gap-2">
//                   <Badge className="rounded-full bg-white text-black border border-black">
//                     ocena
//                     <span className="mx-2 inline-flex items-center">
//                       <Stars value={4} outOf={5} />
//                     </span>
//                     <span className="font-semibold">4/5</span>
//                   </Badge>
//                 </div>
//               </div> */}
//             </div>
//           </CardHeader>

//           <CardContent>
//             <div className="flex flex-col gap-2">
//               <Label className="font-semibold text-black ps-5">
//                 Bio
//               </Label>
//               <Textarea
//                 value={influencer.headline ?? ""}
//                 placeholder="Headline will appear here..."
//                 disabled
//                 className="min-h-23 resize-none rounded-xl bg-white/60 border border-black disabled:cursor-default disabled:opacity-100 p-5"
//               />
//             </div>

//             <div className="flex flex-col gap-2 mt-6">
//               <Label className="font-semibold text-black ps-5">
//                 Years of experience
//               </Label>
//               <div className="flex flex-col gap-3 rounded-xl border border-black p-3">

//                 <Input className="p-0 ps-2"
//                   value={influencer.experience ?? ""}
//                   placeholder="Experience will appear here..."
//                   disabled
//                 />

//               </div>
//             </div>

//             <div className="flex flex-col gap-2 mt-6">
//               <Label className="font-semibold text-black ps-5">
//                 Categories
//               </Label>
//               <div className="flex flex-col gap-3 rounded-xl border border-black p-3">
//                 <Label className="font-semibold text-black ps-2">
//                   Industries
//                 </Label>
//                 <div className="flex flex-wrap gap-2 ps-1">
//                   {influencer.industries.map((t) => (
//                     <Badge
//                       key={t}
//                       variant="secondary"
//                       className="rounded-sm bg-[#8C8C8C] text-white"
//                     >
//                       {t}
//                     </Badge>
//                   ))}
//                 </div>

//                 <Label className="font-semibold text-black ps-2">
//                   Values
//                 </Label>
//                 <div className="flex flex-wrap gap-2 ps-1">
//                   {influencer.values.map((t) => (
//                     <Badge
//                       key={t}
//                       variant="secondary"
//                       className="rounded-sm bg-black/20 text-black"
//                     >
//                       {t}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col gap-2 mt-6">
//               <Label className="font-semibold text-black ps-5">
//                 Contact
//               </Label>
//               <div className="flex flex-col gap-3 rounded-xl border border-black p-5 mb-5">
//                 <div className="grid gap-4 md:grid-cols-2">
//                       <div className="space-y-3 text-sm">
//                         <div className="flex items-center gap-2">
//                           <Phone className="h-4 w-4 text-black/70" />
//                           <span>064 123 123</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Mail className="h-4 w-4 text-black/70" />
//                           <span>imeprezime123@gmail.com</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Globe className="h-4 w-4 text-black/70" />
//                           <span>www.influenser123.com</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <MapPin className="h-4 w-4 text-black/70" />
//                           <span>Beograd</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Share2 className="h-4 w-4 text-black/70" />
//                           <span>Društvene mreže</span>
//                         </div>
//                         <div className="flex items-center gap-2 ps-6">
//                           <span>Društvene mreže</span>
//                         </div>
//                         <div className="flex items-center gap-2 ps-6">
//                           <span>Društvene mreže</span>
//                         </div>
//                       </div>
//                 </div>

//               </div>
//             </div>
            
//               <CardContent className="rounded-xl border border-black bg-white p-0">
//                 <InfluencerContent influencer={influencer} isEditable={false} />
//               </CardContent>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }