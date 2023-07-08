import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

const ContextWrapper = ({ children }) => (
	<ChakraProvider theme={theme}>{children}</ChakraProvider>
);

export default ContextWrapper;
