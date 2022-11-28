import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Bulletin from "@components/Bulletin";
import useUser from "@libs/client/useUser";
import useSWR from "swr";

type Post = {
  postId: number;
  title: string;
  id: string | null;
  content: string;
  postAt: Date;
  isNotice: boolean;
  users: {
    name: string;
  } | null;
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
  const { user, isLoading } = useUser();
  const { data } = useSWR<PostsResponse>("/api/bulletins");
  return (
    <Layout
      title={"게시판"}
      canGoBack
      hasTabBar
    >
      <Head>
        <title>Bulletins</title>
      </Head>
      <section className={"divide-y"}>
        {data?.posts?.map((post) =>
          post.isNotice ? null : (
            <Bulletin
              key={post.postId}
              id={post.postId}
              title={post.title}
              content={
                post.content.length > 15
                  ? post.content.substring(0, 15) + "..."
                  : post.content
              }
              createdAt={("" + post.postAt).substring(0, 10)}
              comments={post._count.reples}
              hearts={post._count.likes}
              userId={post.id ? post.id : "공지"}
              writer={post.users ? post.users.name : "아파트 관리사무소"}
              isNotice={post.isNotice}
            />
          )
        )}
      </section>
    </Layout>
  );
};

export default Bulletins;
