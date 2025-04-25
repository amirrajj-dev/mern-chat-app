import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(helmet({
    contentSecurityPolicy : false,

}))
app.use(cors({
    credentials : true ,
    origin : "http://localhost:5173"
}))


const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`);  
})