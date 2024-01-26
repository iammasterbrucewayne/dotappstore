import ProjectLogo from "@/components/common/project-logo";
import {
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Link,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import _ from "lodash";

export default function ProjectItem({
  id,
  logo,
  appname,
  appdescription,
  url,
  tags,
}) {
  return (
    <Grid
      as={Link}
      href={`/project/${id}`}
      p={8}
      cursor="pointer"
      _hover={{ bg: "whiteAlpha.200", textDecoration: "none" }}
      align="start"
      templateColumns={[
        "repeat(3, 1fr)",
        "repeat(5, 1fr)",
        "repeat(5, 1fr)",
        "repeat(10, 1fr)",
      ]}
      gap={4}
    >
      <GridItem colSpan={1}>
        <ProjectLogo logo={logo} />
      </GridItem>
      <Stack as={GridItem} w="100%" colSpan={[2, 4, 4, 8]}>
        <Grid templateRows="repeat(4, 1fr)" h="full">
          <Stack as={GridItem} rowSpan={3}>
            <Heading size="md">{appname}</Heading>
            <Text
              as={GridItem}
              w="100%"
              rowSpan={2}
              fontWeight="regular"
              fontSize={["xs", "sm", "md"]}
              noOfLines={2}
            >
              {appdescription}
            </Text>
          </Stack>
          {/* <HStack mt={2} as={GridItem} w="100%" rowSpan={1}>
						{_?.map(tags, (tag) => (
							<Tag colorScheme="blackAlpha">{tag}</Tag>
						))}
					</HStack> */}
        </Grid>
      </Stack>
    </Grid>
  );
}
