import type {NextPage} from 'next'
import Layout from "@components/Layout";
import Head from "next/head";

const FareCheckDetail: NextPage = () => {
	const fareList = [
		{ desc: 'heating',               amount: 19320, name: "세대 난방비" },
		{ desc: 'water',                 amount: 58390, name: "세대 수도료" },
		{ desc: 'commonElectricity',     amount: 1590,  name: "공동 전기료" },
		{ desc: 'elevatorElectricity',   amount: 390,   name: "승강기 전기료" },
		{ desc: 'householdWaste',        amount: 0,     name: "생활폐기물 수수료" },
		{ desc: 'management',            amount: 10000, name: "일반 관리비" },
		{ desc: 'representative',        amount: 0,     name: "대표회의운영비" },
		{ desc: 'buildingInsurance',     amount: 1500,  name: "건물보험료" },
		{ desc: 'expenses',              amount: 2640,  name: "경비비" },
		{ desc: 'disinfection',          amount: 5630,  name: "소독비" },
		{ desc: 'consignmentManagement', amount: 3020,  name: "위탁관리수수료" },
		{ desc: 'longTermRepairs',       amount: 3700,  name: "장기수선충당금" },
	];

	const totalFare = fareList.map(fare => fare.amount).reduce((a, b) => a + b, 0);

	function numberWithCommas(x: number) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	return (
		<Layout title={"상세 고지 내역"} hasTabBar canGoBack>
			<Head><title>상세 고지 내역</title></Head>

			<div className={"mt-5"}>
				<div className={"bg-white border border-t-0 shadow-lg rounded-2xl p-5 mx-8 divide-y"}>
					{/* 총 관리비 */}
					<section>
						<p className="font-bold">
							이번 달 관리비
						</p>
						<p className="text-5xl mt-2 space-x-2">
							<span>{numberWithCommas(totalFare)}</span>
							<span className="text-xl">원</span>
						</p>
					</section>

					{/* 관리비 세부 항목 */}
					<section className={"mt-5 pt-5 text-base space-y-4"}>
						{fareList.map((fare, index) => (
							<p className="flex justify-between items-center">
								<span>{fare.name}</span>
								<span>{numberWithCommas(fare.amount)} 원</span>
							</p>
						))}
					</section>
				</div>
			</div>
		</Layout>
	);
}

export default FareCheckDetail;