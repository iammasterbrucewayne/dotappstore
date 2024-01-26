import {
  Button,
  VStack,
  Link,
  Text,
  Icon,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Tag,
} from "@chakra-ui/react";
import {
  IoCaretUp,
  IoFlagOutline,
  IoCheckmarkSharp,
  IoCloseSharp,
  IoPencil,
} from "react-icons/io5";
import ClaimProject from "./claimProject";
import { useProjects } from "@/lib/store/useProjects";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { upvote, report, downvote } from "@/lib/utils";

const CTA = ({
  appname,
  url,
  id,
  upvotes,
  reportedBy,
  upvoteUsers,
  twitterID,
}) => {
  const { data: session } = useSession();
  const { projects, setProjects } = useProjects();
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasReported, setHasReported] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isUpvoteLoading, setIsUpvoteLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reportedType, setReportedType] = useState(null);
  const [isReportLoading, setIsReportLoading] = useState(false);
  const reportTypes = [
    "Scam",
    "Harassment",
    "Threatening Violence",
    "Hate",
    "Impersonation",
    "Copyright Violation",
    "Spam",
    "Misinformation",
  ];

  useEffect(() => {
    if (session) {
      reportedBy.find((user) => {
        if (
          user.user == session?.user?.username ||
          user.user == session?.user?.email ||
          user.user == session?.user?.name
        ) {
          setHasReported(user.type);
        }
      });
      if (
        upvoteUsers.includes(session.user.username) ||
        upvoteUsers.includes(session.user.email) ||
        upvoteUsers.includes(session.user.name)
      ) {
        setHasUpvoted(true);
      } else {
        setHasUpvoted(false);
      }
    }
  }, [session, reportedBy, upvoteUsers]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/get-projects");
      const projectsFromApi = await response.json();
      setProjects(projectsFromApi);
    } catch (error) {
      alert("Failed to fetch projects:", error);
    }
  };

  return (
    <VStack>
      <Button
        colorScheme={hasUpvoted && isHovering ? "red" : "pink"}
        w="full"
        py={8}
        leftIcon={
          hasUpvoted ? (
            isHovering ? (
              <IoCloseSharp />
            ) : (
              <IoCheckmarkSharp />
            )
          ) : isHovering ? (
            <IoCaretUp />
          ) : (
            <IoCaretUp />
          )
        }
        variant={hasUpvoted && isHovering ? "outline" : "solid"}
        border="1px solid"
        rightIcon={hasUpvoted && isHovering ? "" : <Text>{upvotes}</Text>}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        isDisabled={isUpvoteLoading || !session}
        onClick={async () => {
          if (hasUpvoted) {
            setIsUpvoteLoading(true);
            await downvote({
              projectID: id,
              userID:
                session?.user?.username ||
                session?.user?.email ||
                session?.user?.name,
            });
            await fetchProjects();
            setIsUpvoteLoading(false);
          } else {
            setIsUpvoteLoading(true);
            await upvote({
              projectID: id,
              userID:
                session?.user?.username ||
                session?.user?.email ||
                session?.user?.name,
            });
            await fetchProjects();
            setIsUpvoteLoading(false);
          }
        }}
      >
        {hasUpvoted ? (isHovering ? "Remove Upvote" : "Upvoted") : "Upvote"}
      </Button>
      <Button
        colorScheme="pink"
        variant="outline"
        w="full"
        py={8}
        as={Link}
        href={url}
        _hover={{ textDecoration: "none" }}
        isExternal
      >
        Try it
      </Button>
      <ButtonGroup
        flexDir="column"
        alignItems={["center", "start"]}
        w="full"
        spacing={0}
        mt={3}
      >
        {("" || session?.user?.username?.toLowerCase()) ==
        twitterID?.toLowerCase() ? (
          <Button
            as={Link}
            href={`/edit/${id}`}
            color="pink.600"
            fontWeight="normal"
            bg="none"
            p={0}
            leftIcon={<IoPencil />}
            _hover={{ textDecoration: "none", color: "pink.400" }}
          >
            Edit Project
          </Button>
        ) : (
          <ClaimProject
            id={id}
            appname={appname}
            session={session}
            twitterID={twitterID}
          />
        )}
        {hasReported ? (
          <Flex textAlign={"left"} flexDir={"column"} marginTop={2}>
            <Text>You have already reported this project</Text>
            <Text>Reason:</Text>
            <Tag variant="outline" colorScheme="pink" w={"fit-content"}>
              {hasReported}
            </Tag>
          </Flex>
        ) : (
          <>
            <Button
              onClick={session ? onOpen : signIn}
              color="pink.600"
              fontWeight="normal"
              bg="none"
              p={0}
              marginTop={2}
              leftIcon={<Icon as={IoFlagOutline} />}
              _hover={{ textDecoration: "none", color: "pink.400" }}
              isDisabled={hasReported}
            >
              Report Project
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={"lg"}>
              <ModalOverlay />
              <ModalContent p={4}>
                <ModalHeader fontWeight="bold">
                  Submit a report here
                </ModalHeader>
                <ModalCloseButton isDisabled={isReportLoading} />

                <ModalBody>
                  <Text fontSize={"lg"}>
                    Help us understand the problem - What is going on with this
                    project?
                  </Text>
                  <Flex flexDir={"row"} flexWrap={"wrap"} gap={4} mt={6}>
                    {reportTypes.map((type) => (
                      <Button
                        variant={"outline"}
                        key={type}
                        onClick={() => setReportedType(type)}
                        colorScheme={reportedType == type ? "pink" : "gray"}
                        fontWeight="normal"
                        bg="none"
                      >
                        {type}
                      </Button>
                    ))}
                  </Flex>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="pink"
                    py={6}
                    px={12}
                    isDisabled={!reportedType || isReportLoading}
                    onClick={async () => {
                      setIsReportLoading(true);
                      await report({
                        projectID: id,
                        userID:
                          session?.user?.username ||
                          session?.user?.email ||
                          session?.user?.name,
                        reportType: reportedType,
                      });
                      await fetchProjects();
                      setIsReportLoading(false);
                      onClose();
                    }}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </ButtonGroup>
    </VStack>
  );
};

export default CTA;
