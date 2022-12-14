import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import apiHandler from "@libs/server/apiHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const { candidates, title, startAt, finishAt, reChoice } = req.body;
    const vote = await client.vote.create({
      data: {
        title,
        startAt: new Date(startAt),
        finishAt: new Date(finishAt),
        reChoice,
        candidates: {
          createMany: {
            data: candidates,
          },
        },
      },
      include: {
        candidates: true,
      },
    });
    console.log(vote);
    res.json({ ok: true, vote });
  }
  if (req.method == "GET") {
    const current = new Date();
    const votes = await client.vote.findMany({
      orderBy: {
        finishAt: "asc",
      },
      where: {
        AND: [{ startAt: { lte: current } }, { finishAt: { gte: current } }],
      },
    });
    res.json({ ok: true, votes });
  }
}

export default apiHandler({ method: ["GET", "POST"], handler });
