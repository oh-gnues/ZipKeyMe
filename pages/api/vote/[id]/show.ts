import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    //투표불러오기
    const {
      query: { id },
    } = req;
    const vote = await client.vote.findFirst({
      where: {
        voteId: +id!,
      },
      include: {
        candidates: true,
      },
    });
    return res.json({ ok: true, vote });
  }
}

export default withSession(
  apiHandler({
    method: ["GET"],
    handler,
    isPrivate: false,
  })
);
