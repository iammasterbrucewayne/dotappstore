import { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  Heading,
  Divider,
  MenuItem,
  Flex,
  Input,
  Tag,
  TagCloseButton,
  Text,
  Button,
  FormControl,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

export default function ProjectCategory({
  projectInfo,
  setProjectInfo,
  setSubmitStage,
}) {
  const predefinedTags = [
    "Infrastructure",
    "Governance",
    "Forum",
    "Real World Assets",
    "Wallet",
    "Prediction Markets",
    "Automation",
    "Developer Tools",
    "B2B",
    "Legal",
    "Decentralized Cloud Computation",
    "Media",
    "NFT",
    "Content",
    "Education",
    "Explorer",
    "DeFi",
    "Yield Farming",
    "Staking",
    "Economy of Things",
  ];
  const [inputValue, setInputValue] = useState("");
  const [filteredTags, setFilteredTags] = useState(predefinedTags);

  useEffect(() => {
    const filtered = predefinedTags.filter(
      (tag) =>
        tag.toLowerCase().startsWith(inputValue.toLowerCase()) &&
        !projectInfo.tags.includes(tag)
    );
    setFilteredTags(filtered);
  }, [inputValue, projectInfo.tags]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectTag = (tag) => {
    if (projectInfo.tags.length < 3) {
      setProjectInfo({ ...projectInfo, tags: [...projectInfo.tags, tag] });
      setInputValue("");
    } else {
      alert("You can only select up to 3 categories.");
      setInputValue("");
    }
  };

  const handleRemoveTag = (tag) => {
    setProjectInfo({
      ...projectInfo,
      tags: projectInfo.tags.filter((t) => t !== tag),
    });
  };

  return (
    <Flex flexDir="column" width={"full"}>
      <Heading fontWeight="black">Category</Heading>
      <Text fontSize={"lg"}>Select upto 3 categories</Text>
      <FormControl>
        <Input
          mt={4}
          width={"full"}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Defi, Infrastructure, NFT, ..."
        />
      </FormControl>
      <Flex mt={4}>
        {projectInfo.tags.map((tag, index) => (
          <Tag
            key={index}
            m={1}
            colorScheme="pink"
          >
            {tag}
            <TagCloseButton onClick={() => handleRemoveTag(tag)} />
          </Tag>
        ))}
      </Flex>
      <Menu
        isOpen={inputValue.length > 0 && filteredTags.length > 0}
        closeOnSelect={false}
      >
        <MenuButton />
        <MenuList>
          {filteredTags.map((tag, index) => (
            <MenuItem key={index} onClick={() => handleSelectTag(tag)}>
              {tag}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Divider mt={12} borderWidth={"thin"} />
      <Heading mt={12} fontWeight="black">
        Project Status
      </Heading>
      <Text fontSize={"lg"} mt={2}>
        How far along is your project?
      </Text>
      <Flex w={"full"} flexDir={"column"} gap={4} mt={4}>
        <Button
          variant={"outline"}
          colorScheme={projectInfo?.status === "Live" ? "pink" : "gray"}
          leftIcon={projectInfo?.status === "Live" && <CheckIcon />}
          py={6}
          onClick={() => {
            setProjectInfo({ ...projectInfo, status: "Live" });
          }}
        >
          Live on Mainnet, Devnet or Testnet
        </Button>
        <Button
          variant={"outline"}
          colorScheme={projectInfo?.status == "Building" ? "pink" : "gray"}
          leftIcon={projectInfo?.status === "Building" && <CheckIcon />}
          py={6}
          onClick={() => {
            setProjectInfo({ ...projectInfo, status: "Building" });
          }}
        >
          Currently Building
        </Button>
      </Flex>
      <Flex flexDir={"row"} justify={"space-between"} marginTop={8}>
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
          onClick={() => {
            setSubmitStage(1);
          }}
        >
          Go back
        </Button>
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
          isDisabled={projectInfo.tags.length < 1 || !projectInfo?.status}
          onClick={() => {
            setSubmitStage(3);
          }}
        >
          Next Step: Socials
        </Button>
      </Flex>
    </Flex>
  );
}
