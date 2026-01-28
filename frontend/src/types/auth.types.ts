export type LoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterPayload = {
  email: string;
  name: string;
  password: string;
  role: "INFLUENCER" | "BUSINESS";
};
