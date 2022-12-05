import type {NextPage} from 'next'
import Layout from "@components/Layout";
import Head from "next/head";
import useSWR from "swr";
import { Car } from "@prisma/client";
import CarInfo from "@components/CarInfo";
import FloatingButton from "@components/FloatingButton";

interface CarResponse {
	ok: boolean;
	car: Car[];
}

const Car: NextPage = () => {
	const {data} = useSWR<CarResponse>('/api/car');

	return (
		<Layout title={"차량 조회"} hasTabBar canGoBack>
			<Head><title>차량 조회</title></Head>
			<div>
				{data?.car?.map((car) => (
					<CarInfo
						number={car.number}
						name={car.carName}
						owner={car.owner}
						enrollAt={car.enrollAt?.toString()}
					/>
				))}
			</div>

			<FloatingButton href={"/car/register"}>
				<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
				     stroke="currentColor" aria-hidden="true">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
				</svg>
			</FloatingButton>
		</Layout>
	);
}

export default Car;