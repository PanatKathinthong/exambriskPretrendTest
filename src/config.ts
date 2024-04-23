export const AWS_CONFIG = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION as string,
  aws_user_pools_id: process.env
    .NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID as string,
  aws_user_pools_web_client_id: process.env
    .NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID as string,
  oauth: {
    domain: process.env.NEXT_PUBLIC_OAUTH_DOMAIN as string,
    scope: ["openid", "profile", "aws.cognito.signin.user.admin"],
    redirectSignIn: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN as string,
    redirectSignOut: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_OUT as string,
  },
};

export const URL_PRIVACY_POLICY = process.env.NEXT_PUBLIC_URL_PRIVACY_POLICY;
export const URL_TERMS_OF_SERVICE =
  process.env.NEXT_PUBLIC_URL_TERMS_OF_SERVICE;
export const URL_CONTACT_US = "";
export const SOCIAL_MEDIA_LINKS = {
  facebook: "",
  linkedin: "",
};

export const URL_BACKEND = process.env.NEXT_PUBLIC_API_URL_BACKEND
