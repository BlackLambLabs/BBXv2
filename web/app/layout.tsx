import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://blackbox-research.blacklamb-1638.chatgpt.site"),
  title: "BlackBoX — Research, opened up",
  description: "An independent research notebook from BlackLamb Labs. Read the free field notes, run the Python examples, and learn the mechanics behind a research system in development.",
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
