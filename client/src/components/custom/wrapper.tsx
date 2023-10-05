"use client";

import { ReactNode } from "react";
import NavBar from "./navbar";
import { SessionProvider } from "next-auth/react";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SessionProvider>
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
