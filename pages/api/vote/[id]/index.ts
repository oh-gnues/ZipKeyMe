import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    //투표불러오기
    const {
      query: { id },
      session: { user },
    } = req;
    const vote = await client.vote.findFirst({
      where: {
        voteId: +id!,
      },
      include: {
        candidates: true,
      },
    });
    const voteHistory = await client.userVote.findFirst({
      where: {
        id: user?.account,
        voteId: vote?.voteId,
      },
    });
    return res.json({ ok: true, vote, voteHistory });
  }
  if (req.method == "POST") {
    //투표하기
    const {
      body: { candId },
      query: { id },
      session: { user },
    } = req;
    console.log(user);
    await client.userVote.upsert({
      //where조건에 만족하는 record가 없으면 create, 있으면 update
      where: {
        voteId_id: {
          voteId: +id!,
          id: user!.account,
        },
      },
      update: {
        //재투표
        candId: +candId,
      },
      create: {
        //첫투표
        vote: {
          connect: { voteId: +id! },
        },
        user: {
          connect: { id: user?.account },
        },
        candidate: {
          connect: { candId: +candId },
        },
      },
    });
  }
}

export default withSession(
  apiHandler({
    method: ["GET", "POST"],
    handler,
    isPrivate: true,
  })
);
