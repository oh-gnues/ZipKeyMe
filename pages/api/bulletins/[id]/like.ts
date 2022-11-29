import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req.body;
  const alreadyExists = await client.likes.findFirst({
    where: {
      postId: id,
      id: user?.id,
    },
  });

  if (alreadyExists) {
    //cancel like
    await client.likes.deleteMany({
      where: {
        id: alreadyExists.id,
        postId: alreadyExists.postId,
      },
    });
  } else {
    //do like
    await client.likes.create({
      data: {
        post: {
          connect: {
            postId: id,
          },
        },
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
  }
  return res.json({ ok: true });
}

export default withSession(
  apiHandler({
    method: ["POST"],
    handler,
    isPrivate: true,
  })
);
