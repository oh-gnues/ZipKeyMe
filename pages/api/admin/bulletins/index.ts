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
}

export default withSession(
  apiHandler({
    method: ["GET"],
    handler,
    isPrivate: false,
  })
);
