import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Button from "@components/Button";
import TextArea from "@components/Textarea";
import Input from "@components/Input";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { Post } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

interface sendAlarmForm {
  title: string;
  content: string;
}

interface sendAlarmMutation {
  ok: boolean;
}

const Write: NextPage = () => {
  const { register, handleSubmit } = useForm<sendAlarmForm>();
  const [sendAlarm, { loading, data }] = useMutation<sendAlarmMutation>(`/api/alert`);
  const onValid = (data: sendAlarmForm) => {
    if (loading) return;
    sendAlarm(data);
  };
  const router = useRouter();

  useEffect(() => {
    if (data?.ok) {
      console.log(data);
      router.push(`/admin`);
    }
  }, [data, router]);

  return (
    <Layout
      title={"알림 발송"}
      canGoBack
      alarmBtnDisable
    >
      <Head>
        <title>알림 발송</title>
      </Head>
      <form
        className={"p-4 space-y-4"}
        onSubmit={handleSubmit(onValid)}
      >
        <Input
          required
          label={"제목"}
          name={"title"}
          type={"title"}
          placeholder={"알림 제목을 입력해주세요."}
          register={register("title", { required: true })}
        />
        <TextArea
          required
          name={"description"}
          label={"내용"}
          rows={10}
          placeholder={"알림 내용을 입력해주세요."}
          register={register("content", { required: true })}
        />
        <Button text={loading ? "발송 중..." : "발송하기"} />
      </form>
    </Layout>
  );
};

export default Write;
