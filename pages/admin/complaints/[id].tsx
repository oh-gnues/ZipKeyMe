import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import useSWR from "swr";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import useMutation from "@libs/client/useMutation";

type Complaint = {
  comId: number;
  id: string; // user ID
  title: string;
  content: string;
  comAt: Date;
  state: string;
  users: {
    name: string;
  };
  category: string;
};

interface ComplaintDetailResponse {
  ok: Boolean;
  complaint: Complaint;
}

const ComplaintDetail: NextPage = () => {
  const router = useRouter();
  const comId = router.query.id;
  const [updateState] = useMutation(`/api/admin/complaint/${comId}`);
  const { data, mutate } = useSWR<ComplaintDetailResponse>(
    router.query.id ? `/api/complaint/${comId}` : null
  );

  const clickStateBtn = (e: React.SyntheticEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    console.log({ state: target.id });
    updateState({ state: target.id });
  };

  return (
    <Layout
      title={"민원 상세"}
      canGoBack
    >
      <Head>
        <title>{data?.complaint?.title}</title>
      </Head>

      {/* 유저 프로필 */}
      <section>
        <div className={"flex mt-5 mb-3 px-4 pb-2 items-center space-x-3"}>
          <div className={"flex justify-center items-center w-10 h-10 rounded-lg border-2"}>
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 21.5C4.09532 18.5854 7.61891 16.7941 11.5 16.7941C15.3811 16.7941 18.9047 18.5854 21.5 21.5M16.5 6.79412C16.5 9.71798 14.2614 12.0882 11.5 12.0882C8.73858 12.0882 6.5 9.71798 6.5 6.79412C6.5 3.87026 8.73858 1.5 11.5 1.5C14.2614 1.5 16.5 3.87026 16.5 6.79412Z"
                stroke="#444444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className={"text-sm font-bold text-gray-700"}>{data?.complaint?.users?.name}</p>
            <p className={"text-xs text-gray-500"}>
              {("" + data?.complaint?.comAt).substring(0, 10)}
            </p>
          </div>
        </div>
      </section>

      {/* 게시글 내용 */}
      <section className={"relative pb-16 px-4"}>
        <p className={"my-2 text-2xl font-bold"}>{data?.complaint?.title}</p>
        <p className={"text-gray-800 leading-relaxed"}>{data?.complaint?.content}</p>
      </section>

      <section className="mx-3">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup
            fullWidth
            size="large"
            orientation="vertical"
            aria-label="vertical outlined button group"
          >
            {data?.complaint.state === "DONE" ? null : (
              <Button
                onClick={(e) => clickStateBtn(e)}
                fullWidth
                color="success"
                size="large"
                disabled={data?.complaint.state !== "YET"}
                id="ING"
                sx={{ fontWeight: "heavy" }}
              >
                {data?.complaint.state === "ING" ? "접수 중" : "접수"}
              </Button>
            )}
            {data?.complaint.state === "YET" ? null : (
              <Button
                onClick={(e) => clickStateBtn(e)}
                color="error"
                fullWidth
                size="large"
                disabled={data?.complaint.state === "DONE"}
                id="DONE"
                sx={{ fontWeight: "heavy" }}
              >
                {data?.complaint.state === "DONE" ? "처리 완료" : "처리"}
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </section>
    </Layout>
  );
};

export default ComplaintDetail;
