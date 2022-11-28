import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
    content,
  } = req.body;
  const alreadyExists = await client.reple.findFirst({
    where: {
      postId: id,
      id: user?.id,
      content,
    },
  });

  if (alreadyExists) {
    //delete reple
    await client.reple.deleteMany({
      where: {
        id: alreadyExists.id,
        repleId: alreadyExists.repleId,
      },
    });
  } else {
    //post reple
    await client.reple.create({
      data: {
        post: {
          connect: {
            postId: id,
          },
        },
        users: {
          connect: {
            id: user?.id,
          },
        },
        content,
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
