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
  let tourInfo = undefined;
  try {
    await client.connect();
    let db = client.db("cycle_blog");
    tourInfo = await db.command({
      find: "tours",
      filter: {_id: {$eq: new ObjectId(id)}}
    });
    tourInfo = tourInfo.cursor.firstBatch[0];
  } catch (error) {
    console.dir(`Error Reading Tour ${id}:` + error);
  } finally {
    await client.close();
    if (tourInfo === undefined) {
      throw new Error(`Reading Tour ${id} failed`);
    }
    return tourInfo;
  }
}

export async function run() {
  try {
    await client.connect();
    await client.db("cycle_blog").command({ping: 1});
    console.log("Pinged!");
  } catch (error) {
    console.dir(error);
  } finally {
    await client.close();
  }
}