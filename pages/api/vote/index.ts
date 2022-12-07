import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import apiHandler from "@libs/server/apiHandler";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const { candidate, title, startAt, finishAt, reChoice } = req.body;
    console.log(candidate, title, startAt, finishAt, reChoice);
  }

  res.json({ ok: true });
}

export default withSession(apiHandler({ method: ["GET", "POST"], handler }));
