import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../app/services/auth'
import type { User } from './types'
import type { RootState } from '../../app/store'

// Get user from localStorage
const user: any = JSON.parse(localStorage.getItem('user') || '{}')

const initialState = {
  user: user ? user : null,
  } as { user: User | null }
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setCredentials: (state, action) => {
        state.user = action.payload
      },
      logOut: (state) => {
          state.user = null
          localStorage.removeItem('user')
      }
    },
  })
  
  export const { setCredentials, logOut } = authSlice.actions
  export default authSlice.reducer

  export const selectCurrentUser = (state: any) => state.auth.user