import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const userHouseId = await client.user.findFirst({
    select: { houseId: true },
    where: { id: user?.account },
  });

  const fares = await client.fare.findMany({
    take: 2,
    orderBy: {
      fareAt: "desc",
    },
    where: {
      houseId: userHouseId?.houseId,
      isPaid: false,
    },
  });
  return res.json({ ok: true, fares });
}

export default withSession(
  apiHandler({
    method: ["GET"],
    handler,
    isPrivate: true,
  })
);
