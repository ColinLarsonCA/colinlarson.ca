import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import axios from "axios";
import { IntroCard, JobCard, JobCardProps } from "cards";
import { Crumbs } from "common";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const PREFIX = "History";
const classes = {
  card: `${PREFIX}-card`,
  source: `${PREFIX}-source`,
};
const StyledPage = styled("div")(({ theme }) => ({
  [`& .${classes.card}`]: {
    maxWidth: theme.spacing(100),
  },

  [`& .${classes.source}`]: {
    padding: theme.spacing(1),
  },
}));

dayjs.extend(customParseFormat);

export function History() {
  const [jobs, setJobs] = useState<JobCardProps[]>();
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/ColinLarsonCA/work-history/master/index.json"
      )
      .then((res: any) => {
        let newJobs: JobCardProps[] = [];
        res.data?.forEach((job: any) =>
          newJobs.push({
            path: job.key,
            role: job.role,
            company: job.company,
            logo: job.logo,
            tags: job.tags.sort(),
            start: dayjs(job.start, "MMM YYYY"),
            end: job.end ? dayjs(job.end, "MMM YYYY") : undefined,
            readtime: job.readtime,
          })
        );
        setJobs(newJobs.reverse());
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, []);

  const numCards = jobs ? jobs.length + 1 : 0;
  const cards: any[] = [];
  const many = numCards > 1;
  const card = (job: any, key: string, intro: boolean = false) => {
    return (
      <Grid
        key={key}
        item
        container
        className={classes.card}
        xs={12}
        sm={12}
        md={many ? 6 : 12}
        lg={many ? 4 : 12}
        xl={many ? 4 : 12}
      >
        {intro ? (
          <IntroCard
            title="Work History"
            text={`I have been active in the tech industry since starting my B.Sc at the University of Saskatchewan in 2009. After graduating in 2013 I have worked as a developer and leader in a variety of spaces including: satellite radio, online reputation, billing, agriculture and horticulture automation, and web security.\n\nYou can read all about my past professional work, starting with NHRC.`}
            action="Start Reading"
            href="/history/2012-05-nhrc"
          />
        ) : (
          <JobCard {...job} />
        )}
      </Grid>
    );
  };
  // cards.push(card({}, "intro", true));
  jobs?.forEach((job: any, i: number) => cards.push(card(job, job.path)));
  return (
    <StyledPage>
      <Crumbs
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/history", label: "Work History" },
        ]}
      />
      <Grid container spacing={2} justifyContent="center">
        {cards}
      </Grid>
    </StyledPage>
  );
}
