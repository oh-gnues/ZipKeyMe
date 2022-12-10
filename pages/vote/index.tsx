import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import useSWR from "swr";
import { Vote } from "@prisma/client";
import Link from "next/link";

interface votesResponse {
  ok: true;
  votes: Vote[];
}

const Chats: NextPage = () => {
  const { data } = useSWR<votesResponse>("/api/vote");
  console.log(data);
  return (
    <Layout
      title={"투표"}
      hasTabBar
      canGoBack
    >
      <Head>
        <title>vote</title>
      </Head>
      <section className={"divide-y flex flex-col justify-itmes-center w-full mt-7"}>
        {data?.votes?.map((vote) => (
          <div key={vote.voteId}>
            <Link
              id={vote.voteId.toString()}
              href={`/vote/${vote.voteId}`}
              legacyBehavior
            >
              <a className="flex my-3 cursor-pointer transition-colors hover:bg-pantone border-4 hover:border-4 hover:border-pantone-light flex-col items-start rounded-2xl mx-2 bg-pantone-light">
                <h1 className="my-2 px-4 text-3xl w-full font-semibold text-neutral-600 transition-colors hover:text-neutral-200">
                  {vote.title.length < 13 ? vote.title : vote.title.substring(0, 10) + "..."}
                </h1>
                <div className="mt-1 mb-2 px-4 text-neutral-600 flex justify-items-end transition-colors hover:text-neutral-200">
                  <span className="justify-self-end">{`${vote.startAt
                    .toString()
                    .substring(0, 10)} ~ ${vote.finishAt.toString().substring(0, 10)}`}</span>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default Chats;
