import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";

const Chats: NextPage = () => {
  return (
    <Layout
      title={"투표"}
      hasTabBar
      canGoBack
    >
      <Head>
        <title>vote</title>
      </Head>
    </Layout>
  );
};

export default Chats;
