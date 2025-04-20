import {configureStore} from '@reduxjs/toolkit';
import characterSlice from './slices/characterSlice';

export const store = configureStore({
  reducer: {
    counter: characterSlice,
  },
});

// 타입을 위한 export
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
