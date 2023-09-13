import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { viVN } from "@clerk/localizations";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { ModalProvider } from "@/components/provider/modal-provider";
import { SocketProvider } from "@/components/provider/socket-provider";

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
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
          <SocketProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storageKey="discord-theme"
            >
              <ModalProvider />
              {children}
            </ThemeProvider>
          </SocketProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
