import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const { user } = req.session;

    const fares = await client.fare.findMany({
      where: {
        household: {
          users: {
            every: {
              id: user?.account,
            },
          },
        },
      },
    });
    return res.json({ ok: true, fares });
  }
  if (req.method == "PATCH") {
    // const post;
    // return res.json({ ok: true, post });
  }
}

export default withSession(
  apiHandler({
    method: ["GET", "PATCH"],
    handler,
    isPrivate: true,
  })
);
