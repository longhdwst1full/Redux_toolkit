import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import BlogReducer from 'pages/blog.reducer'
import { blogApi } from 'pages/blog.server'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    blog: BlogReducer,
    [blogApi.reducerPath]: blogApi.reducer
    // thêm ruducer đc tạo từ api slice
  },
  // thêm api middleware để enable các tính năng cachin , invalidation, polling của rtk query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})

// optionnam , nhung bắt buộc nét dùng tính năng refetchonFocú. refetchOnReconnect
setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
