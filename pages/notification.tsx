import type { NextPage } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Alarm } from "@prisma/client";

interface AlarmResponse {
  ok: boolean;
  alarms: Alarm[];
}

const Home: NextPage = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [loading, setLoading] = useState<true | false>(true);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { data } = useSWR<AlarmResponse>("/api/alert");
  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  return (
    <Layout
      title="알림"
      canGoBack
      alarmBtnDisable
      hasTabBar
    >
      <Head>
        <title>알림</title>
      </Head>
      <div className="my-10 mx-2">
        {data?.alarms.map((alarm) => (
          <Accordion
            expanded={expanded === "No" + alarm.alertId.toString()}
            onChange={handleChange("No" + alarm.alertId.toString())}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography
                variant="h5"
                sx={{ width: "70%", flexShrink: 0 }}
              >
                {alarm.title.length < 7 ? alarm.title : alarm.title.substring(0, 7) + " ..."}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {alarm.alertAt.toString().substring(0, 10)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6">{alarm.title}</Typography>
              <Typography>{alarm.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
