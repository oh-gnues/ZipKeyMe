import type {NextPage} from 'next'
import Layout from "@components/Layout";
import Head from "next/head";

const FarePay: NextPage = () => {
	return (
		<Layout title={"상세 고지 내역"} hasTabBar canGoBack>
			<Head><title>Fare pay's details</title></Head>
			<div className={"flex flex-col space-y-5 divide-y"}>
                <section className={"bg-white border-2 rounded-2xl px-3  pb-4 mt-5 w-80 border-t-0 border-b-gray-300 shadow-md mx-auto"}>
                    <p className='font-bold mt-4'>이번 달 관리비</p>
                    <p className='text-4xl mt-2'>123,456<span className='text-base ml-1'>원</span></p>
                    <p className='text-xs float-right text-[#5181ff]'>전월 대비 00,000원 증가/감소</p>
                    <div className='divide-y divide-gray-300 mt-6'>
                        <div></div>
                        <div></div>
                    </div>
                    <p className='mt-4 font-semibold'>세대난방비<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>세대수도료<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>공동전기료<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>승강가정기<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>생활폐기물수수료<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>일반관리비<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>대표회의운영비<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>건물보험료<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>경비비<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>기본간방비<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>소독비<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>승강가유지비<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>위탁관리수수료<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>장기수선충당금<span className='float-right'>000,000원 </span></p>
                   
                </section>
			</div>
		</Layout>
	);
}

export default FarePay;