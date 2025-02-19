import type { Metadata } from "next";
import "./globals.css";
import { JokeProvider } from "@/contexts/JokeContext";
import { SessionProvider } from "@/contexts/SessionContext";

export const metadata: Metadata = {
  title: "Best Jokes App",
  description: "Best Jokes Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <JokeProvider>{children}</JokeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
