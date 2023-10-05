import { extendTheme } from "@chakra-ui/react";
import localFont from "next/font/local";

export const unbounded = localFont({
	src: [
		{
			path: "../../pages/fonts/unbounded/Unbounded-ExtraLight.woff2",
			weight: "100",
		},
		{
			path: "../../pages/fonts/unbounded/Unbounded-Light.woff2",
			weight: "300",
		},
		{
			path: "../../pages/fonts/unbounded/Unbounded-Regular.woff2",
			weight: "400",
		},
		{
			path: "../../pages/fonts/unbounded/Unbounded-Medium.woff2",
			weight: "500",
		},
		{ path: "../../pages/fonts/unbounded/Unbounded-Bold.woff2", weight: "700" },
		{
			path: "../../pages/fonts/unbounded/Unbounded-Black.woff2",
			weight: "900",
		},
	],
});

const theme = extendTheme({
	fonts: {
		heading: unbounded.style.fontFamily,
	},
});

export default theme;
