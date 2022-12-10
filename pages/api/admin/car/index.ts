import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const car = await client.car.findMany({
      orderBy: {
        enrollAt: "desc",
      },
    });
    return res.json({ ok: true, car });
  }

  if (req.method == "POST") {
    const { karNumber: number } = req.body;
    await client.car.update({
      where: { number },
      data: {
        isAccept: true,
      },
    });
    return res.json({ ok: true });
  }
}

export default withSession(
  apiHandler({
    method: ["GET", "POST"],
    handler,
    isPrivate: false,
  })
);
