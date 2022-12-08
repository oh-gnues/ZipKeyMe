import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { id },
		session: { user },
	} = req;
	const complaint = await client.complaint.findUnique({
		where: {
			comId: +id!,
		},
		include: {
			users: {
				select: { name: true },
			},
		},
	});
	return res.json({ ok: true, complaint });
}

export default withSession(
	apiHandler({
		method: ["GET"],
		handler,
		isPrivate: true,
	})
);
