import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method == "GET") {
		const complaint = await client.complaint.findMany({
			include: {
				users: {
					select: { name: true },
				},
			},
			orderBy: {
				state: "asc",
			}
		});
		return res.json({ ok: true, complaint });
	}

	if (req.method == "POST") {
		const {
			session: { user },
			body: { title, category, content },
		} = req;

		const complaint = await client.complaint.create({
			data: {
				title,
				category,
				content,
				users: {
					connect: {
						id: user?.account,
					},
				},
			},
		});
		return res.json({
			ok: true,
			complaint,
		});
	}
}

export default withSession(
	apiHandler({
		method: ["GET", "POST"],
		handler,
		isPrivate: true,
	})
);
