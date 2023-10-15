import React from "react";
import { Inter } from "next/font/google";

import StyledComponentsRegistry from "../lib/AntdRegistry";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Feira - Acesso a Mercados",
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body className={inter.className}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
