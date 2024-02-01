import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  VStack,
  Text,
  Heading,
  Flex,
  Button,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";
import ProjectDetails from "./projectDetails";
import ProjectImages from "./projectImages";
import ProjectCategory from "./projectCategory";
import ProjectSocials from "./projectSocials";
import { useRouter } from "next/navigation";
import { upload } from "@/lib/utils";

export default function Page({
  projectInfo,
  newProjectInfo,
  setNewProjectInfo,
}) {
  const { data: session, status } = useSession();
  const [screenshotPreviews, setScreenshotPreviews] = useState(
    projectInfo?.screenshots
  );
  const [logo, setLogo] = useState(projectInfo?.logo);
  const [screenshots, setScreenshots] = useState(projectInfo?.screenshots);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState(projectInfo?.logo);
  const [submitStage, setSubmitStage] = useState(0);
  const [initLoad, setInitLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (projectInfo) {
      if (initLoad) {
        setLogoPreviewUrl(projectInfo?.logo);
        setScreenshotPreviews(projectInfo?.screenshots);
        setScreenshots(projectInfo?.screenshots);
        setLogo(projectInfo?.logo);
        setInitLoad(false);
      }
    }
  }, [projectInfo]);

  const pushProject = async () => {
    try {
      const logoUrl =
        typeof logo != "string" ? await upload(logo) : newProjectInfo?.logo;
      const uploadedScreenshots = await Promise.all(
        screenshots.map(async (screenshot) =>
          typeof screenshot != "string" ? await upload(screenshot) : screenshot
        )
      );

      newProjectInfo.logo = logoUrl;
      newProjectInfo.screenshots = uploadedScreenshots;

      const response = await fetch("/api/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProjectInfo),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      router.push(`/project/${newProjectInfo.id}`);
    } catch (error) {
      alert("Failed to edit project");
    }
  };

  const renderStage = () => {
    switch (submitStage) {
      case 0:
        return (
          <ProjectDetails
            projectInfo={newProjectInfo}
            setProjectInfo={setNewProjectInfo}
            setSubmitStage={setSubmitStage}
          />
        );
      case 1:
        return (
          <ProjectImages
            logo={logo}
            setLogo={setLogo}
            screenshots={screenshots}
            setScreenshots={setScreenshots}
            screenshotPreviews={screenshotPreviews}
            setScreenshotPreviews={setScreenshotPreviews}
            logoPreviewUrl={logoPreviewUrl}
            setLogoPreviewUrl={setLogoPreviewUrl}
            setSubmitStage={setSubmitStage}
          />
        );
      case 2:
        return (
          <ProjectCategory
            projectInfo={newProjectInfo}
            setProjectInfo={setNewProjectInfo}
            setSubmitStage={setSubmitStage}
          />
        );
      case 3:
        return (
          <ProjectSocials
            projectInfo={newProjectInfo}
            pushProject={pushProject}
            setProjectInfo={setNewProjectInfo}
            setSubmitStage={setSubmitStage}
          />
        );
      default:
        return null;
    }
  };

  return status === "loading" || projectInfo === null ? (
    <VStack justify="center" h="70vh">
      <Spinner size="xl" />
    </VStack>
  ) : projectInfo === undefined ? (
    <VStack maxW="2xl" px={8} mx="auto" mt={12} textAlign="center">
      <Heading fontWeight="black" fontSize="6xl">
        Uh oh! Project Not Found...
      </Heading>
      <Text fontSize="xl" mb={8}>
        We couldn&apos;t find the project you&apos;re looking for... <br />
        Think we&apos;re missing a project? Submit it below.
      </Text>
      {session ? (
        <Button
          as={Link}
          href="/submit"
          variant="solid"
          colorScheme="pink"
          transform="scale(1)"
          py={8}
          px={12}
          _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
        >
          Submit a project
        </Button>
      ) : (
        <Button
          onClick={() => signIn()}
          variant="solid"
          colorScheme="pink"
          transform="scale(1)"
          py={8}
          px={12}
          _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
        >
          Submit a project
        </Button>
      )}
    </VStack>
  ) : (
    <>
      {session?.user?.username.toLowerCase() === projectInfo?.twitterID ? (
        <VStack p={8} mx="auto" maxW="6xl">
          {renderStage()}
        </VStack>
      ) : (
        <VStack p={8} mx="auto" maxW="lg" textAlign="center">
          <Heading fontWeight="black">
            Claim {projectInfo?.appname} Project
          </Heading>

          {session && (
            <Text>
              Looks like you&apos;re trying to login as{" "}
              <b>
                {session?.user?.username ||
                  session?.user?.email ||
                  `${session?.user?.name.slice(
                    0,
                    4
                  )}...${session?.user?.name.slice(-4)}`}
              </b>
            </Text>
          )}
          <Text mb={6}>
            You need to login through twitter with the account{" "}
            <b>@{projectInfo?.twitterID}</b> to prove you&apos;re the owner
          </Text>

          {session ? (
            <Button
              colorScheme="pink"
              onClick={async () => {
                await signOut();
                await signIn();
              }}
              py={6}
            >
              Sign Out and Login with Twitter
            </Button>
          ) : (
            <Button
              colorScheme="pink"
              onClick={async () => {
                await signIn();
              }}
              py={6}
            >
              Login with Twitter
            </Button>
          )}
        </VStack>
      )}
    </>
  );
}
