import { HStack, Button, Link } from "@chakra-ui/react";
import Image from "next/image";
import _ from "lodash";

const Navbar = () => {
	return (
		<HStack py={2} px={8} maxW="6xl" mx="auto" justifyContent="space-between">
			<Link href="/">
				<Image
					src="https://europe1.discourse-cdn.com/standard21/uploads/polkadot2/original/1X/6ea9950aed34af4aa14a3bbe5ce85549b54278a1.svg"
					alt="dot-logo"
					width={48}
					height={48}
					as={Link}
				/>
			</Link>
			<HStack justifyContent="end">
				<Button
					as={Link}
					variant="outline"
					colorScheme="black"
					href="https://github.com/iammasterbrucewayne/dotappstore#how-to-submit-a-project"
					boxShadow="4px 4px 0 black"
					transform="scale(1)"
					_hover={{ textDecoration: "none", transform: "scale(1.03)" }}
					isExternal
				>
					Submit a project
				</Button>
			</HStack>
		</HStack>
	);
};

export default Navbar;
