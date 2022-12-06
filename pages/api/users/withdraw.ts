import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import apiHandler from "@libs/server/apiHandler";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
  } = req;

  const target = await client.user.findFirst({
    select: {
      id: true,
      name: true,
      phone: true,
    },
    where: {
      id: user?.account,
    },
  });
  await client.user.deleteMany({
    where: {
      id: target?.id,
      name: target?.name,
      phone: target?.phone,
    },
  });
  req.session.destroy();
  res.json({ ok: true });
}

export default withSession(apiHandler({ method: ["DELETE"], handler }));
