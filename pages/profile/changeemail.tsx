import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import useMutation from "@libs/client/useMutation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { router } from "next/client";
import { useRouter } from "next/router";

interface modifyForm {
  target: string;
  oldThing: string;
  newThing: string;
}

interface MutationResult {
  ok: Boolean;
  message?: string;
}

const ChangeEmail: NextPage = () => {
  const router = useRouter();
  const [changeUserInfo, { loading, data }] = useMutation<MutationResult>("/api/profile");
  const { register, handleSubmit, reset } = useForm<modifyForm>();
  register("target", { value: "email" });
  const [failReason, setFailReason] = useState("");
  const [showReason, setShowReason] = useState(false);
  const [checkEmail, setCheckEmail] = useState("");
  const [isEnd, setIsEnd] = useState(false);
  const onValid = (validForm: modifyForm) => {
    if (loading) return;
    // console.dir(validForm);
    // console.log(checkEmail);

    if (validForm.newThing === checkEmail) {
      changeUserInfo(validForm);
    } else {
      setFailReason("새 이메일과 이메일 확인란의 이메일이 서로 다릅니다.");
      setShowReason(true);
    }
  };
  useEffect(() => {
    if (data) {
      if (!data.ok) {
        setFailReason(data.message!);
        setShowReason(true);
      } else {
        setFailReason(data.message!);
        setShowReason(true);
        setIsEnd(true);
      }
    }
  }, [data]);

  useEffect(() => {
    if (isEnd && !showReason) {
      router.push("/profile");
    }
  }, [isEnd, showReason]);

  return (
    <Layout
      title={"이메일 변경"}
      hasTabBar
      canGoBack
    >
      <Head>
        <title>이메일 변경</title>
      </Head>
      <div className={"space-y-8"}>
        <form onSubmit={handleSubmit(onValid)}>
          {/* 기존 이메일 */}
          <section className={"mx-8 mt-12"}>
            <label htmlFor={"oldEmail"}>
              <input
                className={"w-full border-t-0 border-x-0"}
                type={"email"}
                id={"oldEmail"}
                {...register("oldThing", {
                  required: true,
                })}
                placeholder={"기존 이메일을 입력해주세요."}
              />
            </label>
          </section>

          {/* 변경할 이메일 */}
          <section className={"mx-8"}>
            <label htmlFor={"newEmail"}>
              <input
                className={"w-full border-t-0 border-x-0"}
                type={"email"}
                id={"newEmail"}
                {...register("newThing", {
                  required: true,
                })}
                placeholder={"변경할 이메일을 입력해주세요."}
              />
            </label>
          </section>

          {/* 변경할 이메일 다시 입력 */}
          <section className={"mx-8"}>
            <label htmlFor={"newEmail2"}>
              <input
                className={"w-full border-t-0 border-x-0"}
                type={"email"}
                id={"check"}
                name={"check"}
                onChange={(e) => setCheckEmail(e.target.value)}
                placeholder={"변경할 이메일을 다시 입력해주세요."}
              />
            </label>
          </section>

          {/* 이메일 변경 버튼 */}
          <div className={"mx-8 mt-12"}>
            <button
              className={
                "mt-2 w-full bg-pantone text-white py-2 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-pantone focus:outline-none"
              }
            >
              변경
            </button>
          </div>
        </form>
      </div>
      {/* 이메일 변경실패시 뜨는 modal */}
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

export default ChangeEmail;
