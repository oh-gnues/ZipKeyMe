import Link from "next/link";
import React from "react";
import { cls } from "@libs/client/utils";

interface ComplaintProps {
  comId: number;
  category: string;
  title: string;
  comAt: Date;
  state: string;
  user: string;
  inAdmin?: boolean;
}

export default function Complaint({
  comId,
  category,
  title,
  comAt,
  state,
  user,
  inAdmin = false,
}: ComplaintProps) {
  let categoryName = "";

  switch (category) {
    case "PUBLIC":
      categoryName = "공공시설";
      break;
    case "FLAW":
      categoryName = "주거공간 내 하자";
      break;
    case "LEAK":
      categoryName = "누수";
      break;
    case "FREEZE":
      categoryName = "동파";
      break;
    case "IN_OR_OUT":
      categoryName = "전입/전출";
      break;
    case "FARE":
      categoryName = "관리비";
      break;
    case "CAR":
      categoryName = "차량";
      break;
    case "ETC":
      categoryName = "기타";
      break;
  }

  return (
    <Link
      href={inAdmin ? `/admin/complaints/${comId}` : `/complaints/${comId}`}
      legacyBehavior
    >
      <a
        className={cls(
          "flex cursor-pointer flex-col pt-4 items-start",
          state === "DONE" ? "text-gray-300" : ""
        )}
      >
        {/* 민원 제목 */}
        <div className={"px-4 font-semibold"}>
          [{categoryName}] {title}
        </div>

        {/* 처리 상태 */}
        <span
          className={cls(
            "flex items-center mt-2 px-4 py-1 text-xs font-medium",
            state === "DONE" ? "" : state === "YET" ? "text-blue-500" : "text-gray-400"
          )}
        >
          {state === "YET" ? "접수 전" : state === "ING" ? "접수 완료" : "처리 완료"}
        </span>

        {/* 날짜 및 작성자 */}
        <div className={"px-4 flex items-center w-full font-medium text-xs my-2.5"}>
          <div className={cls("flex mr-auto space-x-2.5", state === "DONE" ? "" : "text-gray-400")}>
            <span>{("" + comAt).substring(0, 10)}</span>
            <span>{user}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
