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
  Link,
  Heading,
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
        leftIcon={<IoShieldCheckmarkOutline />}
        _hover={{ textDecoration: "none", color: "pink.400" }}
        onClick={session ? onOpen : signIn}
      >
        Claim Project
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalHeader fontWeight="bold">Claim {appname}</ModalHeader>
          <ModalBody fontSize={"lg"} mb={4}>
            <Text mb={4}>
              You&apos;re logged in as{" "}
              <b>
                {session?.user?.username ||
                  session?.user?.email ||
                  `${session?.user?.name.slice(
                    0,
                    4
                  )}...${session?.user?.name.slice(-4)}`}
              </b>
            </Text>
            <Text>
              To claim this project, you need to login using Twitter with the
              account{" "}
              <Link
                href={`https://x.com/${twitterID}`}
                fontWeight="bold"
                isExternal
              >
                @{twitterID}
              </Link>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={async () => {
                await signOut();
                await signIn();
              }}
              py={6}
              w="full"
            >
              Sign Out and Login with Twitter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
