import fsPromises from "fs/promises";
import path from "path";

export async function getLocalProjectData() {
	const filePath = path.join(process.cwd(), "src/static/projects.json");
	const jsonData = await fsPromises.readFile(filePath);
	const objectData = JSON.parse(jsonData);

	return objectData;
}
