import { Stack, StackDivider, TabPanel, Text } from "@chakra-ui/react";
import ProjectItem from "./project-item";
import _ from "lodash";

export default function ProjectList({ category, projects }) {
  const displayAll = category === "All";
  const filteredProjects = displayAll
    ? projects
    : _.filter(projects, (project) => _.includes(project.tags, category));
  return (
    <TabPanel>
      <Text fontSize="sm" color="gray.600" mb={6}>
        {_.size(filteredProjects)} projects filtered by "{category}"
      </Text>
      <Stack
        border="1px"
        bg="blackAlpha.900"
        color={"white"}
        rounded={32}
        overflow="hidden"
        spacing={0}
        divider={<StackDivider borderColor="gray.700" />}
      >
        {_?.map(filteredProjects, (_content, index) => (
          <ProjectItem {..._content} key={index} />
        ))}
      </Stack>
    </TabPanel>
  );
}
