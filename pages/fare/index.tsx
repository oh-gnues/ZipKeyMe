import type {NextPage} from 'next'
import Layout from "@components/Layout";
import Head from "next/head";
import BACKICON from "public/jump_icon.svg"
import Link from "next/link";

const Fare: NextPage = () => {
  return (
    <Layout title={"요금 조회"} hasTabBar canGoBack>
      <Head><title>Fare Check</title></Head>
      <div className='bg-[#f5f5f5] grid'>
      <div className={"flex flex-col space-y-5 divide-y mt-6 "}>
        <section className={"bg-white border-2 rounded-2xl px-3  pb-4 mt-5 w-80 border-t-0 border-b-gray-300 shadow-md mx-auto"}>
          <p className='font-semibold text-xl mt-3'>한양대학로 43-1 202호</p>
          <p className='text-xs mt-2'>2022년 11월분</p>
          <p className='text-5xl float-right mt-2  font-sans'>123,456 <span className='text-xl'>원</span></p>  
          <p className='mt-2 float-right text-sm'>납부 마감일:2022.00.00</p>
            <div className='divide-y divide-gray-200 mt-24'>
              <div className='mt-2'></div> 
              <div className='mt-2'></div> 
            </div>
              <div className='mt-4'>상세 고지 내역 
              <Link href={"/fare/farepay"} legacyBehavior>
                <p className='inline-block float-right'><BACKICON/></p>
              </Link>
                </div>
        </section>
      </div>

      <div className={"flex flex-col space-y-5 divide-y mt-12"}>
        <section className={"bg-white border-2 rounded-2xl px-3 border-[#D4D4D4] pb-4 mt-5 w-80 border-t-0 border-b-gray-300 shadow-md mx-auto"}>
          <p className='font-semibold text-xl mt-3'>한양대학로 43-1 202호</p>
          <p className='text-xs mt-2'>2022년 11월분</p>
          <p className='text-5xl float-right mt-2  font-sans'>123,456 <span className='text-xl'>원</span></p>  
          <p className='mt-2 float-right text-sm'>납부 마감일:2022.00.00</p>
            <div className='divide-y divide-gray-200 mt-24'>
              <div className='mt-2'></div> 
              <div className='mt-2'></div> 
            </div>
              <div className='mt-4'>상세 고지 내역 
              <Link href={"/fare/farepay"} legacyBehavior>
                <p className='inline-block float-right'><BACKICON/></p>
              </Link>
                </div>
        </section>
      </div>

      <div className={"flex flex-col space-y-5 divide-y mt-12"}>
        <section className={"bg-white border-2 rounded-2xl px-3 border-[#D4D4D4] pb-4 mt-5 w-80 border-t-0 border-b-gray-300 shadow-md mx-auto"}>
          <p className='font-semibold text-xl mt-3'>한양대학로 43-1 202호</p>
          <p className='text-xs mt-2'>2022년 11월분</p>
          <p className='text-5xl float-right mt-2  font-sans'>123,456 <span className='text-xl'>원</span></p>  
          <p className='mt-2 float-right text-sm'>납부 마감일:2022.00.00</p>
            <div className='divide-y divide-gray-200 mt-24'>
              <div className='mt-2'></div> 
              <div className='mt-2'></div> 
            </div>
              <div className='mt-4'>상세 고지 내역 
              <Link href={"/fare/farepay"} legacyBehavior>
                <p className='inline-block float-right'><BACKICON/></p>
              </Link>
                </div>
        </section>
      </div>
      </div>
    </Layout>
  );
}

export default Fare;