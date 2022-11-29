// 유저 로그인 페이지
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import Button from "@components/Button";
import Input from "@components/Input";

import Head from "next/head";
import Logo from "public/logo.svg";
import CopyRights from "public/copyRights.svg";

interface SignInForm {
  account?: string;
  password?: string;
}

interface MutationResult {
  ok: Boolean;
  message?: string;
}

const Enter: NextPage = () => {
  const [signIn, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/signIn");
  const { register, handleSubmit, reset } = useForm<SignInForm>();
  const [failReason, setFailReason] = useState("");
  const [showReason, setShowReason] = useState(false);
  const onValid = (validForm: SignInForm) => {
    if (loading) return;
    signIn(validForm);
  };
  // 로그인 응답
  // 1. 잘못된 아이디 => data = {ok:false, message: "Invalid account"}
  // 2. 잘못된 비밀번호 => data = {ok:false, message: "Invalid password"}
  // 3. 아직 관리자로부터 허가받지 않음 => data = {ok:false, message: "No permission"}
  // 4. 성공 => data = {ok:true}
  // 테스트용 계정 [kimdb123 / 1234] or [choi123 / 1234]
  const router = useRouter();
  useEffect(() => {
    console.log(data);
    // 로그인 성공시 메인페이지로 라우팅
    if (data?.ok) {
      router.push("/");
    } else {
      //로그인 실패시 실패이유 출력
      if (data?.message == "Invalid account") {
        setFailReason("잘못된 계정입니다.");
        setShowReason(true);
      } else if (data?.message == "Invalid password") {
        setFailReason("잘못된 비밀번호입니다.");
        setShowReason(true);
      } else if (data?.message == "No permission") {
        setFailReason("승인 대기 중인 계정입니다.");
        setShowReason(true);
      }
    }
  }, [data, router]);

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className="mt-36">
        <div className="flex flex-col items-center">
          <Logo />
        </div>
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col mt-8 mx-2 space-y-2"
        >
          <Input
            register={register("account", {
              required: true,
            })}
            name="account"
            type="text"
            placeholder="아이디를 입력해주세요."
            required
            loginInput
          />
          <Input
            register={register("password")}
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            required
            loginInput
          />
          <div className="py-4 font-bold">
            <Button
              large
              text={loading ? "로그인 중" : "로그인"}
            />
          </div>
        </form>
        <div className="text-center text-sm flex justify-center space-x-1">
          <span>계정이 없으신가요?</span>
          <div className="text-sky-600 hover:text-orange-500 hover:underline hover:underline-offset-auto">
            <Link href="/register">회원가입</Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-10">
        <div className="flex flex-col items-center">
          <Link href="/admin/enter">
            <CopyRights />
          </Link>
        </div>
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
    </div>
  );
};
export default Enter;
