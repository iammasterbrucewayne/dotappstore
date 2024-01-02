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
} from "@chakra-ui/react";

export default function ProjectCategory({
  projectCategories,
  setProjectCategories,
  status,
  setStatus,
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
        !projectCategories.includes(tag)
    );
    setFilteredTags(filtered);
  }, [inputValue, projectCategories]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectTag = (tag) => {
    if (projectCategories.length < 3) {
      setProjectCategories([...projectCategories, tag]);
      setInputValue("");
    } else {
      alert("You can only select up to 3 categories.");
      setInputValue("");
    }
  };

  const handleRemoveTag = (tag) => {
    setProjectCategories(projectCategories.filter((t) => t !== tag));
  };

  return (
    <Flex flexDir="column" width={"full"}>
      <Heading>Category</Heading>
      <Text fontSize={"xl"}>Select upto 3 categories</Text>
      <Input
        mt={4}
        width={"full"}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Defi, Infrastructure, NFT, ..."
      />
      <Flex mt={2}>
        {projectCategories.map((tag, index) => (
          <Tag
            key={index}
            m={1}
            variant={"outline"}
            colorScheme="pink"
            size={"lg"}
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
      <Heading mt={12}>Project Status</Heading>
      <Text fontSize={"xl"} mt={2}>
        How far along is your project?
      </Text>
      <Flex w={"full"} flexDir={"column"} gap={4} mt={4}>
        <Button
          variant={"outline"}
          colorScheme={status == "Live" ? "pink" : "black"}
          onClick={() => {
            setStatus("Live");
          }}
        >
          Live on Mainnet, Devnet or Testnet
        </Button>
        <Button
          variant={"outline"}
          colorScheme={status == "Building" ? "pink" : "black"}
          onClick={() => {
            setStatus("Building");
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
          _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
          isExternal
          isDisabled={projectCategories.length < 1 || !status}
          onClick={() => {
            setSubmitStage(3);
          }}
        >
          Next Step: Category
        </Button>
      </Flex>
    </Flex>
  );
}
