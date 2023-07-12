import {MongoClient, ObjectId, ServerApiVersion} from "mongodb";

const uri = process.env.MONGODB_URI;

// Create a MongoClient with Stable API Version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

export async function readTour(id) {
  let res = undefined;
  try {
    await client.connect();
    let db = client.db("cycle_blog");
    res = await db.command({
      find: "tours",
      filter: {_id: {$eq: new ObjectId(id)}}
    });
    if (res.ok === 1) {
      res = res.cursor.firstBatch[0];
    }
  } catch (error) {
    console.dir(error);
  } finally {
    await client.close();
    return res; // Look into promises, I think they do exactly what I'm doing here with return undefined better
  }
}

export async function run() {
  try {
    await client.connect();
    await client.db("sample_geospatial").command({ping: 1});
    console.log("Pinged!");
  } catch (error) {
    console.dir(error);
  } finally {
    await client.close();
  }
}