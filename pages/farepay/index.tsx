import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import { Fare } from "@prisma/client";
import useUser from "@libs/client/useUser";
import totalFare from "@libs/client/totalFare";
import useSWR from "swr";
import pay from "@libs/client/pay";
import getDate from "@libs/client/getDate";
import { useEffect, useState } from "react";

interface FaresResponse {
  ok: boolean;
  fares: Fare[];
}

interface FareDate {
  year: number;
  month: number;
  day: number;
}

const FarePay: NextPage = () => {
  const { data } = useSWR<FaresResponse>("/api/fare/pay");
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<FareDate>();
  const [amount, setAmount] = useState(0);
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    if (data?.ok && user && data?.fares) {
      setDate(getDate(data.fares.at(0)!));
      setAmount(totalFare(data.fares.at(0)!));
      setDifference(amount - totalFare(data.fares.at(1)!));
      setLoading(false);
    }
  }, [data]);

  return (
    <Layout
      title={"요금 납부"}
      hasTabBar
      canGoBack
    >
      <Head>
        <title>Fare pay</title>
      </Head>
      <div className="bg-[#f5f5f5] grid">
        {loading ? (
          <section className="w-full grid justify-items-stretch h-screen">
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
          <>
            <div className={"flex flex-col space-y-5 divide-y mt-6 "}>
              <section
                className={
                  "bg-[#6667ab] opacity-60 border-2 rounded-2xl px-3  pb-4 mt-5 w-80  border-t-0 border-b-gray-300 shadow-md mx-auto"
                }
              >
                <p className="font-semibold text-xl mt-3 text-white">
                  {`디비아파트 ${user.household.aptDong}동 ${user.household.aptHo}호`}
                </p>
                <p className="text-xs mt-2 text-white">{`${date?.year}년 ${date?.month}월분`}</p>
                <p className="text-5xl float-right mt-2  text-white">
                  {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  <span className="text-base ">원</span>
                </p>
                <p className="mt-2 float-right text-sm text-white">
                  납부 마감일:{date?.month == 12 ? date?.year + 1 : date?.year}.
                  {date?.month == 12 ? 1 : date?.month! + 1}.{date?.day}
                </p>
                <div className="divide-y divide-gray-400 mt-24">
                  <div className="mt-2"></div>
                  <div className="mt-2"></div>
                </div>
                <div className="float-right text-sm mt-4 h-7 w-16 bg-white text-center leading-7 rounded-lg text-[#6667ab] text-opacity-80">
                  {data?.fares.at(0)?.isPaid ? " 완납" : "미납"}
                </div>
              </section>
            </div>

            <p className="text-gray-400 ml-5 mt-7">청구 금액</p>

            <section
              className={
                "bg-white border-2 rounded-2xl px-3  pb-4 mt-5 w-80 mx-auto border-t-0 border-b-gray-300 shadow-md"
              }
            >
              <p className="font-bold mt-6">이번 달 관리비</p>
              <p className="text-4xl mt-2">
                {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                <span className="text-base ml-1">원</span>
              </p>
              <p className="text-xs float-right text-[#5181ff]">
                전월 대비
                {" " +
                  difference.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원 변동
              </p>
              <div className="divide-y divide-gray-300 mt-6">
                <div></div>
                <div></div>
              </div>
              <p className="mt-4 font-semibold">
                당월부과액
                <span className="float-right">
                  {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {" 원 "}
                </span>
              </p>
              <p className="mt-4 font-semibold">
                할인금액<span className="float-right">- 원 </span>
              </p>
              <p className="mt-4 font-semibold">
                미납액<span className="float-right">- 원 </span>
              </p>
              <p className="mt-4 font-semibold">
                미납연체료<span className="float-right">- 원 </span>
              </p>
              <p className="mt-4 font-semibold">
                납기내금액<span className="float-right">- 원 </span>
              </p>
              <p className="mt-4 font-semibold">
                납기후연체료<span className="float-right">- 원 </span>
              </p>
              <p className="mt-4 font-semibold">
                납기후금액<span className="float-right">0 원 </span>
              </p>
            </section>
            {data?.fares.at(0)?.isPaid ? null : (
              <div className="w-60 h-14 font-black bg-[#6667ab] my-14 rounded-lg opacity-80 mx-auto ">
                <p className="text-white text-center text-lg ">
                  <button
                    className="mt-3"
                    onClick={() =>
                      pay("카드", {
                        amount,
                        orderId: `${
                          data?.fares.at(0)?.fareId
                        }lIJ-cs-36PKfaLwarmdqu`,
                        orderName: `${date?.year}년 ${date?.month}월 관리비`,
                        customerName: user?.name,
                        successUrl: "http://localhost:3000/farepay/success",
                        failUrl: "http://localhost:3000/farepay/fail",
                      })
                    }
                    type="submit"
                  >
                    결제
                  </button>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default FarePay;
