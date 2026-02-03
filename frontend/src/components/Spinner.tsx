import { useCustomContext } from "@/state-management/useContextHook";

export default function Spinner() {
  const { isLoading } = useCustomContext();
  if (isLoading)
    return (
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center w-full h-full z-70 pb-[20%]">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin z-50" />
      </div>
    );
  return null;
}
