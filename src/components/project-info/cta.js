import {
  Button,
  VStack,
  Link,
  Text,
  Icon,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  IoCaretUp,
  IoFlagOutline,
  IoShieldCheckmarkOutline,
  IoCheckmarkSharp,
  IoCloseSharp,
} from "react-icons/io5";
import { useProjects } from "@/lib/store/useProjects";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const fetchUserVotes = async (projectID, userID, setHasUpvoted) => {
  try {
    const response = await fetch("/api/get-votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectID, userID }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      setHasUpvoted(data.hasUpvoted);
    } else {
      console.error(data.message);
      if (response.status === 404) {
        alert("An error occurred while upvoting. Please try again.");
      } else {
        alert("An error occurred while upvoting. Please try again.");
      }
    }
  } catch (error) {
    console.error("Error while upvoting:", error);
    alert("An unexpected error occurred. Please try again.");
  }
};

const upvote = async ({ projectID, userID }) => {
  try {
    const response = await fetch("/api/upvote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectID, userID }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
    } else {
      console.error(data.message);
      if (response.status === 404) {
        alert("An error occurred while upvoting. Please try again.");
      } else {
        alert("An error occurred while upvoting. Please try again.");
      }
    }
  } catch (error) {
    console.error("Error while upvoting:", error);
    alert("An unexpected error occurred. Please try again.");
  }
};

const downvote = async ({ projectID, userID }) => {
  try {
    const response = await fetch("/api/downvote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectID, userID }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
    } else {
      console.error(data.message);
      if (response.status === 404) {
        alert("An error occurred while downvoting. Please try again.");
      } else {
        alert("An error occurred while downvoting. Please try again.");
      }
    }
  } catch (error) {
    console.error("Error while downvoting:", error);
    alert("An unexpected error occurred. Please try again.");
  }
};

const CTA = ({ url, id, upvotes }) => {
  const { data: session } = useSession();
  const { projects, setProjects } = useProjects();
  const [hasUpvoted, setHasUpvoted] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      console.log(session);
      (async () => {
        await fetchUserVotes(id, session.user.id, setHasUpvoted);
      })();
    }
  }, [session, id]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/get-projects");
      const projectsFromApi = await response.json();
      setProjects(projectsFromApi);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
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
          ) : (
            <IoCaretUp color="white" />
          )
        }
        variant={isHovering ? "outline" : "solid"}
        rightIcon={<Text>{upvotes}</Text>}
        transform="scale(1)"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        isDisabled={hasUpvoted == null || isLoading}
        _hover={{ transform: "scale(1.03)", variant: "outline" }}
        onClick={async () => {
          if (hasUpvoted) {
            setIsLoading(true);
            await downvote({ projectID: id, userID: session.user.id });
            await fetchProjects(id, session.user.id);
            await fetchUserVotes(id, session.user.id, setHasUpvoted);
            setIsLoading(false);
          } else {
            setIsLoading(true);
            await upvote({ projectID: id, userID: session.user.id });
            await fetchProjects(id, session.user.id);
            await fetchUserVotes(id, session.user.id, setHasUpvoted);
            setIsLoading(false);
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
        <Button
          as={Link}
          href="#"
          color="pink.600"
          fontWeight="normal"
          bg="none"
          p={0}
          leftIcon={<Icon as={IoShieldCheckmarkOutline} />}
          _hover={{ textDecoration: "none", color: "pink.400" }}
          isDisabled
        >
          Claim Project
          <Text pl={1} as="span" fontSize="xs">
            {"(soon)"}
          </Text>
        </Button>
        <Button
          as={Link}
          href="#"
          color="pink.600"
          fontWeight="normal"
          bg="none"
          p={0}
          leftIcon={<Icon as={IoFlagOutline} />}
          _hover={{ textDecoration: "none", color: "pink.400" }}
        >
          Report Project
        </Button>
      </ButtonGroup>
    </VStack>
  );
};

export default CTA;
