import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Button from "@components/Button";
import { useRouter } from "next/router";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";

const fail: NextPage = () => {
  const router = useRouter();
  return (
    <Layout
      title={"요금 납부"}
      hasTabBar
    >
      <Head>
        <title>납부 실패</title>
      </Head>
      <div className="absolute mt-24 inset-x-0 z-0 grid justify-items-center place-content-center">
        <DoNotDisturbAltOutlinedIcon sx={{ fontSize: 400, color: "#f1f3f5" }} />
      </div>
      <div className="h-[70vh] grid justify-items-center  place-content-center">
        <h1 className="antialiased font-bold text-8xl z-10 text-neutral-400">결제 실패</h1>
      </div>
      <Button
        large
        onClick={() => router.push("/")}
        text={"메인페이지로 돌아가기"}
      />
    </Layout>
  );
};

export default fail;
