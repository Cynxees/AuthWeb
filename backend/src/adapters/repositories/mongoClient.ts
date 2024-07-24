import { MongoClient, Db } from "mongodb";

const uri = "mongodb+srv://admin:admin@atlascluster.kf0dtdm.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";
const client = new MongoClient(uri);

let db: Db;


export const getMongoDB = async () : Promise<Db> => {
  
    if (db) return db;

    try {

        await client.connect();
        db = client.db("AuthWeb"); 
        console.log("MongoDB Connected");

        return db;

    } catch (error) {

        console.error("Error Connect MongoDB: ", error);
        throw error;

    }

}

