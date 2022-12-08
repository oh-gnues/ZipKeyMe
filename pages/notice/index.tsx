import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Bulletin from "@components/Bulletin";
import useSWR from "swr";
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
          />
        ))}
      </section>
    </Layout>
  );
};

export default Notice;
