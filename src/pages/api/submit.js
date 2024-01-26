import { MongoClient } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    if (req.method === "POST") {
      try {
        await client.connect();
        const db = client.db("dotappstoreData");
        const collection = db.collection("projects");
        const document = req.body;

        // Check if a document with the same ID already exists
        const existingDocument = await collection.findOne({ id: document.id });
        if (existingDocument) {
          return res
            .status(409)
            .json({ message: "Project with the same ID already exists" });
        }

        // If ID does not exist, insert the new document
        const result = await collection.insertOne(document);
        res.status(201).json({ message: "Document added", result });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error connecting to database", error });
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
