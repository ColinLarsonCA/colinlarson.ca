import React from "react";
import { 
  Grid,
  makeStyles,
} from '@material-ui/core';
import moment from "moment";
import { JobPreview } from "previews";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: theme.spacing(100),
  }
}));

export function History() {
  const classes = useStyles();
  const jobs = [
    {role: "Dev / CTO", company: "Brand X Technologies", logo: "", text: "...", start: moment("Sep 2018"), end: moment("May 2020")},
    {role: "Dev / Lead", company: "Vendasta", logo: "", text: "...", start: moment("Jan 2017"), end: moment("Aug 2018")},
    {role: "Dev / Lead", company: "SED Systems", logo: "", text: "...", start: moment("Nov 2013"), end: moment("Jan 2017")},
    {
      role: "IT Support",
      company: "Environment Canada",
      logo: "https://i.imgur.com/P0F3Cpv.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      start: moment("May 2012"),
      end: moment("Aug 2012")
    },
  ]
  const numCards = jobs.length;
  const cards: any[] = [];
  const card = (job: any) => {
    const many = numCards > 1;
    return (
      <Grid item className={classes.card} xs={12} sm={12} md={many ? 6 : 12} lg={many ? 4 : 12} xl={many ? 3 : 12}>
        <JobPreview {...job}/>
      </Grid>
    )
  }
  jobs.forEach((job: any) => cards.push(card(job)));
  return (
    <React.Fragment>
      <Grid container spacing={2} justify="center" alignItems="center">
        {cards}
      </Grid>
    </React.Fragment>
  )
}