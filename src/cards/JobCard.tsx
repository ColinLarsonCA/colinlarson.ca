import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Link,
  Typography,
  makeStyles,
} from "@material-ui/core";
import dayjs, { Dayjs } from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 140,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
    "& .MuiCardContent-root": {
      flex: 1,
    },
  },
  readTime: {
    flex: 1,
  },
  source: {
    paddingRight: theme.spacing(1),
  },
}));

export interface JobCardProps {
  path: string;
  role: string;
  company: string;
  logo: string;
  tags: string[];
  readtime: number;
  start: Dayjs;
  end?: Dayjs;
}

export function JobCard(props: JobCardProps) {
  const classes = useStyles();
  const chips: any[] = [];
  props.tags.forEach((tag: string) => {
    chips.push(<Chip key={tag} label={tag} variant="outlined" />);
  });
  return (
    <Card className={classes.card}>
      <CardHeader
        title={props.role}
        subheader={
          props.start.format("MMM YYYY") +
          " to " +
          (props.end ? props.end.format("MMM YYYY") : "now")
        }
      />
      <CardMedia className={classes.logo} image={props.logo} />
      <CardContent>
        <Typography gutterBottom variant="h5" color="textSecondary">
          {props.company}
        </Typography>
        <div className={classes.chips}>{chips}</div>
      </CardContent>
      <CardActions>
        <Button color="primary" href={"history/" + props.path}>
          Read More
        </Button>
        <Typography
          className={classes.readTime}
          variant="caption"
          color="textSecondary"
        >
          {dayjs.duration(props.readtime, "s").minutes() + "m"}
        </Typography>
        <Link
          className={classes.source}
          variant="caption"
          color="textSecondary"
          href={
            "https://github.com/ColinLarsonCA/work-history/blob/master/" +
            props.path +
            ".md"
          }
          target="_blank"
        >
          Source ↗
        </Link>
      </CardActions>
    </Card>
  );
}
