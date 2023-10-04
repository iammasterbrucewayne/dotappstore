const { Image } = require("@chakra-ui/react");

export default ({ logo }) => (
	<Image
		rounded="lg"
		src={
			logo
				? logo
				: "https://europe1.discourse-cdn.com/standard21/uploads/polkadot2/original/1X/6ea9950aed34af4aa14a3bbe5ce85549b54278a1.svg"
		}
		h="auto"
		w="full"
		maxW={128}
	/>
);
