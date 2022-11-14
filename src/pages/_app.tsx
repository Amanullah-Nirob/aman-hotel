// external imports
import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import NextNProgress from 'nextjs-progressbar';

// internal imports
import { store } from '../app/store'; 
import MusterLayout from '../components/layouts/MusterLayout';
import '/sass/style.scss';
let persistor = persistStore(store);


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
              <MusterLayout>
              <NextNProgress color="#5C98F2" />
              <Component {...pageProps} />
              </MusterLayout>
         </PersistGate>
    </Provider>
  
    )
}
