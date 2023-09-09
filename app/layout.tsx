import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { viVN } from "@clerk/localizations";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CIGP Team Chat",
  description: "Cùng gặp gỡ và trò chuyện trực tuyến",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={viVN}>
      <html lang="en">
        <body className={font.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
