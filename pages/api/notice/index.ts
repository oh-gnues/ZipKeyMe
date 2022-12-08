import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const notices = await client.post.findMany({
      where: {
        isNotice: true,
      },
    });
    return res.json({ ok: true, notices });
  }

  if (req.method == "POST") {
    const {
      body: { title, content },
    } = req;

    const notice = await client.post.create({
      data: {
        title,
        content,
        isNotice: true,
      },
    });
    return res.json({
      ok: true,
      notice,
    });
  }
  if (req.method == "PATCH") {
    // const post;
    // return res.json({ ok: true, post });
  }
}

export default withSession(
  apiHandler({
    method: ["GET", "POST"],
    handler,
    isPrivate: false,
  })
);
