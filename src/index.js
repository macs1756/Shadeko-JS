import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './Sass/app.scss';
import './Sass/mixin.scss';
import './Sass/myBootstrap.scss';
import './Sass/nullstyle.scss';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import { PersistGate } from 'redux-persist/integration/react';

import { Helmet,HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <HelmetProvider>
   <Provider store={store}>
      <BrowserRouter>
      <PersistGate loading={"loading"} persistor={persistor}>
        <App />
      </PersistGate> 
      </BrowserRouter>
    </Provider>
    </HelmetProvider>  
);


