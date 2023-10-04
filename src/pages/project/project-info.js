import ContextWrapper from "@/components/common/context-wrapper";
import Navbar from "@/components/common/navbar";
import { Disclaimer } from "./disclaimer";
import {
	Button,
	ButtonGroup,
	Grid,
	GridItem,
	Heading,
	Image,
	Link,
	Text,
	VStack,
} from "@chakra-ui/react";
import ProjectLogo from "@/components/common/project-logo";
import { IoCaretDown, IoCaretUp, IoChevronUp } from "react-icons/io5";

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
