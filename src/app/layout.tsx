"use client";

import "./globals.css";
import { Roboto } from "next/font/google";
import StyledComponentsRegistry from "../../lib/registry";
import GlobalContext from "./context";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalContext>
          <StyledComponentsRegistry>
            <main className={roboto.variable}>{children}</main>
          </StyledComponentsRegistry>
        </GlobalContext>
      </body>
    </html>
  );
}
