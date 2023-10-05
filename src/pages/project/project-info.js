import {
	Button,
	Grid,
	GridItem,
	HStack,
	Heading,
	Link,
	Tag,
	Text,
	VStack,
} from "@chakra-ui/react";
import ProjectLogo from "@/components/common/project-logo";
import { IoCaretUp } from "react-icons/io5";
import { map } from "lodash";

export default ({ id, logo, appname, appdescription, url, tags, featured }) => {
	return (
		<Grid
			templateColumns={[
				"repeat(1, 1fr)",
				"repeat(5, 1fr)",
				"repeat(5, 1fr)",
				"repeat(10, 1fr)",
			]}
			gap={4}
		>
			<GridItem align="center">
				<ProjectLogo logo={logo} />
			</GridItem>
			<GridItem colSpan={[1, 3, 3, 7]}>
				<Heading mb={2} textAlign={["center", "left"]}>
					{appname}
				</Heading>
				<Text textAlign={["center", "left"]} pb={8}>
					{appdescription}
				</Text>
				<HStack>
					{map(tags, (tag, key) => (
						<Tag key={key}>{tag}</Tag>
					))}
				</HStack>
			</GridItem>
			<GridItem align="center" colSpan={[1, 1, 1, 2]}>
				<VStack>
					<Button
						colorScheme="pink"
						w="full"
						as={Link}
						href={url}
						leftIcon={<IoCaretUp color="white" />}
						rightIcon={<Text>9</Text>}
						_hover={{ textDecoration: "none" }}
						isExternal
					>
						Upvote
					</Button>
					<Button
						colorScheme="black"
						variant="outline"
						as={Link}
						href={url}
						w="full"
						_hover={{ textDecoration: "none" }}
						isExternal
					>
						Try it
					</Button>
				</VStack>
			</GridItem>
		</Grid>
	);
};
