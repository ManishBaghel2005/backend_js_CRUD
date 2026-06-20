import mongoose from "mongoose";

const db = async()=>{
    try {
       const conn =  await mongoose.connect(process.env.MONGO_URI);
        // console.log("DB IS CONNECTED SUCCESFULLY");
        
    } catch (error) {
        console.error(`This error to Not Connect Db ${error.message}`);
        process.exit(1)
    }
}

export default db;