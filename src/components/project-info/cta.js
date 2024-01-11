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
        colorScheme="pink"
        w="full"
        py={8}
        leftIcon={
          hasUpvoted ? (
            isHovering ? (
              <IoCloseSharp color="#B83280" />
            ) : (
              <IoCheckmarkSharp color="white" />
            )
          ) : isHovering ? (
            <IoCaretUp color="#B83280" />
          ) : (
            <IoCaretUp color="white" />
          )
        }
        variant={isHovering ? "outline" : "solid"}
        rightIcon={<Text>{upvotes}</Text>}
        transform="scale(1)"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        isDisabled={isUpvoteLoading || !session}
        _hover={{ transform: "scale(1.03)" }}
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
        boxShadow="4px 4px 0 #B83280"
        transform="scale(1)"
        _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
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
            colorScheme="pink"
            variant="outline"
            w="full"
            py={4}
            leftIcon={<IoPencil />}
            boxShadow="4px 4px 0 #B83280"
            transform="scale(1)"
            _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
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
              <ModalContent>
                <ModalHeader>
                  <Text fontSize={"2xl"}>Submit a report here</Text>
                </ModalHeader>
                <ModalCloseButton isDisabled={isReportLoading} />

                <ModalBody>
                  <Text fontSize={"2xl"}>
                    Help us understand the problem - What is going on with this
                    project
                  </Text>
                  <Flex flexDir={"row"} flexWrap={"wrap"} gap={4} mt={6}>
                    {reportTypes.map((type) => (
                      <Button
                        variant={"outline"}
                        key={type}
                        onClick={() => setReportedType(type)}
                        color={reportedType == type ? "pink.600" : "gray.400"}
                        borderColor={
                          reportedType == type ? "pink.600" : "gray.400"
                        }
                        fontWeight="normal"
                        bg="none"
                        _hover={{ textDecoration: "none", color: "pink.400" }}
                      >
                        {type}
                      </Button>
                    ))}
                  </Flex>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="pink"
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
