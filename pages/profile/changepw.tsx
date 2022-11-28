import type {NextPage} from 'next'
import Layout from "@components/Layout";
import Head from "next/head";

const ChangePW: NextPage = () => {
	return (
		<Layout title={"비밀번호 변경"} hasTabBar canGoBack>
			<Head><title>비밀번호 변경</title></Head>
			<div className={"space-y-8"}>

				{/* 기존 비밀번호 */}
				<section className={"mx-8 mt-12"}>
					<label htmlFor={"oldPW"}>
						<input
							className={"w-full border-t-0 border-x-0"}
							type={"password"}
							id={"oldPW"}
							name={"oldPW"}
							placeholder={"기존 비밀번호를 입력해주세요."} />
					</label>
				</section>

				{/* 변경할 비밀번호 */}
				<section className={"mx-8"}>
					<label htmlFor={"newPW"}>
						<input
							className={"w-full border-t-0 border-x-0"}
							type={"password"}
							id={"newPW"}
							name={"newPW"}
							placeholder={"변경할 비밀번호를 입력해주세요."} />
					</label>
				</section>

				{/* 변경할 비밀번호 다시 입력 */}
				<section className={"mx-8"}>
					<label htmlFor={"newPW2"}>
						<input
							className={"w-full border-t-0 border-x-0"}
							type={"password"}
							id={"newPW2"}
							name={"newPW2"}
							placeholder={"변경할 비밀번호를 다시 입력해주세요."} />
					</label>
				</section>
			</div>

			{/* 비밀번호 변경 버튼 */}
			<div className={"mx-8 mt-12"}>
				<button
					className={"mt-2 w-full bg-pantone text-white py-2 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-pantone focus:outline-none"}>
					변경
				</button>
			</div>
		</Layout>
	);
}

export default ChangePW;