import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux';
import store from '@/core/redux/store';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Provider store={store}>
        <Toaster />
        <Component {...pageProps} />
    </Provider>
  </>
}