import {
	Grid,
	GridItem,
	Image as ChakraImage,
	useBreakpointValue,
} from "@chakra-ui/react";
import ProjectLogo from "@/components/common/project-logo";
import CTA from "./cta";
import MainContent from "./main-content";
import TagList from "./tag-list";
import ImageCarousel from "./image-carousel";

const MainGrid = ({
	id,
	logo,
	appname,
	appdescription,
	imageUrls,
	url,
	tags,
	featured,
}) => {
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
				<ProjectLogo logo={logo} />
			</GridItem>
			<GridItem colSpan={[1, 3, 3, 7]} alignContent={["center", "start"]}>
				<MainContent
					appname={appname}
					appdescription={appdescription}
					textAlign={["center", "left"]}
				/>
				<TagList tags={tags} justifyContent={["center", "start"]} mb={8} />
				<ImageCarousel imageUrls={imageUrls} hidden={isHidden} />
			</GridItem>
			<GridItem align="center" colSpan={[1, 1, 1, 2]}>
				<CTA url={url} />
			</GridItem>
		</Grid>
	);
};

export default MainGrid;
