export type User = {
  fullname?: string;
  email: string;
  username: string;
  headline?: string;
  password?: string;
  rememberMe?: boolean;
  role: null | "user" | "guest";
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isRegistered: boolean;
  token: string | null;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;

  setUser: (user: User | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  loginAsGuest: () => void;

  setToken: (token: string | null) => void;
  getToken: (token: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsRegistered: (isRegistered: boolean) => void;
  setIsAuthenticated: (IsAuthenticated: boolean) => void;
};
