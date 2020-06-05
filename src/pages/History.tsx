import React, { useEffect, useState } from "react";
import { 
  Grid,
  makeStyles,
  Link
} from '@material-ui/core';
import axios from "axios";
import moment from "moment";
import { JobPreview, JobPreviewProps } from "previews";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: theme.spacing(100),
  },
  source: {
    padding: theme.spacing(1),
  }
}));

export function History() {
  const [jobs, setJobs] = useState<JobPreviewProps[]>();
  useEffect(() => {
    axios.get("https://raw.githubusercontent.com/ColinLarsonCA/work-history/master/index.json")
      .then((res: any) => {
        let newJobs: JobPreviewProps[] = [];
        res.data?.forEach((job: any) => newJobs.push({
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

  const numCards = jobs ? jobs.length : 0;
  const cards: any[] = [];
  const card = (job: any, i: number) => {
    const many = numCards > 1;
    return (
      <Grid key={i} item container className={classes.card} xs={12} sm={12} md={many ? 6 : 12} lg={many ? 4 : 12} xl={many ? 3 : 12}>
        <JobPreview {...job}/>
      </Grid>
    )
  }
  jobs?.forEach((job: any, i: number) => cards.push(card(job, i)));
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