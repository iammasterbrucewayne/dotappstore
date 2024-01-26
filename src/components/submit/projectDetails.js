import {
  Input,
  Heading,
  Text,
  Flex,
  Textarea,
  Button,
  VStack,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
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
    <VStack maxW={"6xl"} mx="auto" px={8} align="start" gap={6}>
      <VStack align="start" w="full" mt={8}>
        <Heading fontWeight="black">Submit a Polkadot project</Heading>
        <Text fontSize={"lg"} maxW="5xl">
          Found a Polkadot project you want everyone to know about? Made one for
          yourself and want to share it to the community? You&apos;re in the
          right place
        </Text>
      </VStack>

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
        colorScheme="black"
        boxShadow="4px 4px 0 black"
        transform="scale(1)"
        marginTop={4}
        px={8}
        py={6}
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
    </VStack>
  );
}
