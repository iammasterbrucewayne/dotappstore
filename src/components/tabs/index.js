import {
  HStack,
  Skeleton,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { map, isEmpty, times } from "lodash";
import { useEffect, useState } from "react";
import { useProjects } from "@/lib/store/useProjects";
import { FeaturedPanel, FeaturedTab } from "./featured";
import ProjectList from "./project-list";

const tabs = [
  { name: "All", category: "All" },
  { name: "Wallets", category: "Wallet" },
  { name: "NFTs", category: "NFT" },
  { name: "Explorers", category: "Explorer" },
];

const LoadingSkeleton = () => (
  <VStack alignItems="start">
    <HStack>
      {times(4, (index) => (
        <Skeleton
          key={index}
          startColor="pink.100"
          endColor="pink.300"
          mt={8}
          h={8}
          w={16}
          rounded="full"
        />
      ))}
    </HStack>
    <HStack maxW="6xl" mt={8} spacing={8} wrap="wrap">
      {times(4, (index) => (
        <Skeleton
          key={index}
          startColor="pink.100"
          endColor="pink.300"
          h={[36, 48]}
          w={[250, 300, 320, 450]}
          rounded="3xl"
        />
      ))}
    </HStack>
  </VStack>
);

export default function TabsComponent() {
  const { projects, setProjects } = useProjects();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch("/api/get-projects");
        const projects = await response.json();
        setProjects(projects);
        setIsLoading(false);
      } catch (error) {
        alert("Failed to fetch projects:", error);
      }
    };
    if (isEmpty(projects)) {
      getProjects();
    } else {
      setIsLoading(false);
    }
  }, [projects, setProjects]);

  return isLoading ? (
    <LoadingSkeleton />
  ) : (
    <Tabs variant="soft-rounded" colorScheme="pink" mt={8}>
      <TabList overflow="scroll" p={1}>
        <FeaturedTab />
        {map(tabs, (tab, index) => (
          <Tab key={index}>{tab.name}</Tab>
        ))}
      </TabList>
      <TabPanels pt={6}>
        <FeaturedPanel projects={projects} />
        {map(tabs, (tab, index) => (
          <ProjectList key={index} projects={projects} {...tab} />
        ))}
      </TabPanels>
    </Tabs>
  );
}
