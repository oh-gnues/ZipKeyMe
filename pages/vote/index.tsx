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
      <section className={"divide-y grid grid-col-1 space-y-3 w-full mt-7"}>
        {data?.votes?.map((vote) => (
          <Link
            key={vote.voteId}
            id={vote.voteId.toString()}
            href={`/vote/${vote.voteId}`}
            legacyBehavior
          >
            <a className="flex cursor-pointer flex-col pt-4 items-start border-2 rounded-3xl mx-2 bg-zinc-200">
              <h1 className="px-4 text-4xl w-full font-bold text-zinc-700">
                {vote.title.length < 13 ? vote.title : vote.title.substring(0, 10) + "..."}
              </h1>
              <div className="mt-3 mb-1 px-4 text-zinc-500 w-full grid justify-items-stretch">
                <span className="justify-self-end">{`${vote.startAt
                  .toString()
                  .substring(0, 10)} 부터 ${vote.finishAt.toString().substring(0, 10)} 까지`}</span>
              </div>
            </a>
          </Link>
        ))}
      </section>
    </Layout>
  );
};

export default Chats;
