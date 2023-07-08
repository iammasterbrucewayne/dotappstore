"use client";
import Navbar from "@/components/common/navbar";
import { Box, Heading } from "@chakra-ui/react";
import RootLayout from "./layout";
import ContextWrapper from "@/components/common/context-wrapper";
import TabsComponent from "@/components/tabs";

export default function Page() {
	return (
		<ContextWrapper>
			<Navbar />
			<Box p={8} pt={16} mx="auto" maxW="8xl">
				<Heading size={["lg", "2xl", "4xl"]} fontWeight="extrabold">
					Discover the hottest projects on Polkadot.
				</Heading>
				<TabsComponent />
			</Box>
		</ContextWrapper>
	);
}
