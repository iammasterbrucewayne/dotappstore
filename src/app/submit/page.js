"use client";

import Navbar from "@/components/common/navbar";
import ContextWrapper from "@/components/common/context-wrapper";
import { useState } from "react";
import ProjectDetails from "@/components/submit/projectDetails";
import ProjectImages from "@/components/submit/projectImages";
import ProjectCategory from "@/components/submit/projectCategory";
import ProjectSocials from "@/components/submit/projectSocials";
import { useRouter } from "next/navigation";
import { upload } from "@/lib/utils";

export default function Submit() {
  const [projectDetails, setProjectDetails] = useState({});
  const [submitStage, setSubmitStage] = useState(0);
  const [logo, setLogo] = useState();
  const [screenshots, setScreenshots] = useState([]);
  const [projectCategories, setProjectCategories] = useState([]);
  const [screenshotPreviews, setScreenshotPreviews] = useState([]);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState(null);
  const [status, setStatus] = useState("");
  const router = useRouter();

  const pushProject = async (socials) => {
    try {
      const logoUrl = await upload(logo);
      const uploadedScreenshots = await Promise.all(
        screenshots.map(async (screenshot) => await upload(screenshot))
      );

      const project = {
        id: projectDetails.projectName.toLowerCase().replace(/\s/g, "_"),
        logo: logoUrl,
        appname: projectDetails.projectName,
        appdescription: projectDetails.description,
        url: projectDetails.website,
        twitterID: socials.twitter,
        tags: projectCategories,
        upvotes: 0,
        upvoteUsers: [],
        reportedBy: [],
        screenshots: uploadedScreenshots,
        discord: socials.discord,
        telegram: socials.telegram,
        tagline: projectDetails.tagline,
        status: status,
        isApproved: true,
      };

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      router.push(`/project/${project.id}`);
    } catch (error) {
      alert("Failed to submit project");
    }
  };

  const renderStage = () => {
    switch (submitStage) {
      case 0:
        return (
          <ProjectDetails
            projectDetails={projectDetails}
            setProjectDetails={setProjectDetails}
            setSubmitStage={setSubmitStage}
          />
        );

      case 1:
        return (
          <ProjectImages
            screenshotPreviews={screenshotPreviews}
            setScreenshotPreviews={setScreenshotPreviews}
            logoPreviewUrl={logoPreviewUrl}
            setLogoPreviewUrl={setLogoPreviewUrl}
            logo={logo}
            setLogo={setLogo}
            screenshots={screenshots}
            setScreenshots={setScreenshots}
            setSubmitStage={setSubmitStage}
          />
        );
      case 2:
        return (
          <ProjectCategory
            projectCategories={projectCategories}
            setProjectCategories={setProjectCategories}
            status={status}
            setStatus={setStatus}
            setSubmitStage={setSubmitStage}
          />
        );
      case 3:
        return (
          <ProjectSocials
            setSubmitStage={setSubmitStage}
            pushProject={pushProject}
          />
        );
    }
  };

  return (
    <ContextWrapper>
      <Navbar />
      {renderStage()}
    </ContextWrapper>
  );
}
