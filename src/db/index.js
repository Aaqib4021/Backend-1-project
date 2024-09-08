import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
  try {
    const conncetionInstances = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MONGODB CONNECTED || HOST ${conncetionInstances.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR:", error);
    process.exit(1); //throw error
  }
};
export default connectDB;
