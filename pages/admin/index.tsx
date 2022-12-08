import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Carousel from "@components/Carousel";
import MainButton from "@components/MainButton";

import Image from "next/image";
import CarManage from "public/car_manage.svg";
import UserManage from "public/user-edit.svg";
import SendAlarm from "public/directbox-send.svg";
import Vote from "public/vote.svg";
import Complaint from "public/complaint.svg";
import Notice from "public/notice.svg";
import useUser from "@libs/client/useUser";
import Link from "next/link";

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
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
          <Link href="/">
            <MainButton text={"주민 관리"}>
              <UserManage />
            </MainButton>
          </Link>
        </div>
        <div className={"flex justify-center items-center"}>
          <Link href="/">
            <MainButton text={"차량 관리"}>
              <CarManage />
            </MainButton>
          </Link>
        </div>
        <div className={"flex justify-center items-center"}>
          <Link href="/">
            <MainButton text={"알림 발송"}>
              <SendAlarm />
            </MainButton>
          </Link>
        </div>
        <div className={"flex justify-center items-center"}>
          <Link href="/admin/vote">
            <MainButton text={"투표"}>
              <Vote />
            </MainButton>
          </Link>
        </div>
        <div className={"flex justify-center items-center"}>
          <Link href="/">
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
