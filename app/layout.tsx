import { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
