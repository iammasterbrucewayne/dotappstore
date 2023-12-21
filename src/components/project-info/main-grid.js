import {
  Grid,
  GridItem,
  HStack,
  Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react";
import ProjectLogo from "@/components/common/project-logo";
import CTA from "./cta";
import MainContent from "./main-content";
import TagList from "./tag-list";
import ImageCarousel from "./image-carousel";
import { Fragment, useEffect, useState } from "react";
import { times } from "lodash";

const MainGrid = ({
  id,
  logo,
  appname,
  appdescription,
  imageUrls,
  url,
  tags,
  featured,
  isLoaded,
  upvotes,
  upvoteUsers,
  reportedBy,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  useEffect(() => {
    const isClientSmallScreen = window.innerWidth < 480;
    setIsHidden(isClientSmallScreen);
  }, []);

  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(5, 1fr)",
        "repeat(5, 1fr)",
        "repeat(10, 1fr)",
      ]}
      gap={4}
    >
      <GridItem align="center">
        <Skeleton
          isLoaded={isLoaded}
          rounded="2xl"
          startColor="pink.100"
          endColor="pink.300"
        >
          <ProjectLogo logo={logo} />
        </Skeleton>
      </GridItem>
      <GridItem colSpan={[1, 3, 3, 7]} alignContent={["center", "start"]}>
        {isLoaded ? (
          <Fragment>
            <MainContent
              appname={appname}
              appdescription={appdescription}
              textAlign={["center", "left"]}
              isLoaded={isLoaded}
            />
            <TagList
              tags={tags}
              justifyContent={["center", "start"]}
              mb={8}
              isLoaded={isLoaded}
            />

            <ImageCarousel imageUrls={imageUrls} hidden={isHidden} />
          </Fragment>
        ) : (
          <Fragment>
            <Skeleton
              w={60}
              h={16}
              mb={2}
              rounded="2xl"
              startColor="pink.100"
              endColor="pink.300"
            />
            <Skeleton
              w="75%"
              h={5}
              mb={8}
              rounded="md"
              startColor="pink.100"
              endColor="pink.300"
            />
            <HStack>
              {times(2, (index) => (
                <Skeleton
                  key={index}
                  w={12}
                  h={6}
                  mb={8}
                  rounded="md"
                  startColor="pink.100"
                  endColor="pink.300"
                />
              ))}
            </HStack>
            <Skeleton
              w={600}
              h={400}
              mb={4}
              hidden={isHidden}
              rounded="2xl"
              startColor="pink.100"
              endColor="pink.300"
            />
          </Fragment>
        )}
      </GridItem>
      <GridItem align="center" colSpan={[1, 1, 1, 2]}>
        {isLoaded ? (
          <CTA
            url={url}
            id={id}
            upvotes={upvotes}
            reportedBy={reportedBy}
            upvoteUsers={upvoteUsers}
          />
        ) : (
          times(2, (index) => (
            <Skeleton
              key={index}
              w="full"
              h={16}
              mb={4}
              rounded="2xl"
              startColor="pink.100"
              endColor="pink.300"
            />
          ))
        )}
      </GridItem>
    </Grid>
  );
};

export default MainGrid;
