"use client";

import { Roboto } from "next/font/google";
import StyledComponentsRegistry from "../../lib/registry";
import GlobalContext from "./context";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <GlobalContext>
          <StyledComponentsRegistry>
            <main>{children}</main>
          </StyledComponentsRegistry>
        </GlobalContext>
      </body>
    </html>
  );
}
