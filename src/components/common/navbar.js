import {
	Avatar as ChakraAvatar,
	Box,
	HStack,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	VStack,
	Button,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import Image from "next/image";
import _ from "lodash";

const Navbar = () => {
	return (
		<HStack py={2} px={8} maxW="8xl" mx="auto" justifyContent="space-between">
			<Image
				src="https://europe1.discourse-cdn.com/standard21/uploads/polkadot2/original/1X/6ea9950aed34af4aa14a3bbe5ce85549b54278a1.svg"
				alt="dot-logo"
				width={48}
				height={48}
			/>
			<HStack justifyContent="end">
				<Button variant="outline" colorScheme="black">
					Submit a project
				</Button>
			</HStack>
		</HStack>
	);
};

export default Navbar;
