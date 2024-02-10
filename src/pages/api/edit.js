import { MongoClient } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import sanitize from "mongo-sanitize";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    if (req.method === "POST") {
      try {
        await client.connect();
        const db = client.db("dotappstoreData");
        const collection = db.collection("projects");
        const updatedDocument = sanitize(req.body);

        // Delete the _id field from the updated document if it exists
        delete updatedDocument._id;

        // Find the document by ID and update it with new data
        const result = await collection.findOneAndUpdate(
          { id: updatedDocument.id },
          { $set: updatedDocument },
          { returnDocument: "after" }
        );

        if (!result) {
          return res.status(404).json({ message: "Project not found" });
        }

        res
          .status(200)
          .json({ message: "Project updated", result: result.value });
      } catch (error) {
        res.status(500).json({ message: "Error updating the project", error });
      } finally {
        await client.close();
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
