import type {NextPage} from 'next'
import Layout from "@components/Layout";
import Head from "next/head";
import FareMontly from "@components/FareMontly";

const Fare: NextPage = () => {
  return (
    <Layout title={"요금 조회"} hasTabBar canGoBack>
      <Head><title>요금 조회</title></Head>
      <div className={"mt-5 space-y-10"}>
        {[11, 10, 9, 8, 7, 6, 5].map((month, index) => (
          <FareMontly
            month={month}
            address={"한양대학로 43-1 202호"}
            year={2022}
            fare={123456}
            dueDateYear={2022}
            dueDateMonth={month}
            dueDateDay={30}
            detailID={index}
          />
        ))}
      </div>
    </Layout>
  );
}

export default Fare;