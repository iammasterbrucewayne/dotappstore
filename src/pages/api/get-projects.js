import localProjectData from "@/lib/local-project-data";

export default async function handler(req, res) {
	try {
		res.status(200).json(localProjectData);
	} catch (error) {
		res.status(500).json({ statusCode: 500, message: error.message });
	}
}
