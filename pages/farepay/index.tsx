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
import Button from "@components/Button";

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
  const [beforeAmount, setBeforeAmount] = useState(0);

  useEffect(() => {
    if (data?.ok && user && data?.fares) {
      setDate(getDate(data.fares.at(0)!));
      setAmount(totalFare(data.fares.at(0)!));
      setBeforeAmount(totalFare(data.fares.at(1)!));
      setLoading(false);
    }
  }, [data]);

  return (
    <Layout title={"요금 납부"} canGoBack>
      <Head><title>요금 납부</title></Head>

      <div>
        {loading ? (          // 로딩 중
          <div className="grid place-content-center h-screen">
              <svg
                className="w-20 h-40 m-3 text-pantone animate-spin justify-self-center"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle className="opacity-10" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            </div>
        ) : (
          <div className={"mx-8"}>
            {/* 현재 납부 금액 */}
            <section className={"mt-12 divide-y bg-pantone opacity-60 border-2 rounded-2xl p-5 w-full border-t-0 shadow-md"}>
              <div className={"space-y-2 mb-2 text-white"}>
                {/* 주소 */}
                <p className="font-bold text-xl">
                  디비아파트 {user?.household.aptDong}동 {user?.household.aptHo}호
                </p>
                {/* 2022년 00월 분 */}
                <p className="text-sm">{`${date?.year}년 ${date?.month}월분`}</p>
                {/* 총 금액 */}
                <p className="flex justify-end items-baseline text-5xl space-x-2 font-semibold">
                  <span>{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  <span className="text-base">원</span>
                </p>
                {/* 납무 마감일 */}
                <p className="flex justify-end items-baseline text-sm">
                  납부 마감일: {date?.month == 12 ? date?.year + 1 : date?.year}. {date?.month == 12 ? 1 : date?.month! + 1}. {date?.day}.
                </p>
              </div>

              <div className={"pt-5 flex justify-end"}>
                <span className={"flex items-center justify-center w-14 p-0.5 text-sm bg-white text-pantone rounded-lg"}>
                  {data?.fares.at(0)?.isPaid ? "완납" : "미납"}
                </span>
              </div>
            </section>

            {/* 청구 금액 */}
            <p className="text-gray-400 mt-8">청구 금액</p>

            {/* 이번 달 관리비 */}
            <section className={"mt-5 rounded-2xl p-5 w-full shadow-md divide-y"}>
              {/* 이번 달 관리비 금액 및 전월 대비 금액 */}
              <div className={"mb-1"}>
                <p className="font-bold mt-6">이번 달 관리비</p>
                <p className="text-4xl mt-2 space-x-2">
                  <span className={"text-4xl font-semibold"}>
                    {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  <span className="text-xl">
                    원
                  </span>
                </p>
                <p className="flex justify-end text-xs text-[#5181ff]">
                  전월 대비
                  {amount - beforeAmount > 0
                    ? ` ${(amount - beforeAmount)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 증가`
                    : ` ${(beforeAmount - amount)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 감소`}
                </p>
              </div>
              <div className={"space-y-4"}>
                <p className="flex justify-between mt-4">
                  당월 부과액
                  <span>
                    {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    {" 원 "}
                  </span>
                </p>
                <p className="flex justify-between">
                  할인 금액<span>- 원 </span>
                </p>
                <p className="flex justify-between">
                  미납액<span>- 원 </span>
                </p>
                <p className="flex justify-between">
                  미납 연체료<span>- 원 </span>
                </p>
                <p className="flex justify-between">
                  납기 내 금액<span>- 원 </span>
                </p>
                <p className="flex justify-between">
                  납기 후 연체료<span>- 원 </span>
                </p>
                <p className="flex justify-between">
                  납기 후 금액<span>{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</span>
                </p>
              </div>
            </section>

            {/* 결제 버튼 */}
            <section className={"mt-8"}>
              {data?.fares.at(0)?.isPaid ? null : (
                <div className="h-14 font-black bg-pantone my-4 mb-7 rounded-lg opacity-80 mx-auto ">
                  <p className="text-white text-center text-lg ">
                    <Button
                      onClick={() =>
                        pay("카드", {
                          amount,
                          orderId: `${data?.fares.at(0)?.fareId}-lIJ-cs-36PKfaLwarmdqu`,
                          orderName: `${date?.year}년 ${date?.month}월 관리비`,
                          customerName: user?.name,
                          successUrl: "http://localhost:3000/farepay/success",
                          failUrl: "http://localhost:3000/farepay/fail",
                        })
                      }
                      type="submit"
                      text={"결제"}
                      large
                    />
                  </p>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FarePay;
