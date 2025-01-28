import dotenv from 'dotenv';
import connectDB from './db/db_connect.js';

dotenv.config();

export default async function bootstrap() {

    console.log("Bootstrapping...");
    //execute all the bootstrap logic

    try{
        //connect to db
        await connectDB();

        console.log("Bootstrapping complete.");
    }catch(err){
        console.log("Error when bootstrapping. Error: " + err);
        console.log("Aborting..");
        process.exit(1);
    }
    
}
