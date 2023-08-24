import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Database connected ...');
    }).catch((err) => {
        console.log( "Database connection error -",err);
    })
}

export default connectDB;