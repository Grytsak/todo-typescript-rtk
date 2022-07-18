import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.user?.token
        if(token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 4 })

export const api = createApi({
    reducerPath: 'mainApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Tasks'],
    endpoints: () => ({})
})

export const enhancedApi = api.enhanceEndpoints({
    endpoints: () => ({})
})