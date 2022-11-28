import Link from "next/link";
import BACKICON from "../public/jump_icon.svg";

interface FareMoneyProps {
	address: string;
	year: number;
	month: number;
	fare: number;
	dueDateYear: number;
	dueDateMonth: number;
	dueDateDay: number;
	detailID: number;
}

export default function FareMontly({address, year, month, fare, dueDateYear, dueDateMonth, dueDateDay, detailID}: FareMoneyProps) {
	return (
		<div>
			<div className={"mx-8 bg-white border rounded-2xl p-5 pb-4 mt-5 shadow-md divide-y space-y-3"}>
				{/* 주소 및 금액 */}
				<section className={"space-y-3"}>
					<p className="text-xl">
						{address}
					</p>
					<p className="text-xs">
						{year}년 {month}월분
					</p>
					<p className="text-5xl flex items-baseline justify-end space-x-2.5">
						<span>{fare.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
						<span className='text-xl'>원</span>
					</p>
					<p className="text-sm flex items-center justify-end">
						납부 마감일: {dueDateYear}. {dueDateMonth}. {dueDateDay}.
					</p>
				</section>

				{/* 상세 고지 내역 버튼 */}
				<section className={"pt-3"}>
					<Link href={`/farecheck/${detailID}`} className={"flex justify-between items-center"}>
						<span>상세 고지 내역</span>
						<BACKICON/>
					</Link>
				</section>
			</div>
		</div>
	)
}