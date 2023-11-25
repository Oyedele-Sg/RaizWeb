import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../store"
// import type { RootState, AppDispatch } from 'redux/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
