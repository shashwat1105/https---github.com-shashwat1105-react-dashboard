import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import  helmet from 'helmet';


import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managmentRoutes from "./routes/managment.js";
import salesRoutes from "./routes/sales.js";

// Configurations

dotenv.config()

const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


// setting routes
app.use("/client",clientRoutes);
app.use("/general",generalRoutes);
app.use("/managment",managmentRoutes);
app.use("/sales",salesRoutes);

// mongoose setup

const port=process.env.PORT ||9000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(port,()=>{
        console.log(`Server Port: ${port}`)
    })
}).catch((err)=>{
    console.log(`${err} didnt connect`)
});