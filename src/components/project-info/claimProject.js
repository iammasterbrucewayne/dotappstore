import {
  Modal,
  Text,
  Flex,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Icon,
} from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
export default function ClaimProject({ id, appname, session, twitterID }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        color="pink.600"
        fontWeight="normal"
        bg="none"
        p={0}
        leftIcon={<Icon as={IoShieldCheckmarkOutline} />}
        _hover={{ textDecoration: "none", color: "pink.400" }}
        onClick={session ? onOpen : signIn}
      >
        Claim Project
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf={"center"} marginTop={4}>
            Claim {appname} Project
          </ModalHeader>
          <ModalBody fontSize={"lg"} textAlign={"center"}>
            <Flex flexDir={"column"} gap={6}>
              <Text>
                Looks like you&apos;re trying to login as{" "}
                {session?.user?.username ||
                  session?.user?.email ||
                  `${session?.user?.name.slice(
                    0,
                    4
                  )}...${session?.user?.name.slice(-4)}`}
              </Text>
              <Text>
                You need to login through twitter with the account @{twitterID}{" "}
                to prove you&apos;re the owner
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter alignSelf={"center"}>
            <Button
              colorScheme="pink"
              onClick={async () => {
                await signOut();
                await signIn();
              }}
            >
              Sign Out and Login with Twitter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
