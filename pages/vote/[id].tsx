import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Candidate, UserVote } from "@prisma/client";
import { FieldErrors, useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import Button from "@components/Button";
import { useEffect, useState } from "react";

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
  voteHistory: UserVote;
}

interface VoteForm {
  candId: number;
}

const NoticeDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<VoteDetailResponse>(
    router.query.id ? `/api/vote/${router.query.id}` : null
  );
  const [vote] = useMutation(`/api/vote/${data?.vote.voteId}`);
  const { register, handleSubmit } = useForm<VoteForm>({
    defaultValues: {
      candId: 2,
    },
  });
  const [voted, setVoted] = useState(false);
  const onValid = (validForm: VoteForm) => {
    vote(validForm);
    setVoted(true);
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };
  useEffect(() => {
    if (!data) return;
    if (data.voteHistory) {
      setVoted(Boolean(data.voteHistory));
      const checkedBtn = document.getElementById(
        data.voteHistory.candId.toString()
      ) as HTMLInputElement | null;
      if (checkedBtn) checkedBtn.checked = true;
    }
  }, [data]);

  return (
    <Layout
      title={"투표"}
      hasTabBar
      canGoBack
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
      <section className={"border-b-2 pb-20 px-4 w-full"}>
        <form
          className="w-full"
          onSubmit={handleSubmit(onValid, onInValid)}
        >
          <div className="w-full grid grid-col-1 justify-items-center space-y-1 mb-10">
            {data?.vote.candidates.map((candidate) => (
              <div
                className="w-3/5"
                key={candidate.candId}
              >
                <input
                  id={candidate.candId.toString()}
                  className={"peer hidden"}
                  type="radio"
                  value={candidate.candId}
                  checked={undefined}
                  {...register("candId", {
                    required: true,
                  })}
                />
                <label
                  htmlFor={candidate.candId.toString()}
                  className={
                    "border border-gray-300 block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-pantone-light peer-checked:text-white"
                  }
                >
                  {candidate.name}
                </label>
              </div>
            ))}
          </div>
          {!voted ? (
            <Button
              large
              type={"submit"}
              text={"투표"}
            ></Button>
          ) : null}
        </form>
      </section>
      {voted ? (
        <>
          <div className="absolute inset-0 w-screen h-screen bg-gray-100 opacity-50 flex justify-center items-center"></div>
          <div className="absolute inset-0 flex justify-center items-end">
            <button
              disabled={!data?.vote.reChoice}
              onClick={() => setVoted(false)}
              className={
                "z-10 w-3/5 mx-2 mb-40 bg-pantone hover:bg-pantone-light transition-colors text-white px-4 py-5 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-pantone focus:outline-none py-3 text-xl"
              }
            >
              {data?.vote.reChoice ? "재투표" : "투표 완료"}
            </button>
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default NoticeDetail;
