import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const dataDB = client.db("dotappstoreData");
    const projectsCollection = dataDB.collection("projects");
    const { projectID, userID } = req.body;

    const result = await projectsCollection.updateOne(
      { id: projectID },
      {
        $inc: { upvotes: -1 },
        $pull: { upvoteUsers: userID },
      }
    );

    if (result.modifiedCount === 0) {
      res.status(404).json({
        message: "Failed to update the project downvotes.",
      });
    } else {
      res.status(200).json({ message: "Downvote successful" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
