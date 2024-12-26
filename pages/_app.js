import "../styles/globals.css";
//handle usesession state for session management
import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session = {pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>

);
}


