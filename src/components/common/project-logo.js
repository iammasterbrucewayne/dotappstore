const { Image } = require("@chakra-ui/react");

const ProjectLogo = ({
	logo = "https://europe1.discourse-cdn.com/standard21/uploads/polkadot2/original/1X/6ea9950aed34af4aa14a3bbe5ce85549b54278a1.svg",
}) => (
	<Image
		rounded="lg"
		src={logo}
		h="auto"
		w="full"
		alt="Project Logo"
		maxW={128}
	/>
);

export default ProjectLogo;
