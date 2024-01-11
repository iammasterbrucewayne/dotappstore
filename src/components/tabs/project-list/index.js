import { Stack, StackDivider, TabPanel } from "@chakra-ui/react";
import ProjectItem from "./project-item";
import _ from "lodash";

export default function ProjectList({ category, projects }) {
  const displayAll = category === "All";

  // Initial filtering based on category
  const filteredProjects = displayAll
    ? projects
    : _.filter(projects, (project) => _.includes(project.tags, category));

  // Sorting the filtered projects by 'upvotes' in descending order
  const sortedProjects = _.orderBy(filteredProjects, ["upvotes"], ["desc"]);

  return (
    <TabPanel>
      <Stack
        border="1px"
        bg="blackAlpha.900"
        color={"white"}
        rounded={32}
        overflow="hidden"
        spacing={0}
        divider={<StackDivider borderColor="gray.700" />}
      >
        {_.map(sortedProjects, (_content, index) => (
          <ProjectItem {..._content} key={index} />
        ))}
      </Stack>
    </TabPanel>
  );
}
