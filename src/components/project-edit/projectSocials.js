import { sanitizeTwitterUsername } from "@/lib/utils";
import {
  Flex,
  Spinner,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ProjectSocials({
  projectInfo,
  setProjectInfo,
  pushProject,
  setSubmitStage,
}) {
  const [loading, setLoading] = useState(false);
  const [twitterInput, setTwitterInput] = useState("");

  const handleTwitterChange = (event) => {
    const { value } = event.target;
    setTwitterInput(value);
    setProjectInfo({
      ...projectInfo,
      twitterID: sanitizeTwitterUsername(value),
    });
  };

  const handleDiscordChange = (event) => {
    setProjectInfo({ ...projectInfo, discord: event.target.value });
  };

  const handleTelegramChange = (event) => {
    setProjectInfo({ ...projectInfo, telegram: event.target.value });
  };

  return (
    <VStack maxW="6xl" w="full" align="start" gap={6}>
      <Heading fontWeight="black">Socials</Heading>
      <FormControl>
        <FormLabel>
          <HStack justifyContent="space-between">
            <Text>Twitter</Text>
            <Text fontWeight="normal" color="gray.500"></Text>
          </HStack>
        </FormLabel>
        <Input
          placeholder="Project Username"
          width={"full"}
          value={twitterInput}
          onChange={handleTwitterChange}
          maxLength={40}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack justifyContent="space-between">
            <Text>Discord</Text>
            <Text fontWeight="normal" color="gray.500">
              Optional
            </Text>
          </HStack>
        </FormLabel>
        <Input
          placeholder="https://discord.gg/project"
          width={"full"}
          value={projectInfo?.discord}
          onChange={handleDiscordChange}
          maxLength={40}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack justifyContent="space-between">
            <Text>Telegram</Text>
            <Text fontWeight="normal" color="gray.500">
              Optional
            </Text>
          </HStack>
        </FormLabel>
        <Input
          placeholder="https://t.me/project"
          width={"full"}
          value={projectInfo?.telegram}
          onChange={handleTelegramChange}
          maxLength={40}
        />
      </FormControl>

      <HStack w="full" justify="space-between">
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
          isDisabled={loading}
          onClick={() => {
            setSubmitStage(2);
          }}
        >
          Go back
        </Button>
        <Button
          variant="outline"
          colorScheme="black"
          boxShadow="4px 4px 0 black"
          leftIcon={loading ? <Spinner /> : null}
          transform="scale(1)"
          marginTop={4}
          px={8}
          py={6}
          _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
          isExternal
          isDisabled={!projectInfo?.twitterID || loading}
          onClick={async () => {
            setLoading(true);
            await pushProject();
            setLoading(false);
          }}
        >
          Submit Project
        </Button>
      </HStack>
    </VStack>
  );
}
