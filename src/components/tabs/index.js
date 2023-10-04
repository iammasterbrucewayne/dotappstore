import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import { map, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useProjects } from "@/lib/store/useProjects";
import { FeaturedPanel, FeaturedTab } from "./featured";
import ProjectList from "./project-list";

const tabs = [
	{ name: "All", category: "All" },
	{ name: "Wallets", category: "Wallet" },
	{ name: "Explorers", category: "Explorer" },
];

export default function TabsComponent() {
	const { projects, setProjects } = useProjects();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Function to fetch projects from the API
		const getProjects = async () => {
			try {
				const response = await fetch("/api/get-projects");
				const projects = await response.json();
				setProjects(projects);
				setIsLoading(false); // Set loading to false once projects are loaded
			} catch (error) {
				console.error("Failed to fetch projects:", error);
				// Handle error appropriately, e.g., show an error message to the user
			}
		};
		// Fetch projects only if projects array is empty
		if (isEmpty(projects)) {
			getProjects();
		} else {
			setIsLoading(false); // If projects are already present, set loading to false
		}
	}, [projects, setProjects]);

	return isLoading ? (
		"Loading..."
	) : (
		<Tabs variant="soft-rounded" colorScheme="pink" mt={8}>
			<TabList overflow="scroll" p={1}>
				<FeaturedTab />
				{map(tabs, (tab, index) => (
					<Tab key={index}>{tab.name}</Tab>
				))}
			</TabList>
			<TabPanels pt={6}>
				<FeaturedPanel projects={projects} />
				{map(tabs, (tab, index) => (
					<ProjectList key={index} projects={projects} {...tab} />
				))}
			</TabPanels>
		</Tabs>
	);
}
