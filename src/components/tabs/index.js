import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import _ from "lodash";
import { FeaturedPanel, FeaturedTab } from "./featured";
import ProjectList from "./project-list";
import { useEffect, useState } from "react";

const tabs = [
	{ name: "All", category: "All" },
	{ name: "Wallets", category: "Wallet" },
	{ name: "Explorers", category: "Explorer" },
];

export default function TabsComponent() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		const getProjects = async () => {
			const response = await fetch("/api/get-projects");
			const projects = await response.json();
			setProjects(projects);
		};
		getProjects();
	}, []);

	return (
		<Tabs variant="soft-rounded" colorScheme="pink" mt={8}>
			<TabList overflow="scroll" p={1}>
				<FeaturedTab />
				{_?.map(tabs, (tab, index) => (
					<Tab key={index}>{tab.name}</Tab>
				))}
			</TabList>
			<TabPanels pt={6}>
				<FeaturedPanel projects={projects} />
				{_?.map(tabs, (tab, index) => (
					<ProjectList key={index} projects={projects} {...tab} />
				))}
			</TabPanels>
		</Tabs>
	);
}
