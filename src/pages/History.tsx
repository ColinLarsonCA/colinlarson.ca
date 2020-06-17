import React, { useEffect, useState } from "react";
import { 
  Grid,
  makeStyles,
  Link
} from '@material-ui/core';
import axios from "axios";
import moment from "moment";
import { IntroCard, JobCard, JobCardProps } from "cards";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: theme.spacing(100),
  },
  source: {
    padding: theme.spacing(1),
  }
}));

export function History() {
  const [jobs, setJobs] = useState<JobCardProps[]>();
  useEffect(() => {
    axios.get("https://raw.githubusercontent.com/ColinLarsonCA/work-history/master/index.json")
      .then((res: any) => {
        let newJobs: JobCardProps[] = [];
        console.log(res.data);
        res.data?.forEach((job: any) => newJobs.push({
          path: job.key,
          role: job.role,
          company: job.company,
          logo: job.logo,
          tags: job.tags.sort(),
          start: moment(job.start),
          end: moment(job.end),
          readtime: job.readtime,
        }));
        setJobs(newJobs.reverse());
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, []);
  const classes = useStyles();

  const numCards = jobs ? jobs.length + 1 : 0;
  const cards: any[] = [];
  const many = numCards > 1;
  const card = (job: any, key: string, intro: boolean = false) => {
    return (
      <Grid key={key} item container className={classes.card} xs={12} sm={12} md={many ? 6 : 12} lg={many ? 4 : 12} xl={many ? 3 : 12}>
        {intro ? <IntroCard /> : <JobCard {...job}/>}
      </Grid>
    )
  }
  cards.push(card({}, "intro", true));
  jobs?.forEach((job: any, i: number) => cards.push(card(job, job.key)));
  return (
    <React.Fragment>
      <Grid container spacing={2} justify="center">
        {cards}
      </Grid>
      <Grid className={classes.source} container justify="flex-end" alignItems="flex-end">
        <Link
          variant="caption"
          color="textSecondary"
          href="https://github.com/ColinLarsonCA/work-history"
          target="_blank"
        >
          Source ↗
        </Link>
      </Grid>

    </React.Fragment>
  )
}