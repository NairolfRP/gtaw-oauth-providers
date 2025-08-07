import { ProviderOptions } from "better-auth";
import { GenericOAuthConfig } from "better-auth/plugins/generic-oauth";

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
    confirmed: boolean;
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
    mapProfileToUser: (baseProfile) => {
      const { user } = baseProfile as GTAWProfile;
      return {
        id: user.id.toString(),
        name: user.username,
        email: `fakeemail+${user.id}@gta.world`,
        emailVerified: false,
        original: baseProfile,
      };
    },
    ...other,
  };
}
