import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import apiHandler from "@libs/server/apiHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const votes = await client.vote.findMany({
      orderBy: {
        finishAt: "asc",
      },
    });
    res.json({ ok: true, votes });
  }
}

export default apiHandler({ method: ["GET"], handler });
