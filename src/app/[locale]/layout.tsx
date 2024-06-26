import type { Metadata } from "next";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import CustomGlobalStyle from "@/theme/CustomGlobalStyle";
import { AWS_CONFIG } from "@/config";

import { Amplify } from "aws-amplify";
import ConfigureAmplifyClientSide from "./ConfigureAmplifyClientSide";
import { NextIntlClientProvider, useMessages } from "next-intl";
import Providers from "../providers";

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

export const metadata: Metadata = {
  title: "Exambrisk Pretranined",
  description: "Generated by Easyrice",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <ConfigureAmplifyClientSide />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CustomGlobalStyle />
            <Providers>
              <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
              </NextIntlClientProvider>
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
