import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import FareMontly from "@components/FareMontly";
import useSWR from "swr";
import { Fare } from "@prisma/client";
import useUser from "@libs/client/useUser";
import fare from "pages/api/fare";

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
            month={+getDateData(fare).month}
            address={
              "디비아파트 " +
              user?.household.aptDong +
              "동 " +
              user?.household.aptHo +
              "호"
            }
            year={+getDateData(fare).year}
            fare={getTotal(fare)}
            dueDateYear={
              getDateData(fare).month == 12
                ? getDateData(fare).year + 1
                : getDateData(fare).year
            }
            dueDateMonth={
              getDateData(fare).month == 12 ? 1 : getDateData(fare).month + 1
            }
            dueDateDay={+getDateData(fare).day}
            detailID={fare.fareId}
          />
        ))}
      </div>
    </Layout>
  );
};

function getTotal(fare: Fare) {
  let total = 0;
  total += fare.heating;
  total += fare.water;
  total += fare.commonElectricity;
  total += fare.elevatorElectricity;
  total += fare.householdWaste;
  total += fare.management;
  total += fare.representative;
  total += fare.buildingInsurance;
  total += fare.expenses;
  total += fare.disinfection;
  total += fare.consignmentManagement;
  total += fare.longTermRepairs;

  return total;
}
function getDateData(fare: Fare): { year: number; month: number; day: number } {
  const splitFareAt = fare.fareAt.toString().split("-");
  return {
    year: +splitFareAt[0],
    month: +splitFareAt[1],
    day: 1,
  };
}

export default Fare;
