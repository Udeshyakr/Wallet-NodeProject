import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import UserRoutes  from './routes/user.js'
import connectDB from "./database/connect.js";
import notFound from "./middleware/not-found.js";
import cookieParser from "cookie-parser";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json())
app.use(cookieParser())

dotenv.config();

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html');
})

app.use('/api', UserRoutes)
app.use(notFound)
//app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5500;
const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`server is listening to port ${PORT}...`))
    } 
    catch (error) {
        console.log(error)
    }
}

start()