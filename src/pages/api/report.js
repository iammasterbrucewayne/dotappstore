import { MongoClient } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST requests allowed" });
    }

    let client;

    try {
      client = await MongoClient.connect(process.env.MONGODB_URI);
      const dataDB = client.db("dotappstoreData");
      const projectsCollection = dataDB.collection("projects");
      const { projectID, userID, reportType } = req.body;

      // Construct the report object
      const report = { user: userID, type: reportType };

      // Check if the user has already reported the project (irrespective of the type)
      const project = await projectsCollection.findOne({
        id: projectID,
        "reportedBy.user": userID,
      });
      if (project) {
        return res
          .status(409)
          .json({ message: "User has already reported this project" });
      }

      // Update the document to add the report object to the reportedBy array
      const result = await projectsCollection.updateOne(
        { id: projectID },
        { $push: { reportedBy: report } }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({
          statusCode: 500,
          message: "Failed to report the project.",
        });
      }

      const emailData = JSON.stringify({
        personalizations: [
          {
            to: [{ email: process.env.REPORT_EMAIL_PRIMARY }],
            bcc: [{ email: process.env.REPORT_EMAIL_SECONDARY }],
            subject: "Reported project",
          },
        ],
        from: { email: process.env.SENDER_EMAIL },
        content: [
          {
            type: "text/plain",
            value: `User: ${userID}\nProject: ${projectID}\nReason: ${reportType}`,
          },
        ],
      });

      try {
        const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.SENDGRID_BEARER}`,
            "Content-Type": "application/json",
          },
          body: emailData,
        });

        if (!response.ok) {
          const error = await response.json();
          console.error("SendGrid error:", error);
          res
            .status(error.statusCode)
            .json({ message: "Failed to send email", details: error });
        }
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Server error", details: error });
      }

      res.status(200).json({ message: "Report successful" });
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    } finally {
      if (client) {
        client.close();
      }
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
