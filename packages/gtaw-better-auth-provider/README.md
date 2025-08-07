## GTA WORLD Oauth Provider for Better-Auth
[GTA World](https://gta.world) OAuth integration for [Better-Auth](https://www.better-auth.com/).

## Installation
Import and configure provider.

```ts
import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { gtawOAuth } from "@gtaw-oauth-providers/better-auth";
    
export const auth = betterAuth({
  plugins: [
    genericOAuth({
      config: [
        // Import gtawOAuth in your genericOAuth plugin configuration
        gtawOAuth({
          clientId: process.env.GTAW_OAUTH_CLIENT_ID,
          clientSecret: process.env.GTAW_OAUTH_CLIENT_SECRET,
          server: "fr", // if you're targeting GTA World France. If not, omit.
          // Other Generic OAuth options
        }),
      ],
    })
  ]
  // Your Better-Auth configuration
});
```

## Options

* ``server`` ``"en"`` or ``"fr"`` (default: ``"en"```.

    Define the appropriate base URL for the target server. (example, "fr" sets the base URL of the OAuth endpoint to ``https://ucp-fr.gta.world``)


* Other options from the [Generic OAuth plugin](https://www.better-auth.com/docs/plugins/generic-oauth#configuration)

## Disclaimer

> *Note: This script was not created by the GTA World team.*