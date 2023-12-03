import {
	Button,
	VStack,
	Link,
	Text,
	Icon,
	ButtonGroup,
} from "@chakra-ui/react";
import {
	IoCaretUp,
	IoFlagOutline,
	IoShieldCheckmarkOutline,
} from "react-icons/io5";

const CTA = ({ url }) => (
	<VStack>
		<Button
			colorScheme="pink"
			w="full"
			py={8}
			leftIcon={<IoCaretUp color="white" />}
			rightIcon={
				<Text fontSize="xs" fontWeight="normal">
					{"(soon)"}
				</Text>
			}
			transform="scale(1)"
			_hover={{ transform: "scale(1.03)" }}
			isDisabled
		>
			Upvote
		</Button>
		<Button
			colorScheme="pink"
			variant="outline"
			w="full"
			py={8}
			as={Link}
			href={url}
			boxShadow="4px 4px 0 #B83280"
			transform="scale(1)"
			_hover={{ textDecoration: "none", transform: "scale(1.03)" }}
			isExternal
		>
			Try it
		</Button>
		<ButtonGroup
			flexDir="column"
			alignItems={["center", "start"]}
			w="full"
			spacing={0}
			mt={3}
		>
			<Button
				as={Link}
				href="#"
				color="pink.600"
				fontWeight="normal"
				bg="none"
				p={0}
				leftIcon={<Icon as={IoShieldCheckmarkOutline} />}
				_hover={{ textDecoration: "none", color: "pink.400" }}
				isDisabled
			>
				Claim Project
				<Text pl={1} as="span" fontSize="xs">
					{"(soon)"}
				</Text>
			</Button>
			<Button
				as={Link}
				href="#"
				color="pink.600"
				fontWeight="normal"
				bg="none"
				p={0}
				leftIcon={<Icon as={IoFlagOutline} />}
				_hover={{ textDecoration: "none", color: "pink.400" }}
			>
				Report Project
			</Button>
		</ButtonGroup>
	</VStack>
);

export default CTA;
