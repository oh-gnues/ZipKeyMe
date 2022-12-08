import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Carousel from "../components/Carousel";
import MainButton from "../components/MainButton";

import Image from "next/image";
import FareCheck from "public/fare_check.svg";
import FarePay from "public/fare_pay.svg";
import CarRegister from "public/car_register.svg";
import Vote from "public/vote.svg";
import Complaint from "public/complaint.svg";
import Notice from "public/notice.svg";
import useUser from "@libs/client/useUser";
import Link from "next/link";
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  // 로그인 되어 있지 않으면 로그인페이지로 리다이렉션
  const { user, isLoading } = useUser();
  const [admin,isAdmin]  = useState<boolean>(false);

  // console.log(admin)

  // useEffect(()=>{
  //   if(user?.name === "김승호"){
  //     isAdmin(true);
  //   }
  // },[user])


  return (
    <Layout hasTabBar>
      <Head>
        <title>Home | ZipKeyMe</title>
      </Head>

      {/* 배너 섹션 */}
      <section className={"border-y-2 mt-14"}>
        <Carousel
          slides={[
            <Image
              key={0}
              fill
              src={`/banner.png`}
              className="object-contain"
              alt="Image"
            />,
            <Image
              key={1}
              fill
              src={`/banner.png`}
              className="object-contain"
              alt="Image"
            />,
            <Image
              key={2}
              fill
              src={`/banner.png`}
              className="object-contain"
              alt="Image"
            />,
            <Image
              key={3}
              fill
              src={`/banner.png`}
              className="object-contain"
              alt="Image"
            />,
          ]}
          options={{
            align: "start",
            loop: true,
            skipSnaps: false,
            inViewThreshold: 0.7,
          }}
        />
      </section>

      {/* 메뉴 섹션 */}
      <section
        className={
          "bg-white mt-12 grid grid-cols-3 grid-rows-2 rounded-3xl py-6 drop-shadow-2xl mx-6 gap-y-6"
        }
      >
        <div className={"flex justify-center items-center"}>
          <Link href="/farecheck">
            <MainButton text={"요금 조회"}>
              <FareCheck />
            </MainButton>
          </Link>
        </div>
        <div className={"flex justify-center items-center"}>
          <Link href="/farepay">
            <MainButton text={"요금 납부"}>
              <FarePay />
            </MainButton>
          </Link>
        </div>
        <div className={"flex justify-center items-center"}>
          <Link href="/car">
            <MainButton text={"차량"}>
              <CarRegister />
            </MainButton>
          </Link>
        </div>
        <div className={"flex justify-center items-center"}>
          <Link href="/vote">
            <MainButton text={"투표"}>
              <Vote />
            </MainButton>
          </Link>
        </div>
        <div className={"flex justify-center items-center"}>
          <Link href="/complaints">
            <MainButton text={"민원"}>
              <Complaint />
            </MainButton>
          </Link>
        </div>
        <div className={"flex justify-center items-center"}>
          <Link href="/notice">
            <MainButton text={"공지사항"}>
              <Notice />
            </MainButton>
          </Link>
        </div>
     
      </section>
    </Layout>
  );
};

export default Home;
