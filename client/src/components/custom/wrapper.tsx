"use client";

import { ReactNode, useEffect } from "react";
import NavBar from "./navbar";
import { SessionProvider, signIn, useSession } from "next-auth/react";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <CheckForSessionErrors />
        <div className="w-screen h-screen flex justify-center overflow-hidden">
          <div className="w-1/4 h-full -ml-56">
            <NavBar />
            {children}
          </div>
        </div>
      </SessionProvider>
    </>
  );
};

function CheckForSessionErrors() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);
  return <></>;
}
