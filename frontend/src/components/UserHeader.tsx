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
      <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
        {profileUrl ? (
          <img
            src={profileUrl}
            className="h-full w-full object-cover"
            alt={`${name} avatar`}
          />
        ) : (
          <AvatarInitials name={name} size={50} circle />
        )}
      </div>

      <div className="flex flex-col items-start">
        {displayName && <h2 className="text-lg font-bold">{name}</h2>}
        {textBelowName && (
          <p className="text-sm text-gray-500">{textBelowName}</p>
        )}
      </div>
    </div>
  );
}