import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Link from "next/link";
import useUser from "@libs/client/useUser";
import { Switch } from "@mui/material";
import { useState } from "react";

const Profile: NextPage = () => {
  const { user, isLoading } = useUser();
  const [notice, setNotice] = useState(false);

  return (
    <Layout
      title={"마이페이지"}
      hasTabBar
      canGoBack
    >
      <Head>
        <title>Profile</title>
      </Head>

      <div className={"mx-6 my-5 space-y-8"}>
        {/* 내 정보 */}
        <section className={"bg-white border-2 rounded-lg px-3 border-[#D4D4D4] pb-4"}>
          <p className={"text-[#5F5F5F] text-sm mt-2 mb-5"}>내 정보</p>
          <div className={"flex items-center space-x-3"}>
            <div
              className={
                "flex justify-center items-center w-16 h-16 rounded-lg border-2 border-[#D4D4D4]"
              }
            >
              <svg
                width="40"
                height="40"
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

            <div className={"border-2 border-[#D4D4D4] rounded-lg w-3/4 h-16 pl-2 text-sm"}>
              <p>{user?.id}</p>
              <p>{user?.name}</p>
              <p>{user?.household?.aptDong + "동" + user?.household?.aptHo + "호"}</p>
            </div>
          </div>
        </section>

        {/* 개인 정보 변경 */}
        <section className={"bg-white border-2 rounded-lg px-3 border-[#D4D4D4] pb-4"}>
          <p className={"text-[#5F5F5F] text-sm mt-2 mb-5"}>개인정보</p>
          <div className={"space-y-6"}>
            <Link
              href={"/profile/changepw"}
              legacyBehavior
            >
              <a className={"flex items-center mx-3 space-x-3"}>
                <svg
                  width="15"
                  height="18"
                  viewBox="0 0 15 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5625 7.22222V5.44444C11.5625 2.98985 9.74366 1 7.5 1C5.25634 1 3.4375 2.98985 3.4375 5.44444V7.22222M7.5 11.2222V13M4.9 17H10.1C11.4651 17 12.1477 17 12.6691 16.7094C13.1277 16.4537 13.5006 16.0457 13.7343 15.544C14 14.9735 14 14.2268 14 12.7333V11.4889C14 9.99542 14 9.24868 13.7343 8.67825C13.5006 8.17648 13.1277 7.76853 12.6691 7.51287C12.1477 7.22222 11.4651 7.22222 10.1 7.22222H4.9C3.53487 7.22222 2.85231 7.22222 2.3309 7.51287C1.87225 7.76853 1.49936 8.17648 1.26567 8.67825C1 9.24868 1 9.99542 1 11.4889V12.7333C1 14.2268 1 14.9735 1.26567 15.544C1.49936 16.0457 1.87225 16.4537 2.3309 16.7094C2.85231 17 3.53487 17 4.9 17Z"
                    stroke="#444444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className={"font-bold"}>비밀번호 변경</p>
              </a>
            </Link>
            <Link
              href={"/profile/changeemail"}
              legacyBehavior
            >
              <a className={"flex items-center mx-3 space-x-3"}>
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.65 10.8L10 6.6M6 6.6L1.35002 10.8M1 3.1L6.71544 7.10081C7.17826 7.42478 7.40967 7.58677 7.66138 7.64952C7.88373 7.70494 8.11627 7.70494 8.33862 7.64952C8.59033 7.58677 8.82174 7.42478 9.28456 7.10081L15 3.1M4.36 12.2H11.64C12.8161 12.2 13.4042 12.2 13.8534 11.9711C14.2485 11.7698 14.5698 11.4485 14.7711 11.0534C15 10.6042 15 10.0161 15 8.84V4.36C15 3.18389 15 2.59583 14.7711 2.14662C14.5698 1.75148 14.2485 1.43022 13.8534 1.22889C13.4042 1 12.8161 1 11.64 1H4.36C3.18389 1 2.59583 1 2.14662 1.22889C1.75148 1.43022 1.43022 1.75148 1.22889 2.14662C1 2.59583 1 3.18389 1 4.36V8.84C1 10.0161 1 10.6042 1.22889 11.0534C1.43022 11.4485 1.75148 11.7698 2.14662 11.9711C2.59583 12.2 3.18389 12.2 4.36 12.2Z"
                    stroke="#444444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className={"font-bold"}>이메일 변경</p>
              </a>
            </Link>
          </div>
        </section>

        {/* 이용 안내 */}
        <section className={"bg-white border-2 rounded-lg px-3 border-[#D4D4D4] pb-4"}>
          <p className={"text-[#5F5F5F] text-sm mt-2 mb-5"}>이용 안내</p>
          <div className={"space-y-6"}>
            <Link
              href={"/profile/ask"}
              legacyBehavior
            >
              <a className={"flex items-center mx-3 space-x-3"}>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.44444 4.89063C6.58149 4.50106 6.85198 4.17256 7.20802 3.96331C7.56405 3.75407 7.98265 3.67758 8.38968 3.7474C8.79671 3.81721 9.16589 4.02883 9.43184 4.34476C9.6978 4.66069 9.84336 5.06056 9.84274 5.47353C9.84274 6.63932 8.09405 7.22222 8.09405 7.22222M8.11659 9.55556H8.12437M4.11111 12.6667V14.4832C4.11111 14.8976 4.11111 15.1048 4.19607 15.2113C4.26995 15.3038 4.38199 15.3577 4.50042 15.3575C4.6366 15.3574 4.79841 15.2279 5.12203 14.969L6.97739 13.4848C7.3564 13.1815 7.54591 13.0299 7.75693 12.9221C7.94415 12.8265 8.14344 12.7566 8.34939 12.7143C8.58152 12.6667 8.82421 12.6667 9.30958 12.6667H11.2667C12.5735 12.6667 13.2269 12.6667 13.726 12.4123C14.165 12.1886 14.522 11.8317 14.7457 11.3926C15 10.8935 15 10.2401 15 8.93333V4.73333C15 3.42654 15 2.77315 14.7457 2.27402C14.522 1.83498 14.165 1.47802 13.726 1.25432C13.2269 1 12.5735 1 11.2667 1H4.73333C3.42654 1 2.77315 1 2.27402 1.25432C1.83498 1.47802 1.47802 1.83498 1.25432 2.27402C1 2.77315 1 3.42654 1 4.73333V9.55556C1 10.2789 1 10.6405 1.07951 10.9372C1.29526 11.7425 1.92421 12.3714 2.72942 12.5872C3.02614 12.6667 3.3878 12.6667 4.11111 12.6667Z"
                    stroke="#444444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className={"font-bold"}>문의하기</p>
              </a>
            </Link>

            <Link
              href={"/profile/terms"}
              legacyBehavior
            >
              <a className={"flex items-center mx-3 space-x-3"}>
                <svg
                  width="16"
                  height="19"
                  viewBox="0 0 16 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.1765 9.64706V4.95294C14.1765 3.56928 14.1765 2.87745 13.9072 2.34896C13.6703 1.88409 13.2924 1.50614 12.8275 1.26928C12.299 1 11.6072 1 10.2235 1H4.95294C3.56928 1 2.87745 1 2.34896 1.26928C1.88409 1.50614 1.50614 1.88409 1.26928 2.34896C1 2.87745 1 3.56928 1 4.95294V13.5176C1 14.9013 1 15.5931 1.26928 16.1216C1.50614 16.5865 1.88409 16.9644 2.34896 17.2013C2.87745 17.4706 3.56926 17.4706 4.95288 17.4706H7.58824M9.64706 15L11.2941 16.6471L15 12.9412"
                    stroke="#444444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className={"font-bold"}>서비스 이용약관</p>
              </a>
            </Link>

            <Link
              href={"/profile/policy"}
              legacyBehavior
            >
              <a className={"flex items-center mx-3 space-x-3"}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 8L6.83333 10.3333L11.5 5.66667M4.73333 15H11.2667C12.5735 15 13.2269 15 13.726 14.7457C14.165 14.522 14.522 14.165 14.7457 13.726C15 13.2269 15 12.5735 15 11.2667V4.73333C15 3.42654 15 2.77315 14.7457 2.27402C14.522 1.83498 14.165 1.47802 13.726 1.25432C13.2269 1 12.5735 1 11.2667 1H4.73333C3.42654 1 2.77315 1 2.27402 1.25432C1.83498 1.47802 1.47802 1.83498 1.25432 2.27402C1 2.77315 1 3.42654 1 4.73333V11.2667C1 12.5735 1 13.2269 1.25432 13.726C1.47802 14.165 1.83498 14.522 2.27402 14.7457C2.77315 15 3.42654 15 4.73333 15Z"
                    stroke="#444444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className={"font-bold"}>개인정보 처리방침</p>
              </a>
            </Link>
          </div>
        </section>

        {/* 기타 */}
        <section className={"bg-white border-2 rounded-lg px-3 border-[#D4D4D4] pb-4"}>
          <p className={"text-[#5F5F5F] text-sm mt-2 mb-5"}>기타</p>
          <div className={"space-y-6"}>
            <div className={"flex items-center mx-3"}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 11.1111V8M8 4.88889H8.00778M4.73333 15H11.2667C12.5735 15 13.2269 15 13.726 14.7457C14.165 14.522 14.522 14.165 14.7457 13.726C15 13.2269 15 12.5735 15 11.2667V4.73333C15 3.42654 15 2.77315 14.7457 2.27402C14.522 1.83498 14.165 1.47802 13.726 1.25432C13.2269 1 12.5735 1 11.2667 1H4.73333C3.42654 1 2.77315 1 2.27402 1.25432C1.83498 1.47802 1.47802 1.83498 1.25432 2.27402C1 2.77315 1 3.42654 1 4.73333V11.2667C1 12.5735 1 13.2269 1.25432 13.726C1.47802 14.165 1.83498 14.522 2.27402 14.7457C2.77315 15 3.42654 15 4.73333 15Z"
                  stroke="#444444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className={"font-bold mx-3"}>정보 동의 설정</p>
              <Switch
                className={"ml-auto"}
                onClick={() => {
                  setNotice(!notice);
                }}
              />
            </div>

            <Link
              href={"/profile/withdrawal"}
              legacyBehavior
            >
              <a className={"flex items-center mx-3 space-x-3"}>
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4103 10.3333L15 13.9231M15 10.3333L11.4103 13.9231M8.17949 9.97436H4.94872C3.94678 9.97436 3.4458 9.97436 3.03815 10.098C2.12033 10.3764 1.40208 11.0947 1.12366 12.0125C1 12.4202 1 12.9211 1 13.9231M9.97436 4.23077C9.97436 6.01507 8.52789 7.46154 6.74359 7.46154C4.95929 7.46154 3.51282 6.01507 3.51282 4.23077C3.51282 2.44646 4.95929 1 6.74359 1C8.52789 1 9.97436 2.44646 9.97436 4.23077Z"
                    stroke="#444444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className={"font-bold"}>회원 탈퇴</p>
              </a>
            </Link>

            <Link
              href={"/"}
              legacyBehavior
            >
              <a
                onClick={async () => await fetch("api/users/logout")}
                className={"flex items-center mx-3 space-x-3"}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="-2 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.25 1.75H5.25C4.85218 1.75 4.47064 1.87292 4.18934 2.09171C3.90804 2.3105 3.75 2.60725 3.75 2.91667V11.0833C3.75 11.3928 3.90804 11.6895 4.18934 11.9083C4.47064 12.1271 4.85218 12.25 5.25 12.25H11.25M14.25 7L11.25 4.66667M14.25 7L11.25 9.33333M14.25 7H6.75"
                    stroke="#444444"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className={"font-bold"}>로그아웃</p>
              </a>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Profile;
