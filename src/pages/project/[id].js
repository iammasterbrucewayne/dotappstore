import ContextWrapper from "@/components/common/context-wrapper";
import Navbar from "@/components/common/navbar";
import { useRouter } from "next/router";

export default function Page() {
	const router = useRouter();
	return <ContextWrapper>
        <Navbar />
        {router.query.id}
    </ContextWrapper>;
}
