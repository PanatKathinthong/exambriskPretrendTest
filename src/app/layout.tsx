import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exambrisk Pretranined",
  description: "Generated by Easyrice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={"en"}>
      <body>{children}</body>
    </html>
  );
}
