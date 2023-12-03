"use client";
import Navbar from "@/components/common/navbar";
import { Box, Heading } from "@chakra-ui/react";
import ContextWrapper from "@/components/common/context-wrapper";
import TabsComponent from "@/components/tabs";
import Script from "next/script";

export default function Page() {
	return (
		<ContextWrapper>
			<Navbar />
			<Box p={8} pt={16} mx="auto" maxW="6xl">
				<Heading size={["lg", "2xl", "4xl"]} fontWeight="extrabold">
					Discover the hottest projects on Polkadot.
				</Heading>
				<TabsComponent />
			</Box>
			<Script
				defer
				data-domain="dotappstore.com"
				src="https://plausible.io/js/script.js"
			/>
		</ContextWrapper>
	);
}
