import mongoose from "mongoose";

const connection={}

async function dbConnect(){
    //check if we have a connection to database or if currently connecting
    if(connection.isConnected){
        console.log("Already connected to database");
        return
    }
    try {
       const db=await mongoose.connect(process.env.MONGODB_URI || '',{}) 
       connection.isConnected=db.connections[0].readyState
       console.log("Database connected succesfully");
       
    } catch (error) {
        console.log("Database connection failed",error);
        
        //gracefully exit in case of connection error
        process.exit(1)
    }
}
export default dbConnect