// components/ProfilePageSkeleton.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePageSkeleton() {
  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Cover */}
      <div className="relative h-44 bg-[#9B9B9B]">
        <div className="absolute right-4 top-4 h-10 w-10 rounded-lg bg-white/30" />

        {/* Avatar */}
        <div className="absolute -bottom-20 left-6 z-20 h-20 w-20 sm:h-40 sm:w-40 rounded-full bg-white/80 p-2 shadow-sm">
          <div className="h-full w-full overflow-hidden rounded-full flex items-center justify-center">
            <Skeleton className="h-full w-full rounded-full" />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 pb-10 pt-20">
        <Card className="mx-auto max-w-5xl rounded-2xl border-none">
          <CardHeader className="py-3 ps-15">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-2">
                <Skeleton className="h-7 w-64" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Bio */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 ml-5" />
              <Skeleton className="h-28 w-full rounded-xl" />
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-40 ml-5" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 ml-5" />
              <div className="rounded-xl border border-black p-3 space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-20 rounded-sm" />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-16 rounded-sm" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 ml-5" />
              <div className="rounded-xl border border-black p-5 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-52" />
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="rounded-xl border border-black bg-white p-4 space-y-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
