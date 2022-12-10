import type {NextPage} from 'next'
import Layout from "@components/Layout";
import Head from "next/head";
import Link from "next/link";
const Notification: NextPage = () => {
	return (
		<Layout title={"알림 목록"} hasTabBar canGoBack>
			<Head><title>Notification</title></Head>
			<Link href={"/profile/notification/[id].tsx" } legacyBehavior>
			<div className={"flex flex-col space-y-5 divide-y mx-6 my-5"}>
			<section className={"bg-[#6667ab] bg-opacity-20 border-1 rounded-2xl px-3  pb-4  w-80  border-b-gray-300 shadow-md mx-auto"}>
			 	<p className='font-black mt-4 ml-4'>관리비 정보</p>
				<p className='text-sm mt-2 ml-4'>2022년 11월분 관리비가 청구되었어요.</p>
				<p className='text-xs mt-2 ml-4 text-gray-400'>2022. 12. 01</p>
			</section>

			<section className={" bg-opacity-20 border-1 rounded-2xl px-3  pb-4 w-80  border-b-gray-300 shadow-md mx-auto"}>
			 	<p className='font-black mt-4 ml-4'>관리비 정보</p>
				<p className='text-sm mt-2 ml-4'>2022년 11월분 관리비가 청구되었어요.</p>
				<p className='text-xs mt-2 ml-4 text-gray-400'>2022. 12. 01</p>
			</section>
			
			
			<section className={"bg-white  border-1 rounded-2xl px-3  pb-4  w-80  border-b-gray-300 shadow-md mx-auto"}>
			 	<p className='font-black mt-4 ml-4'>관리비 정보</p>
				<p className='text-sm mt-2 ml-4'>2022년 11월분 관리비가 청구되었어요.</p>
				<p className='text-xs mt-2 ml-4 text-gray-400'>2022. 12. 01</p>
			</section>

			<section className={"bg-white border-1 rounded-2xl px-3  pb-4 w-80  border-b-gray-300 shadow-md mx-auto"}>
			 	<p className='font-black mt-4 ml-4'>관리비 정보</p>
				<p className='text-sm mt-2 ml-4'>2022년 11월분 관리비가 청구되었어요.</p>
				<p className='text-xs mt-2 ml-4 text-gray-400'>2022. 12. 01</p>
			</section>

			<section className={"bg-white border-1 rounded-2xl px-3  pb-4 w-80  border-b-gray-300 shadow-md mx-auto"}>
			 	<p className='font-black mt-4 ml-4'>관리비 정보</p>
				<p className='text-sm mt-2 ml-4'>2022년 11월분 관리비가 청구되었어요.</p>
				<p className='text-xs mt-2 ml-4 text-gray-400'>2022. 12. 01</p>
			</section>

			<section className={"bg-white border-1 rounded-2xl px-3  pb-4 w-80  border-b-gray-300 shadow-md mx-auto"}>
			 	<p className='font-black mt-4 ml-4'>회원가입</p>
				<p className='text-sm mt-1 ml-4'>디비디비딥님, 안녕하세요.</p>
				<p className='text-sm  ml-4'>집키미의 회원이 되실 것을 축하드립니다!</p>
				<p className='text-xs mt-2 ml-4 text-gray-400'>2022. 12. 01</p>
			</section>
			</div>
			</Link>
		</Layout>
	);
}

export default Notification;