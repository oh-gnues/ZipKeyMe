import type {NextPage} from 'next'
import Layout from "@components/Layout";
import Head from "next/head";

const NotificationDetail: NextPage = () => {
	return (
		<Layout title={"알림 상세"} hasTabBar>
			<Head><title>Notification Detail</title></Head>
			<div className={"flex flex-col space-y-5 divide-y"}>
				알림 상세
			</div>
		</Layout>
	);
}

export default NotificationDetail;