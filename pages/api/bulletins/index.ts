import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const posts = await client.post.findMany({
      orderBy: {
        postAt: "desc",
      },
      where: { isNotice: false },
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
    const {
      session: { user },
      body: { title, content },
    } = req;

    const post = await client.post.create({
      data: {
        title,
        content,
        users: {
          connect: {
            id: user?.account,
          },
        },
      },
    });
    return res.json({
      ok: true,
      post,
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
    isPrivate: true,
  })
);
