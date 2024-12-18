import express, { Application, Request, Response } from "express"
import cors from "cors"
import router from "./app/routers"
import cookieParser from "cookie-parser"
import { notFount } from "./app/middlewares/notFound"
import { globalErrorHandler } from "./app/middlewares/GlobalErrorHandler"
const app:Application = express()


app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(cookieParser());

// Application routers
app.use('/api', router);


app.get('/', (req:Request, res:Response) => {
  res.send('Code-With-Anik is the best platform')
})

app.use(globalErrorHandler);
app.use(notFount);

export default app



