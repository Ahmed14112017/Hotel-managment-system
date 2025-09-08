import { configureStore } from "@reduxjs/toolkit";
import loginuser from "./slices/Userslice";
import { RoomApi } from "./slices/Roomslice";
import { FacilityApi } from "./slices/FacilitySlice";
import { Advertisementslice } from "./slices/Advertisement";

export const store = configureStore({
  reducer: {
    users: loginuser,
    [RoomApi.reducerPath]: RoomApi.reducer,
    [FacilityApi.reducerPath]: FacilityApi.reducer,
    [Advertisementslice.reducerPath]: Advertisementslice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      RoomApi.middleware,
      FacilityApi.middleware,
      Advertisementslice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
