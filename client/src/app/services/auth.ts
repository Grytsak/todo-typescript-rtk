import { retry } from '@reduxjs/toolkit/query/react'
import { api } from './api'
import { User } from '../../features/auth/types'

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<User, any>({
            query: (credentials: any) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials

            }),
            extraOptions: {
                backoff: () => {
                    // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
                    retry.fail({ fake: 'error' })
                  },
            }
        }),
        register: build.mutation<User, any>({
            query: (credentials: any) => ({
                url: '/users',
                method: 'POST',
                body: credentials
            }),
            extraOptions: {
                backoff: () => {
                    // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
                    retry.fail({ fake: 'error' })
                  },
            }
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation
} = authApi