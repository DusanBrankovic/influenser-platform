export type LoginPayload = { email: string; password: string };
export const UserRole = {
  NOT_SELECTED: "NOT_SELECTED",
  BUSINESS: "BUSINESS",
  INFLUENCER: "INFLUENCER",
  GUEST: "GUEST",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export type RegisterPayload = {
  email: string;
  password: string;
  nametag: string;
  name: string;
  role: UserRole;
};

export type AppRole = Exclude<UserRole, "NOT_SELECTED">;
