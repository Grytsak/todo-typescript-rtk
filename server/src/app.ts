import express from 'express'
import connectDB from './db/connect'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import usersRouters from './routes/userRoutes'
import tasksRouters from './routes/taskRoutes'

const app: express.Application = express()
const port: any = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/api/users', usersRouters)
app.use('/api/tasks', tasksRouters)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()