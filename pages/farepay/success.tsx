import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Button from "@components/Button";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useEffect, useState } from "react";
import fare from "pages/api/fare";
import { Fare } from "@prisma/client";

interface SuccessResponse {
  ok: Boolean;
  fare: Fare;
}
type successQuery = {
  orderId: string;
  paymentKey: string;
  amount: string;
};

const success: NextPage = () => {
  const router = useRouter();
  const [fareId, setFareId] = useState("");
  useEffect(() => {
    if (!router.isReady) return;
    setFareId(router.query.orderId?.toString().split("-")[0] + "");
  }, [router.isReady]);
  useEffect(() => {
    if (fareId.length === 0) return;
    console.log(fareId);
    writePost(data);
  }, [fareId]);

  const [writePost, { data, loading }] = useMutation<SuccessResponse>(`/api/fare/${fareId}`);
  console.log(data);
  return (
    <Layout
      title={"요금 납부"}
      hasTabBar
    >
      <Head>
        <title>납부 완료</title>
      </Head>
      <div className="absolute mt-24 inset-x-0 z-0 grid justify-items-center place-content-center">
        <CheckCircleOutlineIcon sx={{ fontSize: 400, color: "#f1f3f5" }} />
      </div>
      <div className="h-[70vh] grid justify-items-center  place-content-center">
        <h1 className="antialiased font-bold text-8xl z-10 text-neutral-400">결제 완료</h1>

        {loading ? (
          <section className="w-full grid justify-items-stretch h-screen z-10">
            <svg
              className="w-20 h-40 m-3 text-pantone animate-spin justify-self-center"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-10"
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                stroke-width="4"
              ></circle>
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </section>
        ) : (
          <section
            className={
              "bg-white border-2 rounded-2xl px-3 pb-4 mt-5 w-80 mx-auto border-t-0 border-b-gray-300 shadow-md z-10 opacity-20 hover:opacity-80"
            }
          >
            <p className="text-3xl mt-2">
              {`${data?.fare.fareAt.toString().substring(0, 4)}년 ${data?.fare.fareAt
                .toString()
                .substring(5, 7)}월 관리비`}
            </p>
            <p className="mt-4 font-semibold">
              고지서 ID
              <span className="float-right">{fareId}</span>
            </p>
            <p className="mt-4 font-semibold">
              납부 금액
              <span className="float-right">
                {router.query.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원{" "}
              </span>
            </p>
            <p className="mt-4 font-semibold">
              납부 일자
              <span className="float-right">
                {`${data?.fare.paidAt!.toString().substring(0, 4)}년 ${data?.fare
                  .paidAt!.toString()
                  .substring(5, 7)}월 ${data?.fare.paidAt!.toString().substring(8, 10)}일`}
              </span>
            </p>
          </section>
        )}
      </div>
      <div className="w-full mx-2 grid justify-items-center  place-content-center">
        <Button
          large
          onClick={() => {
            router.push("/");
          }}
          text={"메인페이지로 돌아가기"}
        />
      </div>
    </Layout>
  );
};

export default success;
