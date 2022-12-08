import type { NextPage } from "next";
import { Switch } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import Button from "@components/Button";
import Input from "@components/Input";
import Head from "next/head";
import Layout from "@components/Layout";
import { Vote } from "@prisma/client";
import { ResetTv } from "@mui/icons-material";

interface VoteForm {
  title: string;
  startAt: Date;
  finishAt: Date;
  reChoice: Boolean;
  candidates: {
    name: string;
  }[];
}

interface MutationResult {
  ok: Boolean;
  vote?: Vote;
}

const Enter: NextPage = () => {
  const [createVote, { loading, data }] = useMutation<MutationResult>("/api/vote");
  const { register, handleSubmit, control, getValues, reset } = useForm<VoteForm>({
    defaultValues: {
      candidates: [{ name: "찬성" }, { name: "반대" }],
    },
    // mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({ name: "candidates", control });
  const [failReason, setFailReason] = useState("");
  const [showReason, setShowReason] = useState(false);
  const onValid = (validForm: VoteForm) => {
    if (loading) return;
    createVote(validForm);
  };
  const onInValid = (errors: FieldErrors) => {
    const error = errors.finishAt?.message?.toString();
    if (error !== undefined) {
      setFailReason(error);
      setShowReason(true);
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      reset();
      //   router.push(`/admin/vote/${data.vote.voteId}`);
      console.log(data);
    }
  }, [data, router]);

  return (
    <Layout
      title={"투표 개설"}
      canGoBack
      hasTabBar
      alarmBtnDisable
    >
      <Head>
        <title>투표 개설</title>
      </Head>
      <div className="flex flex-col items-center">
        <form
          className="w-full px-2 space-y-3 mt-3"
          onSubmit={handleSubmit(onValid, onInValid)}
          //   onBlur={handleSubmit(onValid, onInValid)}
        >
          <h1>투표 제목</h1>
          <Input
            type="text"
            required
            placeholder="투표 제목을 입력하십시오."
            name="title"
            register={register("title", { required: true })}
          ></Input>
          <hr />
          <h1>투표항목</h1>
          <section className="space-y-1 mx-5 ">
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <section
                    className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 flex justify-between"
                    key={field.id}
                  >
                    <input
                      className="w-full focus:outline-none"
                      placeholder="내용입력"
                      {...register(`candidates.${index}.name` as const, {
                        required: true,
                      })}
                    />
                    <button
                      className={`w-1/12 ${getValues("candidates").length < 3 ? "hidden" : null}`}
                      type="button"
                      onClick={() => remove(index)}
                    >
                      X
                    </button>
                  </section>
                </div>
              );
            })}
            <div className="py-4">
              <a
                onClick={() => append({ name: "" })}
                className="flex flex-row-start  mx-3 space-x-3 w-1/3"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6667 1.83325H7.33337C3.66671 1.83325 1.83337 3.66659 1.83337 7.33325V19.2499C1.83337 19.7541 2.24587 20.1666 2.75004 20.1666H14.6667C18.3334 20.1666 20.1667 18.3333 20.1667 14.6666V7.33325C20.1667 3.66659 18.3334 1.83325 14.6667 1.83325Z"
                    stroke="#8F8F8F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.79163 11H14.2083"
                    stroke="#8F8F8F"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 14.2084V7.79175"
                    stroke="#8F8F8F"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>항목 추가</p>
              </a>
            </div>
          </section>
          <hr />
          <section className="grid grid-col-2 space-y-1">
            <h2>시작일 설정</h2>
            <Input
              register={register("startAt", {
                required: true,
              })}
              name="startAt"
              type="Date"
              placeholder="시작일"
              required
            />
            <h2>마감일 설정</h2>
            <Input
              register={register("finishAt", {
                required: true,
                validate: {
                  islater: (d) =>
                    d.valueOf() > getValues("startAt").valueOf() || "올바르지 않은 날짜입니다.",
                },
              })}
              name="finishAt"
              type="Date"
              placeholder="마감일"
              required
            />
          </section>
          <hr />
          <section className="flex flex-row-reverse items-center">
            <Switch
              onClick={() => console.log("clicked")}
              defaultChecked
              {...register("reChoice")}
            />
            <h1 className="font-base">투표 수정 허용</h1>
          </section>
          <div className="pt-7">
            <Button
              large
              type={"submit"}
              text={"등록"}
            ></Button>
          </div>
        </form>
      </div>
      {/* 로그인 실패시 뜨는 modal */}
      {showReason ? (
        <div className="z-10 absolute inset-0 flex justify-center items-center">
          <div className="bg-gray-100 opacity-90 mt-10 flex justify-center items-center flex-col w-72 rounded-lg shadow-xl h-auto p-2">
            <h4 className="text-base mt-2 mx-4 text-gray-700 font-semibold text-center">
              {failReason}
            </h4>
            <button
              className="my-5 w-auto px-8 h-10 bg-pantone text-white rounded-md shadow hover:shadow-lg font-semibold"
              onClick={() => setShowReason(false)}
            >
              확인
            </button>
          </div>
        </div>
      ) : null}
    </Layout>
  );
};
export default Enter;
