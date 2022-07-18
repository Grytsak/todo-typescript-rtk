import express from 'express'
import jwt from 'jsonwebtoken'
import asyncWrapper from './async'
import User from '../models/User'
import {IUser} from '../models/User'
import { StdioNull } from 'child_process'

const protect = asyncWrapper(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let token: string = ''

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token 
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)

            // Get user from token
            const findUser  = await User.findById(decoded.id).select('-password')
            req.user = findUser ? findUser : {}

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export default protect