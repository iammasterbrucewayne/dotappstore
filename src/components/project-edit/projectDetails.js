import {
  Input,
  Heading,
  Text,
  Flex,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  HStack,
  VStack,
} from "@chakra-ui/react";
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
    <VStack w="full" align="start" gap={6}>
      <Heading fontWeight="black">Edit your Polkadot project</Heading>
      <FormControl>
        <FormLabel>
          <HStack justifyContent="space-between">
            <Text>Project</Text>
            <Text fontWeight="normal" color="gray.500">
              {projectName.length} / 40
            </Text>
          </HStack>
        </FormLabel>
        <Input
          placeholder="0xTest"
          width={"full"}
          value={projectName}
          onChange={handleProjectChange}
          maxLength={40}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack justifyContent="space-between">
            <Text>Tagline</Text>
            <Text fontWeight="normal" color="gray.500">
              {tagline.length} / 260
            </Text>
          </HStack>
        </FormLabel>
        <Textarea
          height={"100px"}
          placeholder="A test Project"
          width={"full"}
          value={tagline}
          onChange={handleTaglineChange}
          flexWrap={"wrap"}
          maxLength={260}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Website Link</FormLabel>
        <Input
          placeholder="test.com"
          width={"full"}
          value={website}
          onChange={handleWebsiteChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack justifyContent="space-between">
            <Text>Description</Text>
            <Text fontWeight="normal" color="gray.500">
              {description.length} / 400
            </Text>
          </HStack>
        </FormLabel>
        <Textarea
          height={"100px"}
          placeholder="Test Description"
          width={"full"}
          value={description}
          onChange={handleDescriptionChange}
          flexWrap={"wrap"}
          maxLength={400}
        />
      </FormControl>

      <Button
        variant="outline"
        alignSelf={"flex-start"}
        colorScheme="black"
        boxShadow="4px 4px 0 black"
        transform="scale(1)"
        marginTop={4}
        px={8}
        py={6}
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
    </VStack>
  );
}
