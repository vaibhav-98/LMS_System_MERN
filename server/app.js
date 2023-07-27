import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import userRouters from './routes/user.routes.js'
import {config} from 'dotenv'
config();



const app = express()

app.use(express.json())


app.use( cors({
    origin : [process.env.FRONTEND_URL],
    Credentials :true,
}));


app.use( cookieParser())


app.use(morgan('dev'))// log management , as a middeleware use krte hai

app.use('/ping' , function (req,res)  {
    res.send('/Pong')
})

// routes of 3 modules

app.use('/api/v1/user', userRouters)

app.all('*' , (req,res) => {
    res.status(404).send('OPPS!! 404 page not found')
})





export default app;