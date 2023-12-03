import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }
    
  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("dotappstoreData");
    const projectsCollection = db.collection("projects");

    const userID = req.body.userID;
    const projectID = req.body.projectID;

    const query = { id: projectID, upvoteUsers: userID };
    const project = await projectsCollection.findOne(query);

    const hasUpvoted = !!project;

    res.status(200).json({ hasUpvoted });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  } finally {
    if (client) {
      client.close();
    }
  }
}
