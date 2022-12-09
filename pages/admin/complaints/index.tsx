import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import useSWR from "swr";
import Complaint from "@components/Complaint";

type Complaint = {
  comId: number;
  id: string;
  comAt: Date;
  category: string;
  title: string;
  state: string;
  users: {
    name: string;
  };
};

interface ComplaintResponse {
  ok: boolean;
  complaint: Complaint[];
}

const Complaints: NextPage = () => {
  const { data } = useSWR<ComplaintResponse>("/api/complaint");
  console.log(data);
  return (
    <Layout
      title={"민원"}
      canGoBack
    >
      <Head>
        <title>민원</title>
      </Head>
      <section className={"divide-y"}>
        {data?.complaint?.map((complaint) => (
          <Complaint
            inAdmin
            key={complaint.comId}
            comId={complaint.comId}
            category={complaint.category}
            title={complaint.title}
            comAt={complaint.comAt}
            state={complaint.state}
            user={complaint.users.name}
          />
        ))}
      </section>
    </Layout>
  );
};

export default Complaints;
