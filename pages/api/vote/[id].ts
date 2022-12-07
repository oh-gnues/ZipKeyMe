import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  if (req.method == "GET") {
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
}

export default withSession(
  apiHandler({
    method: ["GET", "POST"],
    handler,
    isPrivate: true,
  })
);
