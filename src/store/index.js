import { configureStore } from '@reduxjs/toolkit';
import walletSlice from './slices/wallet/walletSlice';
import notificationsSlice from './slices/notifications/notificationsSlice';
import applicationSlice from './slices/application/appSlice';
import eventSlice from "./slices/event/eventSlice";

const reducer = {
  wallets: walletSlice.reducer,
  notifications: notificationsSlice.reducer,
  application: applicationSlice.reducer,
  event: eventSlice.reducer
};

const store = configureStore({ reducer, devTools: process.env.NODE_ENV === 'development' });
window.store = store;
export default store;
