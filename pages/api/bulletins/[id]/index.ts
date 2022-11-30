import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  const post = await client.post.findUnique({
    where: {
      postId: +id!,
    },
    include: {
      reples: {
        include: {
          users: {
            select: { name: true },
          },
        },
      },
      users: {
        select: { name: true },
      },
      _count: {
        select: { likes: true, reples: true },
      },
    },
  });
  const isLiked = Boolean(
    await client.likes.findFirst({
      where: {
        postId: +id!,
        id: user?.account,
      },
    })
  );
  return res.json({ ok: true, post, isLiked });
}

export default withSession(
  apiHandler({
    method: ["GET"],
    handler,
    isPrivate: true,
  })
);
