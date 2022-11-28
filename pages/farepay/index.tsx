import type {NextPage} from 'next'
import Layout from "@components/Layout";
import Head from "next/head";
import Link from 'next/link';

const FarePay: NextPage = () => {
	return (
		<Layout title={"요금 납부"} hasTabBar canGoBack>
			<Head><title>Fare pay</title></Head>
			<div className='bg-[#f5f5f5] grid'>
				<div className={"flex flex-col space-y-5 divide-y mt-6 "}>
					<section className={"bg-[#6667ab] opacity-60 border-2 rounded-2xl px-3  pb-4 mt-5 w-80  border-t-0 border-b-gray-300 shadow-md mx-auto"}>
          				<p className='font-semibold text-xl mt-3 text-white'>한양대학로 43-1 202호</p>
          				<p className='text-xs mt-2 text-white'>2022년 11월분</p>
          				<p className='text-5xl float-right mt-2  text-white'>123,456 <span className='text-base '>원</span></p>  
          				<p className='mt-2 float-right text-sm text-white'>납부 마감일:2022.00.00</p>
            		<div className='divide-y divide-gray-400 mt-24'>
              			<div className='mt-2'></div> 
              			<div className='mt-2'></div> 
            		</div> 
				<div className='float-right text-sm mt-4 h-7 w-16 bg-white text-center leading-7 rounded-lg text-[#6667ab] text-opacity-60' >납부상태</div>    		
        			</section>
				</div>

				<p className='text-gray-400 ml-5 mt-7' >청구 금액</p>
				
				
				<section className={"bg-white border-2 rounded-2xl px-3  pb-4 mt-5 w-80 mx-auto border-t-0 border-b-gray-300 shadow-md"}>
                    <p className='font-bold mt-6'>이번 달 관리비</p>
                    <p className='text-4xl mt-2'>123,456<span className='text-base ml-1'>원</span></p>
                    <p className='text-xs float-right text-[#5181ff]'>전월 대비 00,000원 증가/감소</p>
                    <div className='divide-y divide-gray-300 mt-6'>
                        <div></div>
                        <div></div>
                    </div>
					<p className='mt-4 font-semibold'>당월부과액<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>할인금액<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>미납액<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>미납연체료<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>납기내금액<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>납기후연체료<span className='float-right'>000,000원 </span></p>
                    <p className='mt-4 font-semibold'>납기후금액<span className='float-right'>000,000원 </span></p>
				</section>
				
				<div className='w-60 h-14 font-black bg-[#6667ab]  mt-14 rounded-lg opacity-80 mx-auto'>
				<Link href={"https://pay.toss.im/pay/"}><p className="text-white text-center text-lg "><input className="mt-3" type="submit" value="결제"></input></p></Link>
				</div>

			</div>

			
		</Layout>
	);
}

export default FarePay;