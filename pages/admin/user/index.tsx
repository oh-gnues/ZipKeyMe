import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import { MouseEvent, useEffect, useState } from "react";
import useSWR from "swr";

type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender: string;
  birth: Date;
  isAccept: boolean;
};

interface AllOfUserInfo {
  houseId: number;
  aptDong: number;
  aptHo: number;
  holder: string;
  moveInAt: Date;
  users: User[];
}

interface UserResponse {
  ok: boolean;
  users: AllOfUserInfo[];
}

const Home: NextPage = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [subExpanded, setSubExpanded] = useState<string | false>(false);
  const [loading, setLoading] = useState<true | false>(true);
  const AcceptLogin = async (id: string): Promise<void> => {
    await fetch(`/api/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleSubChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setSubExpanded(isExpanded ? panel : false);
  };

  const { data } = useSWR<UserResponse>("/api/admin/users");
  useEffect(() => {
    if (data) setLoading(false);
    console.log(data);
  }, [data]);

  function clickAcceptBtn(e: React.SyntheticEvent<EventTarget>): void {
    const targetUser = e.target as HTMLInputElement;
    AcceptLogin(targetUser.id);
  }

  return (
    <Layout
      title="주민 관리"
      canGoBack
      alarmBtnDisable
    >
      <Head>
        <title>주민 관리</title>
      </Head>
      <div className="my-10 mx-2">
        {data?.users.map((house) => (
          <Accordion
            key={house.houseId}
            expanded={expanded === house.houseId.toString()}
            onChange={handleChange(house.houseId.toString())}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography
                variant="h6"
                sx={{ width: "45%", flexShrink: 0 }}
              >
                {house.aptDong + "동 " + house.aptHo + "호"}
              </Typography>
              <Typography
                alignSelf={"center"}
                sx={{ color: "text.secondary" }}
              >
                {`전입일: ${house.moveInAt.toString().substring(0, 10)}`}
              </Typography>
              {house.users.some((user) => !user.isAccept) ? (
                <Typography
                  ml={3}
                  alignSelf={"center"}
                  variant="caption"
                  align="right"
                  sx={{ color: "red" }}
                >
                  {"●"}
                </Typography>
              ) : null}
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1">{"세대주 : " + house.holder}</Typography>
              {house.users.map((user) => (
                <Accordion
                  key={user.id}
                  expanded={subExpanded === user.id}
                  onChange={handleSubChange(user.id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography
                      variant="h6"
                      sx={{ width: "50%", flexShrink: 0 }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      alignSelf={"center"}
                      sx={{ color: "text.secondary" }}
                    >
                      {user.gender === "MALE" ? "남" : "여"}
                    </Typography>
                    {user.isAccept ? null : (
                      <Typography
                        ml={3}
                        alignSelf={"center"}
                        variant="caption"
                        align="right"
                        sx={{ color: "red" }}
                      >
                        {"●"}
                      </Typography>
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="subtitle1">{"전화번호"}</Typography>
                    <Typography
                      mb={1}
                      variant="body1"
                    >
                      {user.phone}
                    </Typography>
                    <Typography variant="subtitle1">{"이메일"}</Typography>
                    <Typography
                      mb={1}
                      variant="body1"
                    >
                      {user.email}
                    </Typography>
                    <Typography variant="subtitle1">{"생년월일"}</Typography>
                    <Typography
                      mb={1}
                      variant="body1"
                    >
                      {user.birth.toString().substring(0, 10)}
                    </Typography>
                    <Typography variant="subtitle1">{"가입승인"}</Typography>
                    <Button
                      onClick={(e) => clickAcceptBtn(e)}
                      variant="contained"
                      color="info"
                      size="large"
                      disabled={user.isAccept}
                      id={user.id}
                      sx={{ fontWeight: "heavy" }}
                    >
                      {user.isAccept ? "승인 완료" : "승인 하기"}
                    </Button>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
