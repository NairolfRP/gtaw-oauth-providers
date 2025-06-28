## GTA WORLD Oauth Provider for Authjs
[GTA World](https://gta.world) OAuth integration for [AuthJS](https://authjs.dev/).

## Installation
Import and configure provider.

```ts
import NextAuth from "next-auth";
import { GTAWorldProvider } from "@gtaw-oauth-providers/authjs";
    
export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
   providers: [
        GTAWorldProvider({
        clientId: process.env.GTAW_OAUTH_CLIENT_ID,
        clientSecret: process.env.GTAW_OAUTH_CLIENT_SECRET,
        server: "fr", // if you're targeting GTA World France. If not, omit.
    }),
   ],
});
```

## Options

* ``server`` ``"en"`` or ``"fr"`` (default: ``"en"```.
  
  Define the appropriate base URL for the target server. (example, "fr" sets the base URL of the OAuth endpoint to ``https://ucp-fr.gta.world``)

