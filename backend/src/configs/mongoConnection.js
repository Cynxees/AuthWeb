const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@atlascluster.kf0dtdm.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

let db;


const connectDB = async () => {
  
  if (db) return db;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

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


module.exports = connectDB;