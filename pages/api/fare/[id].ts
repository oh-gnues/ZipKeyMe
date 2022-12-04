import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    query: { id },
  } = req;

  if (req.method == "GET") {
    const userHouseId = await client.user.findFirst({
      select: { houseId: true },
      where: { id: user?.account },
    });

    const fare = await client.fare.findFirst({
      where: {
        houseId: userHouseId?.houseId,
        fareId: +id!,
      },
      select: {
        heating: true,
        water: true,
        commonElectricity: true,
        elevatorElectricity: true,
        householdWaste: true,
        management: true,
        representative: true,
        buildingInsurance: true,
        expenses: true,
        disinfection: true,
        consignmentManagement: true,
        longTermRepairs: true,
      },
    });
    return res.json({ ok: true, fare });
  }
  if (req.method == "POST") {
    const { id: fareId } = req.query;
    const fare = await client.fare.update({
      where: {
        fareId: +fareId!,
      },
      data: {
        isPaid: true,
      },
    });
    return res.json({ ok: true, fare });
  }
}

export default withSession(
  apiHandler({
    method: ["GET", "POST"],
    handler,
    isPrivate: true,
  })
);
