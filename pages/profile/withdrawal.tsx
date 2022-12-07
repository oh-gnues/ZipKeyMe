import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Button from "@components/Button";
import { useRouter } from "next/dist/client/router";

const Withdrawal: NextPage = () => {
  const router = useRouter();
  return (
    <Layout
      title={"회원 탈퇴"}
      canGoBack
    >
      <Head>
        <title>회원 탈퇴</title>
      </Head>
      <div>
        {/* 탈퇴 로고 */}
        <section className={"flex items-center justify-center py-64"}>
          <div className={"space-y-10"}>
            <div className={"flex justify-center"}>
              <svg
                width="110"
                height="111"
                viewBox="0 0 110 111"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M55 34.1396V55.1396M55 76.1396H55.0525M107.5 55.1396C107.5 84.1346 83.995 107.64 55 107.64C26.005 107.64 2.5 84.1346 2.5 55.1396C2.5 26.1447 26.005 2.63965 55 2.63965C83.995 2.63965 107.5 26.1447 107.5 55.1396Z"
                  stroke="#444444"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className={"font-bold text-3xl"}>집키미에서 탈퇴하시겠습니까?</p>
          </div>
        </section>

        {/* 탈퇴 시 정보 삭제 문구 */}
        <section className={"flex text-sm justify-center text-gray-400"}>
          <p>
            탈퇴 시 회원님의 모든 정보가 영구 삭제되며 계정에 저장된 모든 데이터는 복구가
            불가능합니다.
          </p>
        </section>

        {/* 탈퇴 버튼 */}
        <section className={"flex justify-center py-4"}>
          <Button
            onClick={async () => {
              await fetch("/api/users/withdraw", { method: "DELETE" }).then(() =>
                router.push("/enter")
              );
            }}
            large
            text={"탈퇴하기"}
          />
        </section>
      </div>
    </Layout>
  );
};

export default Withdrawal;
