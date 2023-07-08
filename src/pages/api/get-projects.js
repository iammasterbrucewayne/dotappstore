import { getLocalProjectData } from "@/lib/local-project-data";

export default async function handler(req, res) {
	const json = await getLocalProjectData();
	const data = json.projectsData;
	try {
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ statusCode: 500, message: error.message });
	}
}
