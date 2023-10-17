import React from "react";
import { Inter } from "next/font/google";

import StyledComponentsRegistry from "../lib/AntdRegistry";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import FormContextProvider from "@/utils/validations/FormContext";

export const metadata = {
  title: "Feira - Acesso a Mercados",
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="pt-BR">
    <body className={inter.className}>

      <StyledComponentsRegistry>
        <FormContextProvider>
          {children}
        </FormContextProvider>
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
