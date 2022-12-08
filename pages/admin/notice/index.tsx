import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Bulletin from "@components/Bulletin";
import useSWR from "swr";
import FloatingButton from "@components/FloatingButton";
import { Post } from "@prisma/client";

interface NoticesResponse {
  ok: boolean;
  notices: Post[];
}

const Notice: NextPage = () => {
  const { data } = useSWR<NoticesResponse>("/api/notice");
  console.log(data);
  return (
    <Layout
      title={"공지"}
      canGoBack
      alarmBtnDisable
    >
      <Head>
        <title>Notices</title>
      </Head>
      <section className={"divide-y"}>
        {data?.notices?.map((post) => (
          <Bulletin
            key={post.postId}
            id={post.postId}
            title={post.title}
            content={
              post.content.length > 15 ? post.content.substring(0, 15) + "..." : post.content
            }
            createdAt={("" + post.postAt).substring(0, 10)}
            userId={"공지"}
            writer={"아파트 관리사무소"}
            isNotice
            inAdmin
          />
        ))}
      </section>
      <FloatingButton href={"/admin/notice/write"}>
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </FloatingButton>
    </Layout>
  );
};

export default Notice;
