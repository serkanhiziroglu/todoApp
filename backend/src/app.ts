import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import taskRoutes from './routes/taskRoutes'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/tasks', taskRoutes)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})