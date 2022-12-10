import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const users = await client.household.findMany({
      select: {
        houseId: true,
        aptDong: true,
        aptHo: true,
        holder: true,
        cars: {
          select: {
            number: true,
            carName: true,
            owner: true,
            ownerPhone: true,
            enrollAt: true,
            applyAt: true,
            isAccept: true,
            isGuest: true,
          },
        },
      },
    });
    return res.json({ ok: true, users });
  }

  if (req.method == "POST") {
    const { number } = req.body;
    await client.car.update({
      where: { number },
      data: { isAccept: true },
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
