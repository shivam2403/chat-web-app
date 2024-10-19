import mongoose from 'mongoose';

const connectDB=async()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to database")
    } catch (error) {
        console.log("Error connecting to database "+ error)
    }
}

export default connectDB;