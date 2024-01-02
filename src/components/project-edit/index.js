import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { VStack, Text, Heading, Flex, Button } from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";
import ProjectDetails from "./projectDetails";
import ProjectImages from "./projectImages";
import ProjectCategory from "./projectCategory";
import ProjectSocials from "./projectSocials";
import { useRouter } from "next/navigation";
import { upload } from "@/lib/utils";

export default function Page({ projectInfo, setProjectInfo }) {
  const { data: session } = useSession();
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
        typeof logo != "string" ? await upload(logo) : projectInfo?.logo;
      const uploadedScreenshots = await Promise.all(
        screenshots.map(async (screenshot) =>
          typeof screenshot != "string" ? await upload(screenshot) : screenshot
        )
      );

      projectInfo.logo = logoUrl;
      projectInfo.screenshots = uploadedScreenshots;

      const response = await fetch("/api/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectInfo),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      router.push(`/project/${projectInfo.id}`);
    } catch (error) {
      alert("Failed to edit project");
    }
  };

  const renderStage = () => {
    switch (submitStage) {
      case 0:
        return (
          <ProjectDetails
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
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
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
            setSubmitStage={setSubmitStage}
          />
        );
      case 3:
        return (
          <ProjectSocials
            projectInfo={projectInfo}
            pushProject={pushProject}
            setProjectInfo={setProjectInfo}
            setSubmitStage={setSubmitStage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {session?.user?.username.toLowerCase() == projectInfo?.twitterID ? (
        <VStack p={8} mx="auto" maxW="6xl">
          {renderStage()}
        </VStack>
      ) : (
        <VStack p={8} mx="auto" maxW="6xl">
          <Heading>Claim {projectInfo?.appname} Project</Heading>
          <Flex flexDir={"column"} gap={6}>
            {session ? (
              <Text>
                Looks like you&apos;re trying to login as
                {session?.user?.username ||
                  session?.user?.email ||
                  `${session?.user?.name.slice(
                    0,
                    4
                  )}...${session?.user?.name.slice(-4)}`}
              </Text>
            ) : (
              ""
            )}
            <Text>
              You need to login through twitter with the account @
              {projectInfo?.twitterID} to prove you&apos;re the owner
            </Text>
            {session ? (
              <Button
                colorScheme="pink"
                onClick={async () => {
                  await signOut();
                  await signIn();
                }}
              >
                Sign Out and Login with Twitter
              </Button>
            ) : (
              <Button
                colorScheme="pink"
                onClick={async () => {
                  await signIn();
                }}
              >
                Login with Twitter
              </Button>
            )}
          </Flex>
        </VStack>
      )}
    </>
  );
}
