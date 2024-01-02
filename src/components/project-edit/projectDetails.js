import { Input, Heading, Text, Flex, Textarea, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function ProjectDetails({
  projectInfo,
  setProjectInfo,
  setSubmitStage,
}) {
  const [projectName, setProjectName] = useState(
    projectInfo?.appname ? projectInfo?.appname : ""
  );
  const [tagline, setTagline] = useState(
    projectInfo?.tagline ? projectInfo?.tagline : ""
  );
  const [website, setWebsite] = useState(
    projectInfo?.url ? projectInfo?.url : ""
  );
  const [description, setDescription] = useState(
    projectInfo?.appdescription ? projectInfo?.appdescription : ""
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
      <Heading>Edit your Polkadot project</Heading>
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
        alignSelf={"flex-start"}
        colorScheme="black"
        boxShadow="4px 4px 0 black"
        transform="scale(1)"
        marginTop={4}
        _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
        isDisabled={
          projectName.length == 0 ||
          tagline.length == 0 ||
          website.length == 0 ||
          description.length == 0
        }
        onClick={() => {
          setProjectInfo((prevProjectInfo) => ({
            ...prevProjectInfo,
            appname: projectName,
            tagline: tagline,
            url: website,
            appdescription: description,
          }));
          setSubmitStage(1);
        }}
      >
        Next Step: Images and Media
      </Button>
    </>
  );
}
