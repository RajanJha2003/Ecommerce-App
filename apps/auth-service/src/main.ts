import express from 'express';
import cors from 'cors';
import { errorMiddleware } from '../../../packages/error-handler/error-middleware';
import cookieParser from 'cookie-parser'
import router from './routes/auth.route';

const app = express();

app.use(cors({
  origin:["http://localhost:3000"],
  allowedHeaders:["Authorization","Content-Type"],
  credentials:true,
}))

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.use("/api",router)


app.use(errorMiddleware)

const port=process.env.PORT || 6001;

const server=app.listen(port,()=>{
  console.log(`Auth service running at http://localhost:${port}/api`)
})

server.on('error',(err:any)=>{
  console.log("Server error",err)
})