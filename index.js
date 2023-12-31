import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import employeeRoute from './router/Employee.router.js'
import authRoute from './router/Auth.router.js'

// Configuration
const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({extended: true }));
dotenv.config();
const port = process.env.PORT;

mongoose.set("strictQuery", false);

const connectMongo = ()=>{
mongoose.connect(process.env.MONGO_URI);
console.log("Connected to Mongo!");
}

app.use("/api/employee", employeeRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
  connectMongo();
  console.log(`Server is running on Port ${port}`);
});
