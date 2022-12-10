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
        moveInAt: true,
        holder: true,
        users: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            gender: true,
            birth: true,
            isAccept: true,
          },
        },
      },
    });
    return res.json({ ok: true, users });
  }

  if (req.method == "POST") {
    const { id } = req.body;
    await client.user.update({
      where: { id },
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
