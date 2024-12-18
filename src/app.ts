import express, { Application, Request, Response } from "express"
import cors from "cors"
const app:Application = express()


app.use(express.json())
app.use(cors())


app.get('/', (req:Request, res:Response) => {
  res.send('Code-With-Anik is the best platform')
})

export default app



