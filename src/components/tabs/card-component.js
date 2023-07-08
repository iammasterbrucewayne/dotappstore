import {
	Card,
	CardBody,
	Grid,
	GridItem,
	Heading,
	Image,
	Link,
	Text,
} from "@chakra-ui/react";

export default function CardComponent({
	appname,
	appdescription,
	featured,
	url,
}) {
	const imgUrl = featured?.coverImage;
	return (
		<Card
			as={Link}
			shadow="2xl"
			borderRadius={32}
			border="1px"
			overflow="hidden"
			transition="all 0.2s ease-in-out"
			transform="scale(1)"
			href={url ? url : "#"}
			isExternal
			_hover={{ transform: "scale(1.03)", textDecoration: "none" }}
		>
			<Grid templateRows="repeat(5, 1fr)">
				<GridItem rowSpan={3}>
					<Image
						src={
							imgUrl
								? imgUrl
								: "https://pbs.twimg.com/profile_banners/1412977944629182472/1657756446/1500x500"
						}
						height="auto"
						w="100%"
						bgClip="border-box"
					/>
				</GridItem>
				<CardBody as={GridItem} rowSpan={2} pt={4}>
					<Heading size="md">{appname}</Heading>
					<Text
						fontWeight="regular"
						fontSize={["xs", "sm", "md"]}
						noOfLines={1}
					>
						{appdescription}
					</Text>
				</CardBody>
			</Grid>
		</Card>
	);
}
