import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import apiHandler from "@libs/server/apiHandler";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const { candidates, title, startAt, finishAt, reChoice } = req.body;
    let candidatesInput: { name: string }[] = [];
    candidates.forEach((candi: { name: string }) => {
      candidatesInput.push(candi);
    });

    const vote = await client.vote.create({
      data: {
        title,
        startAt: startAt + "T00:00:00.000Z",
        finishAt: finishAt + "T00:00:00.000Z",
        reChoice,
        candidates: {
          createMany: {
            data: candidatesInput,
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
}

export default apiHandler({ method: ["GET", "POST"], handler });
