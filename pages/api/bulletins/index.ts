import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const posts = await client.post.findMany({
      include: {
        users: {
          select: { name: true },
        },
        _count: {
          select: { likes: true, reples: true },
        },
      },
    });
    return res.json({ ok: true, posts });
  }
  if (req.method == "POST") {
    // const post;
    // return res.json({ ok: true, post });
  }
  if (req.method == "PATCH") {
    // const post;
    // return res.json({ ok: true, post });
  }
}

export default withSession(
  apiHandler({
    method: ["GET", "POST", "PATCH"],
    handler,
    isPrivate: true,
  })
);
