import React from 'react';

import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

//
const middleWares = [thunk, logger];
import reducers from './reducers/index.reducers';
//
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['themeReducer'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(...middleWares));
  let persistor = persistStore(store);
  return {store, persistor};
};
