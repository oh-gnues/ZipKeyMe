import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Button from "@components/Button";
import TextArea from "@components/Textarea";
import Input from "@components/Input";
import {useForm} from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import {Post} from "@prisma/client";
import {useEffect} from "react";
import {useRouter} from "next/dist/client/router";

interface WritePostForm {
	title: string;
	content: string;
}

interface WritePostMutation {
	ok: boolean;
	post: Post;
}

const Write: NextPage = () => {
	const router = useRouter();
	const {register, handleSubmit} = useForm<WritePostForm>();
	const [writePost, {loading, data}] = useMutation<WritePostMutation>(`/api/bulletins`);
	const onValid = (data: WritePostForm) => {
		if (loading) return;
		writePost(data);
	};

	useEffect(() => {
		if (data?.ok) {
			router.push(`/bulletins/${data.post.postId}`);
		}
	}, [data, router]);

	return (
		<Layout title={"게시글 작성"} hasTabBar canGoBack>
			<Head>
				<title>게시글 작성</title>
			</Head>
			<form className={"p-4 space-y-4"} onSubmit={handleSubmit(onValid)}>
				<Input
					required
					label={"제목"}
					name={"title"}
					type={"title"}
					placeholder={"제목을 입력해주세요."}
					register={register("title", {required: true})}
				/>
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