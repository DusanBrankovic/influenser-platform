import AvatarInitials from "./AvatarInitials";

export default function UserHeader({
  name,
  profileUrl,
  textBelowName,
  displayName = true,
}: {
  name: string;
  profileUrl: string | null;
  textBelowName?: string;
  displayName?: boolean;
}) {
  return (
    <div className="flex items-center justify-start gap-3">
      {profileUrl ? (
      <img
        src={profileUrl}
        className="h-full w-full object-cover"
      />
      ) : (
        <AvatarInitials name={name} size={50} circle />
      )}
      <div className="flex flex-col items-start">
        {displayName && <h2 className="font-bold text-lg">{name}</h2>}
        {textBelowName && (<p className="text-gray-500 text-sm">{textBelowName}</p>)}
      </div>
    </div>
  );
};