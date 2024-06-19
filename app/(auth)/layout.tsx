import { Metadata } from "next";
import { ReactNode } from "react";

import "../globals.css";
import { logout } from "@/actions/auth-actions";

export const metadata: Metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function AuthRootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header id="auth-header">
        <p>Welcome back!</p>
        <form action={logout}>
          <button>Logout</button>
        </form>
      </header>

      {children}
    </>
  );
}
