import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slide/counterSlide'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

