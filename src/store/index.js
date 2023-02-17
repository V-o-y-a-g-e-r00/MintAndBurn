import { configureStore } from '@reduxjs/toolkit';
import walletSlice from './slices/wallet/walletSlice';

const reducer = {
  wallets: walletSlice.reducer
};

const store = configureStore({ reducer, devTools: process.env.NODE_ENV === 'development' });

export default store;
