import ContextWrapper from "@/components/common/context-wrapper";
import Navbar from "@/components/common/navbar";
import { useRouter } from "next/router";
import Disclaimer from "../../../components/project-info/disclaimer";
import { useProjects } from "@/lib/store/useProjects";
import { find, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import ProjectInfo from "../../../components/project-info";
import AuthProvider from "@/components/common/auth-provider";

export default function Page() {
  const router = useRouter();
  const projectId = router.query.id;

  const { projects, setProjects } = useProjects();
  const [projectInfo, setProjectInfo] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoaded(false);
        const response = await fetch("/api/get-projects");
        const projectsFromApi = await response.json();
        setProjects(projectsFromApi);
      } catch (error) {
        alert("Failed to fetch projects:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    if (isEmpty(projects)) {
      fetchProjects();
    } else {
      const project = find(projects, { id: projectId });
      setProjectInfo(project);
    }
  }, [projects, projectId, setProjects]);

  return (
    <AuthProvider>
      <ContextWrapper>
        <Navbar />
        <VStack p={8} mx="auto" maxW="6xl">
          <Disclaimer />
          projectInfo && <ProjectInfo {...projectInfo} isLoaded={isLoaded} />
        </VStack>
      </ContextWrapper>
    </AuthProvider>
  );
}
