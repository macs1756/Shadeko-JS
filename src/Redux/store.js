import { configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartReducer';
import favoriteReducer from './favoriteReducer';
import loginReducer from './loginReducer';
import promocodeReducer from './promocodeReducer';
import languageReducer from './languageReducer';
import timestampReducer from './timestampReducer';




import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root', 
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer);
const persistedFavoriteReducer = persistReducer(persistConfig, favoriteReducer);
const persistedLoginReducer = persistReducer(persistConfig, loginReducer);
const persistedPromocodeReducer = persistReducer(persistConfig, promocodeReducer);
const persistedLanguageReducer = persistReducer(persistConfig, languageReducer);
const persistedTimestampReducer = persistReducer(persistConfig, timestampReducer);


export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    favorite: persistedFavoriteReducer,
    login: persistedLoginReducer,
    promocode: persistedPromocodeReducer,
    language: persistedLanguageReducer,
    timestamp: persistedTimestampReducer,
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions:  [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
    },
  })
});


export let persistor = persistStore(store);