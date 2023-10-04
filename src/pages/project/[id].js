import ContextWrapper from "@/components/common/context-wrapper";
import Navbar from "@/components/common/navbar";
import { useRouter } from "next/router";
import { Disclaimer } from "./disclaimer";

export default function Page() {
	const router = useRouter();

	return (
		<ContextWrapper>
			<Navbar />
			<Disclaimer />
			{router.query.id}
		</ContextWrapper>
	);
}