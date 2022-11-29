import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";

const ChangeEmail: NextPage = () => {
  return (
    <Layout
      title={"이메일 변경"}
      hasTabBar
      canGoBack
    >
      <Head>
        <title>이메일 변경</title>
      </Head>
      <div className={"space-y-8"}>
        {/* 기존 이메일 */}
        <section className={"mx-8 mt-12"}>
          <label htmlFor={"oldEmail"}>
            <input
              className={"w-full border-t-0 border-x-0"}
              type={"email"}
              id={"oldEmail"}
              name={"oldEmail"}
              placeholder={"기존 이메일을 입력해주세요."}
            />
          </label>
        </section>

        {/* 변경할 이메일 */}
        <section className={"mx-8"}>
          <label htmlFor={"newEmail"}>
            <input
              className={"w-full border-t-0 border-x-0"}
              type={"email"}
              id={"newEmail"}
              name={"newEmail"}
              placeholder={"변경할 이메일을 입력해주세요."}
            />
          </label>
        </section>

        {/* 변경할 이메일 다시 입력 */}
        <section className={"mx-8"}>
          <label htmlFor={"newEmail2"}>
            <input
              className={"w-full border-t-0 border-x-0"}
              type={"email"}
              id={"newEmail2"}
              name={"newEmail2"}
              placeholder={"변경할 이메일을 다시 입력해주세요."}
            />
          </label>
        </section>
      </div>

      {/* 이메일 변경 버튼 */}
      <div className={"mx-8 mt-12"}>
        <button
          className={
            "mt-2 w-full bg-pantone text-white py-2 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-pantone focus:outline-none"
          }
        >
          변경
        </button>
      </div>
    </Layout>
  );
};

export default ChangeEmail;
