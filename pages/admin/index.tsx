import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import MainButton from "@components/MainButton";
import CarManage from "public/car_manage.svg";
import UserManage from "public/user-edit.svg";
import SendAlarm from "public/directbox-send.svg";
import Vote from "public/vote.svg";
import Complaint from "public/complaint.svg";
import Notice from "public/notice.svg";
import Post from "public/post_icon.svg";
import Chat from "public/chat_icon.svg";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout
      alarmBtnDisable
      title="관리자 메인"
    >
      <Head>
        <title>집키미 관리자 페이지</title>
      </Head>

      {/* 메뉴 섹션 */}
      <div className="h-[80vh] w-full grid grid-col-1 content-center">
        <section
          className={
            "bg-white grid grid-cols-3 grid-rows-2 rounded-3xl py-6 drop-shadow-2xl mx-6 gap-y-6"
          }
        >
          <div className={"flex justify-center items-center"}>
            <Link href="/admin/user">
              <MainButton text={"주민 관리"}>
                <UserManage />
              </MainButton>
            </Link>
          </div>
          <div className={"flex justify-center items-center"}>
            <Link href="/admin/car">
              <MainButton text={"차량 관리"}>
                <CarManage />
              </MainButton>
            </Link>
          </div>
          <div className={"flex justify-center items-center"}>
            <Link href="/admin/alarm">
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
            <Link href="/admin/complaints">
              <MainButton text={"민원"}>
                <Complaint />
              </MainButton>
            </Link>
          </div>
          <div className={"flex justify-center items-center"}>
            <Link href="/admin/notice">
              <MainButton text={"공지사항"}>
                <Notice />
              </MainButton>
            </Link>
          </div>
          <div className={"flex justify-center items-center"}>
            <Link href="/admin/bulletins">
              <MainButton text={"게시판"}>
                <Post />
              </MainButton>
            </Link>
          </div>
          <div className={"flex justify-center items-center"}>
            <Link href="/admin/chats">
              <MainButton text={"간편 문의"}>
                <Chat />
              </MainButton>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
