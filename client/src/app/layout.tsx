import NavBar from "src/components/custom/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { ApolloWrapper } from "src/lib/apollo-wrapper";
import { Toaster } from "react-hot-toast";
import { Wrapper } from "@/components/custom/wrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title></title>
        <link rel="shortcut icon" href="/logo-32.png" type="image/png" />
      </head>
      <body>
        <Wrapper>
          <ApolloWrapper>{children}</ApolloWrapper>
        </Wrapper>
        <Toaster toastOptions={{ position: "bottom-right", duration: 5000 }} />
      </body>
    </html>
  );
}
