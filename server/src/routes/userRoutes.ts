import express from 'express'
const router  = express.Router()

import {registerUser, loginUser} from '../controllers/userControllers'

router.post('/', registerUser)
router.post('/login', loginUser)

export default router

