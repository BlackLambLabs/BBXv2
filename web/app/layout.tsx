import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://blackbox-research.blacklamb-1638.chatgpt.site"),
  title: "BlackBoX — Research, opened up",
  description: "Explore the process behind BlackBoX. Try the research lab, run the sample code, and follow the build from prototype to tested research system.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
