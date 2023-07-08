import { Grid, Icon, Tab, TabPanel, Text } from "@chakra-ui/react";
import { IoRocketSharp } from "react-icons/io5";
import CardComponent from "./card-component";

export const FeaturedTab = () => (
	<Tab>
		<Icon as={IoRocketSharp} mr={2} />
		<Text>Featured</Text>
	</Tab>
);
export const FeaturedPanel = ({ projects }) => {
	const featuredProjects = _.filter(projects, (project) =>
		_.has(project, "featured")
	);
	return (
		<TabPanel>
			<Grid
				templateColumns={[
					"repeat(1, 1fr)",
					"repeat(2, 1fr)",
					"repeat(2, 1fr)",
					"repeat(2, 1fr)",
					"repeat(3, 1fr)",
				]}
				gap={6}
			>
				{_?.map(featuredProjects, (content, index) => (
					<CardComponent key={index} {...content} />
				))}
			</Grid>
		</TabPanel>
	);
};
