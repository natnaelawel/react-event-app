import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './app';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NEXT_APP_ENABLE_REDUX_DEV_TOOLS === 'true'
});


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch