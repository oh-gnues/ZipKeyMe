// 차량 등록 페이지

import type {NextPage} from 'next'
import Layout from "@components/Layout";
import Head from "next/head";
import {Car} from "@prisma/client";
import {useForm} from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import {useEffect} from "react";
import {useRouter} from "next/dist/client/router";
import Input from "@components/Input";
import Button from "@components/Button";

interface RegisterCarForm {
	carNumberFirst: string;
	carNumberMiddle: string;
	carNumberLast: string;
	carName: string;
	owner: string;
	ownerPhone: string;
}

interface RegisterCarMutation {
	ok: boolean;
	car: Car;
}

const RegisterCar: NextPage = () => {
	const router = useRouter();
	const {register, handleSubmit} = useForm<RegisterCarForm>();
	const [registerCar, {loading, data}] = useMutation<RegisterCarMutation>(`/api/car`);
	const onValid = (data: RegisterCarForm) => {
		if (loading) return;
		registerCar(data);
	}

	useEffect(() => {
		if (data?.ok) {
			router.push("/car");
		}
	}, [data, router]);

	return (
		<Layout title={"차량 등록"} canGoBack>
			<Head><title>차량 등록</title></Head>
			<form className={"space-y-5 px-5"} onSubmit={handleSubmit(onValid)}>
				{/* 차량 번호 */}
				<section>
					<div>
						<h2 className={"mt-5 font-bold"}>차량번호</h2>
					</div>
					<div className={"flex justify-between space-x-5"}>
						<Input
							name={"carNumberFirst"}
							type={"number"}
							required
							placeholder={"12"}
							register={register("carNumberFirst", {required: true})}
						/>

						<Input
							name={"carNumberMiddle"}
							type={"text"}
							required
							placeholder={"가"}
							register={register("carNumberMiddle", {required: true})}
						/>
						<Input
							name={"carNumberLast"}
							type={"number"}
							required
							placeholder={"1234"}
							register={register("carNumberLast", {required: true})}
						/>
					</div>
				</section>

				{/* 차량 이름 */}
				<section>
					<div>
						<h2 className={"mt-5 font-bold"}>차량 이름</h2>
					</div>
					<div>
						<Input
							name={"carName"}
							type={"text"}
							register={register("carName", {required: true})}
							required
							placeholder={"차량 이름을 입력하세요."}
						/>
					</div>
				</section>

				{/* 차량 소유주 이름 */}
				<section>
					<div>
						<h2 className={"mt-5 font-bold"}>차량 소유주 이름</h2>
					</div>
					<div>
						<Input
							name={"owner"}
							type={"text"}
							register={register("owner", {required: true})}
							required
							placeholder={"차량 소유주 이름을 입력하세요."}
						/>
					</div>
				</section>

				{/* 소유주 전화번호 */}
				<section>
					<div>
						<h2 className={"mt-5 font-bold"}>전화번호</h2>
					</div>
					<div>
						<Input
							name={"ownerPhone"}
							type={"text"}
							register={register("ownerPhone", {required: true})}
							required
							placeholder={"차량 소유주 전화번호를 입력해주세요."}
						/>
					</div>
				</section>

				{/* 등록 버튼 */}
				<section>
					<Button text={loading ? "로딩 중..." : "등록"} />
				</section>
			</form>
		</Layout>
	);
}

export default RegisterCar;