import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";
import useSWR from "swr";

type Car = {
  number: string;
  carName: string;
  owner: string;
  ownerPhone: string;
  enrollAt: Date;
  applyAt: Date;
  isAccept: boolean;
  isGuest: boolean;
};

interface AllOfCarInfo {
  houseId: number;
  aptDong: number;
  aptHo: number;
  holder: string;
  cars: Car[];
}

interface CarResponse {
  ok: boolean;
  users: AllOfCarInfo[];
}

const Home: NextPage = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [subExpanded, setSubExpanded] = useState<string | false>(false);
  const [loading, setLoading] = useState<true | false>(true);
  const AcceptLogin = async (number: string): Promise<void> => {
    await fetch(`/api/admin/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number,
      }),
    });
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleSubChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setSubExpanded(isExpanded ? panel : false);
  };

  const { data } = useSWR<CarResponse>("/api/admin/cars");
  useEffect(() => {
    if (data) setLoading(false);
    console.log(data);
  }, [data]);

  function clickAcceptBtn(e: React.SyntheticEvent<EventTarget>): void {
    const targetCar = e.target as HTMLInputElement;
    console.log(targetCar.id);
    AcceptLogin(targetCar.id);
  }

  return (
    <Layout
      title="차량 관리"
      canGoBack
      alarmBtnDisable
    >
      <Head>
        <title>차량 관리</title>
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
                sx={{ width: "50%", flexShrink: 0 }}
              >
                {house.aptDong + "동 " + house.aptHo + "호"}
              </Typography>
              <Typography
                mr={3}
                alignSelf={"center"}
                sx={{ color: "text.secondary" }}
              >{`세대주: ${house.holder}`}</Typography>
              {house.cars.some((car) => !car.isAccept) ? (
                <Typography
                  alignSelf={"center"}
                  variant="caption"
                  align="right"
                  sx={{ color: "red" }}
                >
                  {"승인필요"}
                </Typography>
              ) : null}
            </AccordionSummary>
            <AccordionDetails>
              {house.cars.length === 0 ? (
                "등록된 차량이 없습니다."
              ) : (
                <div>
                  <Typography variant="h5">{"차량 목록"}</Typography>
                  {house.cars.map((car) => (
                    <Accordion
                      key={car.number}
                      expanded={subExpanded === car.number}
                      onChange={handleSubChange(car.number)}
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
                          {car.number}
                        </Typography>
                        <Typography
                          mr={3}
                          alignSelf={"center"}
                          sx={{ color: "text.secondary" }}
                        >
                          {car.isGuest ? "방문객" : "입주민"}
                        </Typography>
                        {car.isAccept ? null : (
                          <Typography
                            alignSelf={"center"}
                            variant="caption"
                            align="right"
                            sx={{ color: "red" }}
                          >
                            {"승인필요"}
                          </Typography>
                        )}
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="subtitle1">{"차량명"}</Typography>
                        <Typography
                          mb={1}
                          variant="body1"
                        >
                          {car.carName}
                        </Typography>
                        <Typography variant="subtitle1">{"차주명"}</Typography>
                        <Typography
                          mb={1}
                          variant="body1"
                        >
                          {car.owner}
                        </Typography>
                        <Typography variant="subtitle1">{"연락처"}</Typography>
                        <Typography
                          mb={1}
                          variant="body1"
                        >
                          {car.ownerPhone}
                        </Typography>
                        <Typography variant="subtitle1">{"신청일자"}</Typography>
                        <Typography
                          mb={1}
                          variant="body1"
                        >
                          {car.applyAt.toString().substring(0, 10)}
                        </Typography>
                        <Typography variant="subtitle1">{"가입승인"}</Typography>
                        <Button
                          onClick={(e) => clickAcceptBtn(e)}
                          variant="contained"
                          color="info"
                          size="large"
                          disabled={car.isAccept}
                          id={car.number}
                          sx={{ fontWeight: "heavy" }}
                        >
                          {car.isAccept ? "승인 완료" : "승인 하기"}
                        </Button>
                        {car.isAccept ? (
                          <>
                            <Typography variant="subtitle1">{"승인일자"}</Typography>
                            <Typography
                              mb={1}
                              variant="body1"
                            >
                              {car.enrollAt.toString().substring(0, 10)}
                            </Typography>{" "}
                          </>
                        ) : null}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
