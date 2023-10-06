import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import ProjectLogo from "@/components/common/project-logo";
import CTA from "./cta";
import MainContent from "./main-content";
import TagList from "./tag-list";
import ImageCarousel from "./image-carousel";
import {
	ButtonGroupSkeleton,
	HeadingSkeleton,
	ImageCarouselSkeleton,
	LogoSkeleton,
	TagsSkeleton,
	TextSkeleton,
} from "./skeletons";

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
}) => {
	// using useBreakpointValue from Chakra UI for handling visibility
	const isHidden = useBreakpointValue({ base: true, sm: false });

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
				{isLoaded ? <ProjectLogo logo={logo} /> : <LogoSkeleton />}
			</GridItem>

			<GridItem colSpan={[1, 3, 3, 7]} alignContent={["center", "start"]}>
				{isLoaded ? (
					<>
						<MainContent
							appname={appname}
							appdescription={appdescription}
							textAlign={["center", "left"]}
						/>
						<TagList tags={tags} justifyContent={["center", "start"]} mb={8} />
						<ImageCarousel imageUrls={imageUrls} hidden={isHidden} />
					</>
				) : (
					<>
						<HeadingSkeleton />
						<TextSkeleton />
						<TagsSkeleton />
						<ImageCarouselSkeleton hidden={isHidden} />
					</>
				)}
			</GridItem>

			<GridItem align="center" colSpan={[1, 1, 1, 2]}>
				{isLoaded ? <CTA url={url} /> : <ButtonGroupSkeleton />}
			</GridItem>
		</Grid>
	);
};

export default MainGrid;
