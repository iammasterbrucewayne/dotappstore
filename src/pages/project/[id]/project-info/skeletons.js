import { Skeleton, HStack } from "@chakra-ui/react";
import { times } from "lodash";

export const LogoSkeleton = (props) => (
	<Skeleton
		w={24}
		h={24}
		mb={2}
		rounded="2xl"
		startColor="pink.100"
		endColor="pink.300"
		{...props}
	/>
);

export const HeadingSkeleton = (props) => (
	<Skeleton
		w={60}
		h={16}
		mb={2}
		rounded="2xl"
		startColor="pink.100"
		endColor="pink.300"
		{...props}
	/>
);

export const TextSkeleton = (props) => (
	<Skeleton
		w="75%"
		h={5}
		mb={8}
		rounded="md"
		startColor="pink.100"
		endColor="pink.300"
		{...props}
	/>
);

export const TagsSkeleton = () => (
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
);

export const ImageCarouselSkeleton = (props) => (
	<Skeleton
		w={600}
		h={400}
		mb={4}
		rounded="2xl"
		startColor="pink.100"
		endColor="pink.300"
		{...props}
	/>
);

export const ButtonGroupSkeleton = (props) =>
	times(2, (index) => (
		<Skeleton
			key={index}
			w="full"
			h={16}
			mb={4}
			rounded="2xl"
			startColor="pink.100"
			endColor="pink.300"
			{...props}
		/>
	));

const defaultSkeleton = (props) => <Skeleton {...props} />;

export default defaultSkeleton;
