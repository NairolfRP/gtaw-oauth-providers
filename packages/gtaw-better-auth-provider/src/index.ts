import type { OAuth2Tokens, ProviderOptions } from "better-auth";
import type { GenericOAuthConfig } from "better-auth/plugins/generic-oauth";

type GTAW_SERVERS = "en" | "fr";

export interface GTAWRole extends Record<string, any> {
  id: number;
  user_id: number;
  role_id: string | null;
  server: number;
}

export interface GTAWCharacter extends Record<string, any> {
  id: number;
  memberid: number;
  firstname: string;
  lastname: string;
}

export interface GTAWProfile extends Record<string, any> {
  user: {
    id: number;
    username: string;
    confirmed: 0 | 1 | boolean;
    role: GTAWRole;
    character: GTAWCharacter[];
  };
}

export interface GTAWOptions extends ProviderOptions<GTAWProfile> {
  server?: GTAW_SERVERS;
}

const GTAW_BASE_URL = {
  EN: "https://ucp.gta.world",
  FR: "https://ucp-fr.gta.world",
} as const;

async function fetchUserInfoFromGTAW(baseURL: string, tokens: OAuth2Tokens) {
  const response = await fetch(`${baseURL}/api/user`, {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
      Accept: "application/json",
      "User-Agent": "Better-Auth/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch GTAW user info: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as GTAWProfile;
  const { user } = data;

  return user;
}

export function gtawOAuth(
  options: GTAWOptions & Omit<GenericOAuthConfig, "providerId">,
): GenericOAuthConfig {
  const { server = "en", ...other } = options;
  const baseURL = server === "fr" ? GTAW_BASE_URL.FR : GTAW_BASE_URL.EN;

  return {
    providerId: "gtaw",
    authorizationUrl: `${baseURL}/oauth/authorize`,
    tokenUrl: `${baseURL}/oauth/token`,
    userInfoUrl: `${baseURL}/api/user`,
    scopes: [],
    responseType: "code",
    responseMode: "query",
    getUserInfo: async (tokens) => {
      const user = await fetchUserInfoFromGTAW(baseURL, tokens);

      const accountID = String(user.id);

      return {
        id: accountID,
        name: user.username,
        email: `fakeemail+${accountID}@gta.world`,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        original: user,
      };
    },
    mapProfileToUser: (baseProfile) => {
      const profile = baseProfile as {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updateAt: Date;
        original: GTAWProfile["user"];
      };

      const accountID = String(profile.id);

      return {
        id: accountID,
        name: profile.name,
        email: profile.email,
        emailVerified: profile.emailVerified,
        original: profile.original,
      };
    },
    ...other,
  };
}
