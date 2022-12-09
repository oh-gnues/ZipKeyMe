import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method == "GET") {
    const userWithChattingRoom = await client.user.findUnique({
      where: { id: req.session.user?.account },
      include: {
        chattingRooms: true
      }
    })
    const isChattingRoomExists = userWithChattingRoom?.chattingRooms.length ?? 0 > 0;
    let chattingRoom;
    if (isChattingRoomExists) {
      chattingRoom = userWithChattingRoom?.chattingRooms[0]
    } else {
      chattingRoom = await client.chattingRoom.create({
        data: {
          id: req.session.user?.account!,
        }
      })
    }

    const chattings = await client.chatting.findMany({
      where: {
        chattingRoom: userWithChattingRoom?.chattingRooms[0]
      }
    })
		
		return res.json({ ok: true, chattings: chattings });
	}

	if (req.method == "POST") {
		const {
			session: { user },
			body: { msg },
		} = req;

    const userWithChattingRoom = await client.user.findUnique({
      where: { id: req.session.user?.account },
      include: {
        chattingRooms: true
      }
    })
    const chattingRoom = userWithChattingRoom?.chattingRooms[0];
    
    const chatting = await client.chatting.create({
      data: {
        chatId: chattingRoom?.chatId!,
        sender: req.session.user?.account!,
        msg,
      }
    })

		return res.json({
			ok: true,
			chatting,
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
