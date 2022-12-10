import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const { user } = req.session;
    const userHouseId = await client.user.findFirst({
      select: { houseId: true },
      where: { id: user?.account },
    });

    const car = await client.car.findMany({
      orderBy: {
        enrollAt: "desc",
      },
      where: {
        houseId: userHouseId?.houseId,
      },
    });
    return res.json({ ok: true, car });
  }

  if (req.method == "POST") {
    const { user } = req.session;
    const userHouseId = await client.user.findFirst({
      select: { houseId: true },
      where: { id: user?.account },
    });

    const { carNumberFirst, carNumberMiddle, carNumberLast, carName, ownerPhone, owner, isGuest } =
      req.body;

    const car = await client.car.create({
      data: {
        number: carNumberFirst + carNumberMiddle + " " + carNumberLast,
        carName,
        owner,
        isGuest,
        ownerPhone,
        household: {
          connect: {
            houseId: userHouseId?.houseId,
          },
        },
      },
    });
    return res.json({ ok: true, car });
  }
}

export default withSession(
  apiHandler({
    method: ["GET", "POST"],
    handler,
    isPrivate: true,
  })
);
