import { AWS_CONFIG } from "@/config";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: {
      Cognito: {
        userPoolId: AWS_CONFIG.aws_user_pools_id,
        userPoolClientId: AWS_CONFIG.aws_user_pools_web_client_id,
        loginWith: {
          oauth: {
            redirectSignIn: [AWS_CONFIG.oauth.redirectSignIn],
            redirectSignOut: [AWS_CONFIG.oauth.redirectSignOut],
            domain: AWS_CONFIG.oauth.domain,
            responseType: "code",
            scopes: AWS_CONFIG.oauth.scope,
            providers: ["Google"],
          },
        },
      },
    },
  },
});
