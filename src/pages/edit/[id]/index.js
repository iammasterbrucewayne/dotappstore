import ContextWrapper from "@/components/common/context-wrapper";
import Navbar from "@/components/common/navbar";
import { useRouter } from "next/router";
import { useProjects } from "@/lib/store/useProjects";
import { find, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import AuthProvider from "@/components/common/auth-provider";
import EditProject from "@/components/project-edit";

export default function Page() {
  const router = useRouter();
  const projectId = router.query.id;

  const { projects, setProjects } = useProjects();
  const [projectInfo, setProjectInfo] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/get-projects");
        const projectsFromApi = await response.json();
        setProjects(projectsFromApi);
      } catch (error) {
        alert("Failed to fetch projects:");
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
        <EditProject
          projectInfo={projectInfo}
          setProjectInfo={setProjectInfo}
        />
      </ContextWrapper>
    </AuthProvider>
  );
}
