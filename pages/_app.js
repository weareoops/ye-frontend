import 'tailwindcss/tailwind.css'
import './styles.css'
import Head from "next/head";

function Ye({ Component, pageProps }) {
  return <>
          <Head>
            <title>sysInfo</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </>
}

export default Ye