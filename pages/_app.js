<<<<<<< HEAD
import Head from 'next/head';

import '../styles/globals.css';
import Layout from '../components/layout/layout';
=======
import Layout from '../components/layout/layout';
import '../styles/globals.css';
>>>>>>> tmo

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
<<<<<<< HEAD
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
=======
>>>>>>> tmo
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
