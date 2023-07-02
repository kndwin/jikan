import "@/components/global.css";

import { ThemeProvider } from "next-themes";

import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const client = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
