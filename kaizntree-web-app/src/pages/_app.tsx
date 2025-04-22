import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return <>
<Head>
  <title>Kaizntree Dashboard</title>
  <meta name="description" content="" />
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="apple-mobile-web-app-title" content="Kaizntree Dashboard" />
  <meta name="application-name" content="Kaizntree Dashboard" />
  <link rel="icon" href="/favicon.ico"/>

</Head>

  <SessionProvider session={session}><Component {...pageProps} /></SessionProvider>
  </>
}
