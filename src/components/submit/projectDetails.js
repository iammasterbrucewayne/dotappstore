import { Input, Heading, Text, Flex, Textarea, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function ProjectDetails({
  projectDetails,
  setProjectDetails,
  setSubmitStage,
}) {
  const [projectName, setProjectName] = useState(
    projectDetails.projectName ? projectDetails.projectName : ""
  );
  const [tagline, setTagline] = useState(
    projectDetails.tagline ? projectDetails.tagline : ""
  );
  const [website, setWebsite] = useState(
    projectDetails.website ? projectDetails.website : ""
  );
  const [description, setDescription] = useState(
    projectDetails.description ? projectDetails.description : ""
  );

  const handleProjectChange = (event) => {
    setProjectName(event.target.value);
  };
  const handleTaglineChange = (event) => {
    setTagline(event.target.value);
  };
  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <>
      <Heading>Submit a Polkadot project</Heading>
      <Text fontSize={"2xl"}>
        Found a Polkadot project you want everyone to know about? Made one for
        yourself and want to share it to the community? You&apos;re in the right
        place
      </Text>
      <Flex flexDir={"column"} gap={"20px"} marginTop={"50px"} width={"full"}>
        <Flex flexDir={"column"}>
          <Flex justify={"space-between"}>
            <Text fontSize={"2xl"}>Project</Text>
            <Text>{projectName.length} / 40</Text>
          </Flex>
          <Input
            placeholder="0xTest"
            width={"full"}
            value={projectName}
            onChange={handleProjectChange}
            maxLength={40}
          />
        </Flex>
        <Flex flexDir={"column"}>
          <Flex justify={"space-between"}>
            <Text fontSize={"2xl"}>Tagline</Text>
            <Text> {tagline.length} / 260</Text>
          </Flex>
          <Textarea
            height={"100px"}
            placeholder="A test Project"
            width={"full"}
            value={tagline}
            onChange={handleTaglineChange}
            flexWrap={"wrap"}
            maxLength={260}
          />
        </Flex>
        <Flex flexDir={"column"}>
          <Text fontSize={"2xl"}>Website Link</Text>
          <Input
            placeholder="test.com"
            width={"full"}
            value={website}
            onChange={handleWebsiteChange}
          />
        </Flex>
        <Flex flexDir={"column"}>
          <Flex justify={"space-between"}>
            <Text fontSize={"2xl"}>Description</Text>
            <Text>{description.length} / 400</Text>
          </Flex>
          <Textarea
            height={"100px"}
            placeholder="Test Description"
            width={"full"}
            value={description}
            onChange={handleDescriptionChange}
            flexWrap={"wrap"}
            maxLength={400}
          />
        </Flex>
      </Flex>
      <Button
        variant="outline"
        colorScheme="black"
        boxShadow="4px 4px 0 black"
        transform="scale(1)"
        marginTop={4}
        _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
        isExternal
        isDisabled={
          projectName.length == 0 ||
          tagline.length == 0 ||
          website.length == 0 ||
          description.length == 0
        }
        onClick={() => {
          setProjectDetails({
            projectName: projectName,
            tagline: tagline,
            website: website,
            description: description,
          });
          setSubmitStage(1);
        }}
      >
        Next Step: Images and Media
      </Button>
    </>
  );
}
