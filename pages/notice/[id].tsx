import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import useSWR from "swr";
import { Post } from "@prisma/client";

interface NoticeDetailResponse {
  ok: Boolean;
  notice: Post;
}

const NoticeDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<NoticeDetailResponse>(
    router.query.id ? `/api/notice/${router.query.id}` : null
  );
  return (
    <Layout
      title={"공지"}
      hasTabBar
      canGoBack
    >
      <Head>
        <title>{data?.notice?.title}</title>
      </Head>

      {/* 유저 프로필 */}
      <section>
        <div className={"flex mt-5 mb-3 px-4 pb-2 items-center space-x-3"}>
          <div className={"flex justify-center items-center w-10 h-10 rounded-lg border-2"}>
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 21.5C4.09532 18.5854 7.61891 16.7941 11.5 16.7941C15.3811 16.7941 18.9047 18.5854 21.5 21.5M16.5 6.79412C16.5 9.71798 14.2614 12.0882 11.5 12.0882C8.73858 12.0882 6.5 9.71798 6.5 6.79412C6.5 3.87026 8.73858 1.5 11.5 1.5C14.2614 1.5 16.5 3.87026 16.5 6.79412Z"
                stroke="#444444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className={"text-sm font-bold text-gray-700"}>아파트 관리사무소</p>
            <p className={"text-xs text-gray-500"}>
              {("" + data?.notice?.postAt).substring(0, 10)}
            </p>
          </div>
        </div>
      </section>

      {/* 게시글 내용 */}
      <section className={"border-b-2 pb-20 px-4"}>
        <p className={"my-2 text-2xl font-bold"}>{data?.notice?.title}</p>
        <p className={"text-gray-800 leading-relaxed"}>{data?.notice?.content}</p>
      </section>
    </Layout>
  );
};

export default NoticeDetail;
