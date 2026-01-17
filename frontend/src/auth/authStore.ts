import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { z } from "zod";
import { jwtDecode } from 'jwt-decode';
import { CookieService } from '../services/cookieService';
import { useStoreWithEqualityFn } from "zustand/traditional";

const ACCESS_TOKEN_KEY = 'accessToken';

const TokenDataSchema = z.object({
	email: z.string(),
	role: z.string(),
  sub: z.number(),
})

type TokenData = z.infer<typeof TokenDataSchema>;

type AuthStore = {
  accessToken: string | undefined;
  accessTokenData: TokenData | undefined;
  isRegistered: boolean;

  actions: {
		setAccessToken: (accessToken: string | undefined) => void;
		setIsRegistered: () => void;
    setIsUnregistered: () => void;
		init: () => void;
		clearTokens: () => void;
	}
};

export const decodeAccessToken = (accessToken: string) => TokenDataSchema.parse(jwtDecode<TokenData>(accessToken));

export const authStore = createStore<AuthStore>()(
  devtools(
      (set, get) => ({
        accessToken: undefined,
        accessTokenData: undefined,
        isRegistered: false,

        actions: {
          setAccessToken: (accessToken: string | undefined) => {
            
            if (accessToken) {
              CookieService.set(ACCESS_TOKEN_KEY, accessToken);
            }

            const accessTokenData = (() => {
              try {
                return accessToken ? decodeAccessToken(accessToken) : undefined;
              } catch (error) {
                console.error(error)
                return undefined;
              }
            })();

            set({ accessToken, accessTokenData });
          },

          setIsRegistered: () => {
            set({ isRegistered : true });
          },

          setIsUnregistered: () => {
            set({ isRegistered : false });
          },

          init: () => {
            const {setAccessToken} = get().actions;
            setAccessToken(CookieService.get(ACCESS_TOKEN_KEY));
          },

          clearTokens: () => {
            CookieService.remove(ACCESS_TOKEN_KEY);

            console.log("Clearing tokens from auth store");
            set({
              accessToken: undefined,
              accessTokenData: undefined,
            });
          }
        }
    }),
    {
      name: 'auth-store',
      enabled: !import.meta.env.PROD
    }
  )
);

export type ExtractState<S> = S extends {
		getState: () => infer T;
	}
	? T
	: never;

// Selectors
const accessTokenSelector = (state: ExtractState<typeof authStore>) => state.accessToken;
const accessTokenDataSelector = (state: ExtractState<typeof authStore>) => state.accessTokenData;
const actionsSelector = (state: ExtractState<typeof authStore>) => state.actions;
const isRegisteredSelector = (state: ExtractState<typeof authStore>) => state.isRegistered;

// getters
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getAccessTokenData = () => accessTokenDataSelector(authStore.getState());
export const getActions = () => actionsSelector(authStore.getState());
export const getIsRegistered = () => isRegisteredSelector(authStore.getState());

export function useAuthStore<U>(
  selector: (s: ExtractState<typeof authStore>) => U,
  equalityFn?: (a: U, b: U) => boolean
) {
  return useStoreWithEqualityFn(authStore, selector, equalityFn);
}

// Hooks
export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useAccessTokenData = () => useAuthStore(accessTokenDataSelector);
export const useActions = () => useAuthStore(actionsSelector);
export const useIsRegistered = () => useAuthStore(isRegisteredSelector);