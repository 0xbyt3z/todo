"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

function NavBar() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
  }, [status]);

  return (
    <div className="w-full h-16 flex items-center justify-between">
      <div></div>
      <div className="flex items-center">
        {session?.user?.name}
        {status == "authenticated" ? (
          <Button variant={"link"} onClick={() => signOut()}>
            Logout
          </Button>
        ) : (
          <Button variant={"link"} onClick={() => signIn("keycloak")}>
            Signin
          </Button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
