import ContextWrapper from "@/components/common/context-wrapper";
import Navbar from "@/components/common/navbar";
import { useRouter } from "next/router";
import { Disclaimer } from "./disclaimer";
import { useProjects } from "@/lib/store/useProjects";
import { find, isArray, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { Grid, GridItem, Heading, Image, VStack } from "@chakra-ui/react";

export default function Page() {
	const router = useRouter();
	const projectId = router.query.id;

	const { projects, setProjects } = useProjects();
	const [projectInfo, setProjectInfo] = useState({});
	const [projectsStateLoaded, setProjectsStateLoaded] = useState(false);

	const getProjects = async () => {
		const response = await fetch("/api/get-projects");
		const projects = await response.json();
		const project = find(projects, { id: projectId });
		setProjects(projects);
		setProjectInfo(project);
	};

	useEffect(
		() => isArray(projects) && setProjectsStateLoaded(true),
		[projects]
	);

	useEffect(() => {
		if (projectsStateLoaded) {
			if (isEmpty(projects)) getProjects();
		}
	}, [projectsStateLoaded, projects, setProjects, setProjectInfo]);

	return (
		<ContextWrapper>
			<Navbar />
			<VStack p={8}>
				<Disclaimer />
				{projectInfo && (
					<Grid
						templateColumns={[
							"repeat(1, 1fr)",
							"repeat(5, 1fr)",
							"repeat(5, 1fr)",
							"repeat(10, 1fr)",
						]}
						gap={4}
					>
						<GridItem>
							<Image
								rounded="lg"
								src={
									logo
										? logo
										: "https://europe1.discourse-cdn.com/standard21/uploads/polkadot2/original/1X/6ea9950aed34af4aa14a3bbe5ce85549b54278a1.svg"
								}
								h="auto"
								w="full"
								maxW={128}
							/>
						</GridItem>
						<GridItem>
							<Heading>{appname}</Heading>
						</GridItem>
					</Grid>
				)}
			</VStack>
		</ContextWrapper>
	);
}
