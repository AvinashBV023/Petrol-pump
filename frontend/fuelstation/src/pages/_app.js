// import '../styles/globals.css';
import LayOut from '../../components/LayOut';
import { CssBaseline } from '@mui/material';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <LayOut>
        <Component {...pageProps} />
      </LayOut>
    </>
  );
}

export default MyApp;
