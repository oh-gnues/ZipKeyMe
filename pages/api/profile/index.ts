import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    body: { target, oldThing, newThing },
  } = req;
  if (target === "email") {
    const isMatch = await client.user.count({
      where: {
        id: user?.account,
        email: oldThing,
      },
    });
    const isUsed = await client.user.count({
      where: {
        email: newThing,
      },
    });
    if (!isMatch) {
      return res.json({ ok: false, message: "기존 이메일이 틀립니다." });
    } else if (isUsed > 0) {
      return res.json({ ok: false, message: "이미 사용중인 이메일입니다." });
    }
    await client.user.update({
      where: {
        id: user?.account,
      },
      data: {
        email: newThing,
      },
    });
  } else if (target === "password") {
    const isMatch = await client.user.count({
      where: {
        id: user?.account,
        pwd: oldThing,
      },
    });
    if (!isMatch) {
      return res.json({ ok: false, message: "기존 비밀번호가 틀립니다." });
    }
    await client.user.update({
      where: {
        id: user?.account,
      },
      data: {
        pwd: newThing,
      },
    });
  }
  return res.json({ ok: true, message: "변경이 완료되었습니다." });
}

export default withSession(
  apiHandler({
    method: ["POST"],
    handler,
    isPrivate: true,
  })
);
