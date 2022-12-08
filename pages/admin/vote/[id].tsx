import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

type Candidate = {
  candId: number;
  name: string;
  _count: {
    UserVote: number;
  };
};

type Vote = {
  voteId: number;
  title: string;
  startAt: Date;
  finishAt: Date;
  reChoice: boolean;
  candidates: Candidate[];
};

interface VoteDetailResponse {
  ok: Boolean;
  vote: Vote;
}

const NoticeDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<VoteDetailResponse>(
    router.query.id ? `/api/vote/${router.query.id}/show` : null
  );
  return (
    <Layout
      title={"투표 현황"}
      hasTabBar
      canGoBack
      alarmBtnDisable
    >
      <Head>
        <title>{data?.vote?.title}</title>
      </Head>

      {/* 투표 제목, 기간 */}
      <section>
        <div className={"flex mt-5 mb-3 px-4 pb-2 items-center space-x-3"}>
          <div>
            <p className={"my-2 text-2xl font-bold"}>{data?.vote.title}</p>
            <div className="flex flex-row items-center space-x-6">
              <p className={"text-xs text-gray-500"}>{`${data?.vote.startAt
                .toString()
                .substring(0, 10)} ~ 
                ${data?.vote.finishAt.toString().substring(0, 10)}`}</p>
              <p className={"text-xs text-red-500"}>
                {data?.vote.reChoice ? "재투표 가능" : "재투표 불가"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 투표 후보 */}
      <section className={"border-b-2 my-10 px-4 w-full"}>
        <div className="w-full grid grid-col-1 justify-items-center space-y-1 mb-10">
          {data?.vote.candidates.map((candidate) => (
            <div
              className="w-3/5 flex flex-col-2 justify-between items-center border border-gray-300 block rounded-xl p-2 text-center"
              key={candidate.candId}
            >
              <span className="mx-2">{candidate.name}</span>
              <span className="mx-2">{candidate._count.UserVote}</span>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default NoticeDetail;
