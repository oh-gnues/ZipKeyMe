import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import FareMontly from "@components/FareMontly";
import useSWR from "swr";
import { Fare } from "@prisma/client";
import useUser from "@libs/client/useUser";
import totalFare from "@libs/client/totalFare";
import getDate from "@libs/client/getDate";

interface FaresResponse {
  ok: boolean;
  fares: Fare[];
}

const Fare: NextPage = () => {
  const { data } = useSWR<FaresResponse>("/api/fare");
  const { user } = useUser();
  return (
    <Layout
      title={"요금 조회"}
      hasTabBar
      canGoBack
    >
      <Head>
        <title>요금 조회</title>
      </Head>
      <div className={"mt-5 space-y-10"}>
        {data?.fares?.map((fare) => (
          <FareMontly
            key={fare.fareId}
            month={+getDate(fare).month}
            address={
              "디비아파트 " +
              user?.household.aptDong +
              "동 " +
              user?.household.aptHo +
              "호"
            }
            year={+getDate(fare).year}
            fare={totalFare(fare)}
            dueDateYear={
              getDate(fare).month == 12
                ? getDate(fare).year + 1
                : getDate(fare).year
            }
            dueDateMonth={
              getDate(fare).month == 12 ? 1 : getDate(fare).month + 1
            }
            dueDateDay={+getDate(fare).day}
            detailID={fare.fareId}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Fare;
