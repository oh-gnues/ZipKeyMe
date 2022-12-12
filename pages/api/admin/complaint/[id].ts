import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { state },
    query: { id },
  } = req;
  console.log(state);
  const complaint = await client.complaint.update({
    where: {
      comId: +id!,
    },
    data: {
      state: state,
    },
  });
  console.log(complaint);
  return res.json({ ok: true, complaint });
}

export default withSession(
  apiHandler({
    method: ["POST"],
    handler,
    isPrivate: false,
  })
);
