import { Heading, Text } from "@chakra-ui/react";

const MainContent = ({ appname, appdescription, textAlign = "left" }) => (
	<>
		<Heading mb={2} textAlign={textAlign}>
			{appname}
		</Heading>
		<Text textAlign={textAlign} pb={8}>
			{appdescription}
		</Text>
	</>
);

export default MainContent;
