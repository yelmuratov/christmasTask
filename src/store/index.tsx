import { useDispatch } from 'react-redux'
import mainSlice from '../reducer/mainSlice/mainSlice'

import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({
  reducer: mainSlice,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
