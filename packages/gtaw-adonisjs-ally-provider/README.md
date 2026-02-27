## GTA WORLD Oauth Provider for AdonisJS Ally
[GTA World](https://gta.world) OAuth integration for [AdonisJS Ally](https://docs.adonisjs.com/guides/authentication/social-authentication).

## Installation
Import and configure provider in your ``config/ally.ts``.

```ts
import { GTAWDriver } from "@gtaw-oauth-providers/adonisjs-ally";

const allyConfig = defineConfig({
  gtaw: GTAWDriver({
    clientId: env.get("GTAW_OAUTH_CLIENT_ID"),
    clientSecret: env.get("GTAW_OAUTH_CLIENT_SECRET"),
    callbackUrl: `${env.get("APP_URL")}/api/auth/gtaw/callback`,
    server: "fr", // if you're targeting GTA World France. If not, omit.
  }),
});
```

## Options

* ``server`` ``"en"`` or ``"fr"`` (default: ``"en"```.
  
  Define the appropriate base URL for the target server. (example, "fr" sets the base URL of the OAuth endpoint to ``https://ucp-fr.gta.world``)

## Disclaimer

> *Note: This script was not created by the GTA World team.*

