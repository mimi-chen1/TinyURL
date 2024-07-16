import mongoose from "mongoose";

const uriLocal = "mongodb://localhost:27017/TinyUrl";

const connectDB = async () => {
    await mongoose.connect(uriLocal);
  };
  const database = mongoose.connection;
  
  database.on('error', (error) => {
    console.log('DB error '+error);
  })
  
  database.once('connected', () => {
    console.log('Database Connected');
  })
  
  export default connectDB;