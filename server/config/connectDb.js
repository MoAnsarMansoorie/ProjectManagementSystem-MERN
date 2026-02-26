import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB database");
    } catch (error) {
        console.log(`Error database connection`, error)
    };
};

export default connectDb;