import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Bulletin from "@components/Bulletin";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import FloatingButton from "@components/FloatingButton";

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
      <FloatingButton href={"/bulletins/write"}>
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
      </FloatingButton>
    </Layout>
  );
};

export default Bulletins;
