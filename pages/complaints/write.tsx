import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Button from "@components/Button";
import TextArea from "@components/Textarea";
import Input from "@components/Input";
import {useForm, UseFormRegisterReturn} from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import {Complaint} from "@prisma/client";
import {useEffect, useState, Fragment} from "react";
import {router} from "next/client";
import { Listbox, Transition } from '@headlessui/react';
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid';

interface WriteComplaintForm {
	title: string;
	content: string;
	category: string;
	register: UseFormRegisterReturn;
}

interface WriteComplaintMutation {
	ok: boolean;
	complaint: Complaint;
}

const categories = [
	{ id: 1, name: '공공시설', value: "PUBLIC", unavailable: false },
	{ id: 2, name: '주거공간 내 하자', value: "FLAW", unavailable: false },
	{ id: 3, name: '누수', value: "LEAK", unavailable: false },
	{ id: 4, name: '동파', value: "FREEZE", unavailable: true },
	{ id: 5, name: '전입/전출', value: "IN_OR_OUT", unavailable: false },
	{ id: 6, name: '관리비', value: "FARE", unavailable: false },
	{ id: 7, name: '기타', value: "ETC", unavailable: false },
]

const Write: NextPage = () => {
	const {register, handleSubmit} = useForm<WriteComplaintForm>();
	const [writeComplaint, {loading, data}] = useMutation<WriteComplaintMutation>(`/api/complaint`);
	const onValid = (data: WriteComplaintForm) => {
		if (loading) return;
		writeComplaint(data);
	};

	const [selectedCategory, setSelectedCategory] = useState(categories[0]);

	const registerCategory = register("category", { required: true, value: selectedCategory.value });

	useEffect(() => {
		if (data?.ok) {
			router.push(`/complaints/${data.complaint.comId}`);
		}
	}, [data, router]);

	return (
		<Layout title={"민원 작성"} hasTabBar canGoBack>
			<Head>
				<title>민원 작성</title>
			</Head>
			<form className={"p-4 space-y-4"} onSubmit={handleSubmit(onValid)}>
				{/* 제목 */}
				<Input
					required
					label={"제목"}
					name={"title"}
					type={"text"}
					placeholder={"제목을 입력해주세요."}
					register={register("title", {required: true})}
				/>

				{/* 카테고리 선택 */}
				<label className="mb-1 block text-sm font-medium text-gray-700">
					카테고리
				</label>
				<Listbox
					value={selectedCategory}
					{...registerCategory}
					onChange={setSelectedCategory}
				>
					<div className="relative mt-1">
						<Listbox.Button className="relative border border-gray-300 w-full cursor-default rounded-md py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-pantone-light sm:text-sm">
							<span className="block truncate">{selectedCategory.name}</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
	              className="h-5 w-5 text-gray-400"
	              aria-hidden="true"
              />
            </span>
						</Listbox.Button>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{categories.map((category, categoryIdx) => (
									<Listbox.Option
										key={categoryIdx}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? 'bg-pantone-lighter' : 'text-gray-900'
											}`
										}
										value={category}
									>
										{({ selected }) => (
											<>
                      <span
	                      className={`block truncate ${
		                      selected ? 'font-medium' : 'font-normal'
	                      }`}
                      >
                        {category.name}
                      </span>
												{selected ? (
													<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pantone">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</Listbox>

				{/* 민원 내용 */}
				<TextArea
					required
					name={"description"}
					label={"내용"}
					rows={10}
					placeholder={"내용을 입력해주세요."}
					register={register("content", {required: true})}
				/>
				<Button text={loading ? "로딩 중..." : "작성하기"} />
			</form>
		</Layout>
	);
};

export default Write;