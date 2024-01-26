import { HStack, Tag } from "@chakra-ui/react";
import { map } from "lodash";

const TagList = ({ tags, justifyContent = "start", ...props }) => (
	<HStack justifyContent={justifyContent} {...props}>
		{map(tags, (tag, key) => (
			<Tag key={key}>{tag}</Tag>
		))}
	</HStack>
);

export default TagList;
