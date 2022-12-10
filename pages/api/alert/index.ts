import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

interface AlarmPost {
  title: string;
  content: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const alarms = await client.alarm.findMany();
    res.json({ ok: true, alarms });
  }

  if (req.method == "POST") {
    const { title, content } = req.body as AlarmPost;

    await client.alarm.create({
      data: {
        title,
        content,
      },
    });
    res.json({ ok: true });
  }
}
export default withSession(
  apiHandler({
    method: ["GET", "POST"],
    handler,
    isPrivate: false,
  })
);
