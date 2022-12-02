import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const FareCheckDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR(`/api/fare/${router.query.id}`);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data?.ok) setLoading(false);
  }, [data]);

  const fareList = [
    {
      desc: "heating",
      amount: loading ? 0 : data?.fare.heating,
      name: "세대 난방비",
    },
    {
      desc: "water",
      amount: loading ? 0 : data?.fare.water,
      name: "세대 수도료",
    },
    {
      amount: loading ? 0 : data?.fare.commonElectricity,
      name: "공동 전기료",
    },
    {
      amount: loading ? 0 : data?.fare.elevatorElectricity,
      name: "승강기 전기료",
    },
    {
      amount: loading ? 0 : data?.fare.householdWaste,
      name: "생활폐기물 수수료",
    },
    {
      desc: "management",
      amount: loading ? 0 : data?.fare.management,
      name: "일반 관리비",
    },
    {
      amount: loading ? 0 : data?.fare.representative,
      name: "대표회의운영비",
    },
    {
      amount: loading ? 0 : data?.fare.buildingInsurance,
      name: "건물보험료",
    },
    {
      desc: "expenses",
      amount: loading ? 0 : data?.fare.expenses,
      name: "경비비",
    },
    {
      desc: "disinfection",
      amount: loading ? 0 : data?.fare.disinfection,
      name: "소독비",
    },
    {
      amount: loading ? 0 : data?.fare.consignmentManagement,
      name: "위탁관리수수료",
    },
    {
      amount: loading ? 0 : data?.fare.longTermRepairs,
      name: "장기수선충당금",
    },
  ];

  const totalFare = fareList
    .map((fare) => fare.amount)
    .reduce((a, b) => a + b, 0);

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Layout
      title={"상세 고지 내역"}
      hasTabBar
      canGoBack
    >
      <Head>
        <title>상세 고지 내역</title>
      </Head>

      <div className={"mt-5"}>
        <div
          className={
            "bg-white border border-t-0 shadow-lg rounded-2xl p-5 mx-8 divide-y"
          }
        >
          {/* 총 관리비 */}
          <section>
            <p className="font-bold">이번 달 관리비</p>
            <p className="text-5xl mt-2 space-x-2">
              <span>{numberWithCommas(totalFare)}</span>
              <span className="text-xl">원</span>
            </p>
          </section>

          {/* 관리비 세부 항목 */}
          <section className={"mt-5 pt-5 text-base space-y-4"}>
            {fareList.map((fare, index) => (
              <p className="flex justify-between items-center">
                <span>{fare.name}</span>
                <span>{numberWithCommas(fare.amount)} 원</span>
              </p>
            ))}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default FareCheckDetail;
