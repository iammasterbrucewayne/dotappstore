import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  let client;

  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_URI);

    // Select the "dotappstoreData" database
    const db = client.db("dotappstoreData");

    // Select the "projects" collection
    const projectsCollection = db.collection("projects");

    // Find all documents in the collection
    const projects = await projectsCollection.find({}).toArray();

    // Send the fetched data as JSON
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  } finally {
    // Ensure to close the MongoDB client
    if (client) {
      client.close();
    }
  }
}
