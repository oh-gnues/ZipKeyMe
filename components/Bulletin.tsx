import Link from "next/link";
import React from "react";

interface BulletinProps {
  id: number; // id of the bulletin
  title: string;
  content: string;
  createdAt: string;
  userId: string; // id of the user
  comments?: number;
  hearts?: number;
  isNotice: boolean;
  writer: string;
  inAdmin?: boolean;
}

export default function Bulletin({
  id,
  title,
  content,
  createdAt,
  comments,
  hearts,
  userId,
  isNotice,
  writer,
  inAdmin,
}: BulletinProps) {
  return (
    <Link
      href={
        inAdmin
          ? isNotice
            ? `/admin/notice/${id}`
            : `/admin/bulletins/${id}`
          : isNotice
          ? `/notice/${id}`
          : `/bulletins/${id}`
      }
      legacyBehavior
    >
      <a className={"flex cursor-pointer flex-col pt-4 items-start"}>
        {/* 게시글 제목 */}
        <div className={"px-4"}>{title}</div>

        {/* 게시글 내용 (간단히) */}
        <span className={"flex items-center mt-2 px-4 py-1 text-xs font-medium text-gray-400"}>
          {content}
        </span>

        {/* 날짜 및 작성자 */}
        <div className={"px-4 flex items-center w-full font-medium text-xs my-2.5"}>
          <div className={"flex mr-auto space-x-2.5"}>
            <span className={"text-gray-500"}>{createdAt}</span>
            {/* TODO : 유저 ID를 통해 유저의 이름을 가져오기 */}
            <span>{writer}</span>
          </div>
          {isNotice ? null : (
            <>
              {/*	하트 수 */}
              <div className={"flex ml-auto space-x-2.5"}>
                <div className={"flex space-x-0.5 items-center text-sm text-[#E43520]"}>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{hearts}</span>
                </div>

                {/* 댓글 수 */}
                <div className={"flex space-x-0.5 items-center text-sm text-[#3AB5EA]"}>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span>{comments}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </a>
    </Link>
  );
}
