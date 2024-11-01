const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL

const url = "mongodb+srv://guitarstyles80:FHIR19807657@patients.qgrgo.mongodb.net/?retryWrites=true&w=majority&appName=patients";

const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();

  console.log('Connected successfully to server');

  await client.db("admin").command({ ping: 1 });
  
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

//   const db = client.db(dbName);
//   const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());