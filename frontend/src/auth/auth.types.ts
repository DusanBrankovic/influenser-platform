export type User = {
  fullname?: string;
  email: string;
  username: string;
  headline?: string;
  password?: string;
  rememberMe?: boolean;
  role: "user" | "guest";
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;

  setUser: (user: User | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  loginAsGuest: () => void;

  setToken: (token: string | null) => void;
  getToken: (token: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
};
