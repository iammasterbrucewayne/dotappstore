import {
  Heading,
  Text,
  Box,
  IconButton,
  Flex,
  Input,
  Button,
  GridItem,
  Grid,
  Image,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { CiImageOn } from "react-icons/ci";
import { useRef } from "react";

export default function ProjectImages({
  logo,
  setLogo,
  screenshots,
  setScreenshots,
  screenshotPreviews,
  setScreenshotPreviews,
  setSubmitStage,
  logoPreviewUrl,
  setLogoPreviewUrl,
}) {
  const logoInputRef = useRef();
  const screenshotInputRef = useRef(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5242880) {
        alert("File size should not exceed 5MB.");
        return;
      }
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width > 160 || img.height > 160) {
          alert("Image dimensions should be 160x160 pixels or less.");
        } else {
          setLogo(file);
          setLogoPreviewUrl(URL.createObjectURL(file));
        }
      };
    }
  };

  const handleLogoClick = () => {
    logoInputRef.current.click();
  };

  const handleScreenshotsChange = (e) => {
    const newFiles = Array.from(e.target.files);

    if (screenshots?.length + newFiles.length > 5) {
      alert("You can only upload up to 5 screenshots.");
      return;
    }

    for (let file of newFiles) {
      if (file.size > 5242880) {
        alert("Each file must be under 5 MB.");
        e.target.value = ""; // Reset file input
        return;
      }
    }

    const newFileObjects = [...screenshots, ...newFiles];
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setScreenshots(newFileObjects);
    setScreenshotPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

    e.target.value = "";
  };

  const handleScreenshotClick = () => {
    screenshotInputRef.current.click();
  };

  return (
    <VStack maxW={"6xl"} alignItems={"start"} gap={12} w="full">
      <Flex flexDir={"column"}>
        <Heading fontWeight="black">Thumbnail</Heading>
        <Text fontSize={"lg"}>
          Let&apos;s make sure people can find your project easily
        </Text>
        <Flex flexDir={"column"} gap={"20px"} marginTop={8} width={"full"}>
          <Grid templateColumns="auto 1fr" columnGap={8} rowGap={4}>
            <GridItem colSpan={1} rowSpan={2}>
              <Box
                position="relative"
                p="1"
                border="3px dotted"
                borderRadius="md"
                borderColor={"#d1d2d5"}
                h="80px"
                w="80px"
                overflow="visible"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {logo ? (
                  <>
                    <Image
                      src={logoPreviewUrl}
                      alt="Uploaded Logo"
                      maxH="60px"
                      maxW="60px"
                      objectFit="cover"
                    />
                    <IconButton
                      aria-label="Close"
                      icon={<CloseIcon />}
                      size="xs"
                      variant="ghost"
                      position="absolute"
                      top="0"
                      right="0"
                      transform="translate(50%, -50%)"
                      backgroundColor="white"
                      borderRadius="full"
                      border="2px solid"
                      borderColor="gray.200"
                      _hover={{
                        bg: "transparent",
                        transform: "scale(1.05) translate(50%, -50%)",
                      }}
                      _active={{ bg: "transparent" }}
                      onClick={() => {
                        setLogoPreviewUrl();
                        setLogo();
                      }}
                    />
                  </>
                ) : (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    h="100%"
                    w="100%"
                  >
                    <CiImageOn size="3em" opacity={"20%"} />
                  </Flex>
                )}
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                style={{ display: "none" }}
                ref={logoInputRef}
              />
              <Button
                onClick={handleLogoClick}
                variant="outline"
                colorScheme="pink"
              >
                Upload Image
              </Button>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>
                Image file must be max 160x160px / at an aspect ratio of ~1:1,
                max 5MB.
              </Text>
            </GridItem>
          </Grid>
        </Flex>
      </Flex>
      <VStack w="full" align="start">
        <Heading fontWeight="black">Screenshots</Heading>
        <Text fontSize={"lg"}>
          We recommend atleast 3 screenshots of your project
        </Text>
        <Box
          position="relative"
          mt={6}
          p="1"
          border="3px dotted"
          borderRadius="md"
          borderColor={"#d1d2d5"}
          h="lg"
          w="full"
          overflow="visible"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Flex flexDir={"column"} alignItems={"center"} gap={"10px"}>
            <CiImageOn size="6em" opacity={"20%"} />
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleScreenshotsChange}
              style={{ display: "none" }}
              ref={screenshotInputRef}
            />
            <Button
              variant="link"
              onClick={handleScreenshotClick}
              colorScheme="pink"
              size={"lg"}
            >
              Browse for files
            </Button>
            <Text w={"lg"} textAlign={"center"}>
              Upload atleast one image. 1270x760px or higher recommended, max.
              5MB each. The first image will be used as preview.
            </Text>
          </Flex>
        </Box>
        <Flex flexDir={"row"} gap={4} marginTop={4}>
          {screenshotPreviews?.map((url, index) => (
            <Box
              key={index}
              position="relative"
              p="1"
              border="3px dotted"
              borderRadius="md"
              borderColor={"#d1d2d5"}
              h={24}
              w={24}
              overflow="visible"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <>
                <Image
                  src={url}
                  alt="Uploaded Logo"
                  maxH={20}
                  maxW={20}
                  objectFit="cover"
                />
                <IconButton
                  aria-label="Close"
                  icon={<CloseIcon />}
                  size="xs"
                  variant="ghost"
                  position="absolute"
                  top="0"
                  right="0"
                  transform="translate(50%, -50%)"
                  backgroundColor="white"
                  borderRadius="full"
                  border="2px solid"
                  borderColor="gray.200"
                  _hover={{
                    bg: "transparent",
                    transform: "scale(1.05) translate(50%, -50%)",
                  }}
                  _active={{ bg: "transparent" }}
                  onClick={() => {
                    setScreenshots((files) =>
                      files.filter((_, i) => i !== index)
                    );
                    setScreenshotPreviews((previews) =>
                      previews.filter((_, i) => i !== index)
                    );
                  }}
                />
              </>
            </Box>
          ))}
        </Flex>
        <HStack justify="space-between" w="full">
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
              setSubmitStage(0);
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
            isDisabled={!logo || screenshots?.length < 1}
            onClick={() => {
              setSubmitStage(2);
            }}
          >
            Next Step: Category
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
