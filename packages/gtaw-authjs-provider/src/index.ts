/**
 * GTA World integration in AuthJS
 * @module providers/gtaw
 */
import type { OAuthConfig, OAuthUserConfig } from "@auth/core/providers";

export type GTAWorldProfile = {
  user: {
    id: number;
    username: string;
    confirmed: number;
    role: {
      id: number;
      user_id: number;
      role_id: string;
      server: number;
    };
    character: Array<{
      id: number;
      memberid: number;
      firstname: string;
      lastname: string;
    }>;
  };
};

export type GTAW_SERVER = { server?: "en" | "fr" };

function getGTAWBaseURL({ server = "en" }: GTAW_SERVER): string {
  switch (server) {
    case "en":
      return "https://ucp.gta.world";
    case "fr":
      return "https://ucp-fr.gta.world";
  }
}

export function GTAWorldProvider<P extends GTAWorldProfile>({
  server = "en",
  ...options
}: OAuthUserConfig<P> & GTAW_SERVER): OAuthConfig<P> {
  const baseURL = getGTAWBaseURL({ server });
  return {
    id: "gtaw",
    name: `GTAW${server === "fr" && ":FR"}`,
    type: "oauth",
    authorization: {
      url: `${baseURL}/oauth/authorize`,
      params: {
        scope: "",
        response_type: "code",
      },
    },
    token: { url: `${baseURL}/oauth/token` },
    userinfo: `${baseURL}/api/user`,
    client: {
      token_endpoint_auth_method: "client_secret_post",
    },
    async profile(profile) {
      return {
        id: `${profile.user.id}`,
        name: profile.user.username,
        email: null,
        image: null,
        currentCharacter: 0,
        gtaw: {
          confirmed: profile.user.confirmed,
          role: profile.user.role,
          characters: profile.user.character,
        },
      };
    },
    style: {
      logo:
        server === "fr"
          ? "https://forum-fr.gta.world/uploads/monthly_2024_12/gtawfr.png.b027ade06b559d79733f2e9a31a4328b.png"
          : "https://gta.world/newsite/assets/images/gtaw/logo.png",
      brandColor: "#FFF",
    },
    options,
  };
}
