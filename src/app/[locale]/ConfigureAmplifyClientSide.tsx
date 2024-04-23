"use client";

import { AWS_CONFIG } from "@/config";
import { Amplify } from "aws-amplify";
import "aws-amplify/auth/enable-oauth-listener";
import { Hub } from "aws-amplify/utils";
import { useEffect } from "react";
import { useRouter } from "@/navigation";

Amplify.configure(
  {
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
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  const { replace } = useRouter();
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "customOAuthState":
          replace(payload.data);
          break;
      }
    });

    return unsubscribe;
  }, []);
  return null;
}
