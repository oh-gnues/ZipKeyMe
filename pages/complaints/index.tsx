import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import FloatingButton from "@components/FloatingButton";
import Complaint from "@components/Complaint";

type Complaint = {
	comId: number;
	id: string;
	comAt: Date;
	category: string;
	title: string;
	state: string;
	users: {
		name: string;
	};
};

interface ComplaintResponse {
	ok: boolean;
	complaint: Complaint[];
}

const Complaints: NextPage = () => {
	const { user, isLoading } = useUser();
	const { data } = useSWR<ComplaintResponse>("/api/complaint");
	return (
		<Layout title={"민원"} canGoBack>
			<Head><title>민원</title></Head>
			<section className={"divide-y"}>
				{data?.complaint?.map((complaint) => (
					<Complaint
						key={complaint.comId}
						comId={complaint.comId}
						category={complaint.category}
						title={complaint.title}
						comAt={complaint.comAt}
						state={complaint.state}
						user={complaint.users.name}
					/>
				))}
			</section>

			<FloatingButton href={"/complaints/write"}>
				<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
				     stroke="currentColor" aria-hidden="true">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
				</svg>
			</FloatingButton>
		</Layout>
	);
};

export default Complaints;
