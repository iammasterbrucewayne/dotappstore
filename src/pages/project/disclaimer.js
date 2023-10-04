import {
	Alert,
	AlertDescription,
	AlertDialogFooter,
	AlertIcon,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from "@chakra-ui/react";

const MoreInfoModal = ({ isOpen, onClose }) => (
	<Modal isOpen={isOpen} onClose={onClose}>
		<ModalOverlay />
		<ModalContent>
			<ModalHeader>Disclaimer</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<Text pb={4}>
					Anyone can submit information about their project. This information is
					not verified by us or a third party. <br />
					<br />
					Do your own research and use your best judgement with projects listed
					on this directory. <br />
					<br />
					Being listed on the ecosystem page is not an endorsement from
					dotappstore, or any other related entity.
				</Text>
				<ModalFooter>
					<Button onClick={onClose} colorScheme="pink">
						I understand
					</Button>
				</ModalFooter>
			</ModalBody>
		</ModalContent>
	</Modal>
);

const MoreInfoButton = ({ onOpen }) => (
	<Button
		onClick={onOpen}
		bg="transparent"
		color="pink.600"
		mb={1}
		p={0}
		h="fit-content"
		textDecor="underline"
		_hover={{ bg: "transparent" }}
	>
		Learn More
	</Button>
);

export const Disclaimer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Alert
			status="info"
			variant="left-accent"
			mb={4}
			colorScheme="pink"
			color="pink.600"
		>
			<AlertIcon />
			<AlertDescription>
				This information is provided by a third party and is not verified by us.{" "}
				<span>
					<MoreInfoButton onOpen={onOpen} />
					<MoreInfoModal isOpen={isOpen} onClose={onClose} />
				</span>
			</AlertDescription>
		</Alert>
	);
};
