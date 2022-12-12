import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Bulletin from "@components/Bulletin";
import useSWR from "swr";
import FloatingButton from "@components/FloatingButton";

type Post = {
  postId: number;
  title: string;
  id: string;
  content: string;
  postAt: Date;
  isNotice: boolean;
  users: {
    name: string;
  };
  _count: {
    reples: number;
    likes: number;
  };
};

interface PostsResponse {
  ok: boolean;
  posts: Post[];
}

const Bulletins: NextPage = () => {
  const { data } = useSWR<PostsResponse>("/api/admin/bulletins");
  return (
    <Layout
      title={"게시판"}
      canGoBack
      alarmBtnDisable
    >
      <Head>
        <title>Bulletins</title>
      </Head>
      <section className={"divide-y"}>
        {data?.posts?.map((post) => (
          <Bulletin
            key={post.postId}
            id={post.postId}
            title={post.title}
            content={
              post.content.length > 15 ? post.content.substring(0, 15) + "..." : post.content
            }
            createdAt={("" + post.postAt).substring(0, 10)}
            comments={post._count.reples}
            hearts={post._count.likes}
            userId={post.id}
            writer={post.users.name}
            isNotice={false}
            inAdmin
          />
        ))}
      </section>
    </Layout>
  );
};

export default Bulletins;
