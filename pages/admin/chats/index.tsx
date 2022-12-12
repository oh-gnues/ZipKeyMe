import type {NextPage} from 'next'
import Layout from "@components/Layout";
import Head from "next/head";
import Message from "@components/Message";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useMutation from "@libs/client/useMutation";
import { useState } from 'react';


interface PostChat{
  msg:string;
}
interface getChat{
  chattings:chatProps[];
 
}
interface chatProps{
  chatId:number,
  sender: string,
  msg: string
  sendAt:string
  isRead: boolean
}

const Chats: NextPage = () => {

  const [answer,SetAnswer] = useState<boolean>(false);

  const { data } = useSWR<getChat>(
     `/api/chats`
  );

  const {register,handleSubmit,watch} = useForm<PostChat>();


  const [postChat] = useMutation<PostChat>(
	    `/api/chats`
	);

  const onValid = (validForm: PostChat) => {
    postChat(validForm);
    setTimeout(() => SetAnswer(true), 4000);
  };

  const date = new Date;
  const hour = date.getHours();
  const min = date.getMinutes();



  

   
  return (
    <Layout title={"관리자 채팅"} hasTabBar canGoBack>
      <Head><title>Chats</title></Head>
      <div className={"py-10 pb-16 px-4 space-y-4"}>
        <Message message={"무엇을 도와드릴까요?"} sendAt={"15:18"}/>
      

        {
          data?.chattings.map((msg,index)=>{
            const date = new Date(msg.sendAt)
            const hour = date.getHours();
            const min = date.getMinutes();
            return(
              <div key={index}>
                <Message message={msg?.msg} sendAt={`${hour}:${min}`} />
                </div>

            )
          })
        }

        <form onSubmit={handleSubmit(onValid)} className="fixed py-2 bg-white bottom-24 inset-x-0 mx-6">
          <div className="flex relative max-w-md items-center w-full mx-auto">
            <input
              type="text"
              className="shadow-sm rounded-full w-full border-gray-300 focus:ring-pantone focus:outline-none pr-12 focus:border-pantone"
              placeholder={"메시지를 입력하세요."}
              {...register("msg")}
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-pantone items-center bg-pantone rounded-full px-3 text-sm text-white">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Chats;
