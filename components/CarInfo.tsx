interface CarInfoProps {
	number: string;
	name: string;
	owner: string;
	enrollAt?: string;
}

export default function CarInfo({number, name, owner, enrollAt}: CarInfoProps) {
	return (
		<div>
			<div className={"mx-8 bg-white border rounded-2xl p-5 pb-4 mt-5 shadow-md divide-y space-y-5"}>
				{/* 차량 이름 및 차량 소유주 */}
				<section className={"space-y-3"}>
					<p className={"text-3xl"}>
						{name}
					</p>
					<p className={"text-xl"}>
						소유주: {owner}
					</p>
				</section>
				{/* 차량 번호 및 등록 날짜 */}
				<section className={"pt-5 space-y-4"}>
					<p className="text-5xl font-bold flex items-baseline justify-end space-x-2.5">
						{number}
					</p>
					<p className="text-md flex items-center justify-end">
						등록날짜: {enrollAt?.toString().substring(0, 10)}
					</p>
				</section>
			</div>
		</div>
	)
}