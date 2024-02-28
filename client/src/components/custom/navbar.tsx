"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className="w-full h-16 flex items-center justify-between">
      <div>
        {pathname != "/" ? (
          <>
            <svg
              onClick={() => {
                router.push("/");
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="flex items-center">
        {session?.user?.name}{process.env.NEXT_PUBLIC_URL}
        {status == "authenticated" ? (
          <Button variant={"link"} onClick={() => signOut()}>
            Logout
          </Button>
        ) : (
          <Button variant={"link"} onClick={() => signIn("keycloak")}>
            Signin
          </Button>
        )}
        <svg onClick={() => router.push("howto")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 hover:text-cyan-500">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

export default NavBar;
