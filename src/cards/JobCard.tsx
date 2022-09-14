import React from "react";
import { styled } from '@mui/material/styles';
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
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import duration from 'dayjs/plugin/duration';

const PREFIX = 'JobCard';
const classes = {
  logo: `${PREFIX}-logo`,
  chips: `${PREFIX}-chips`,
  card: `${PREFIX}-card`,
  readTime: `${PREFIX}-readTime`,
  source: `${PREFIX}-source`
};
const StyledCard = styled(Card)((
  {
    theme
  }
) => ({
  [`& .${classes.logo}`]: {
    height: 140,
  },

  [`& .${classes.chips}`]: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },

  [`&.${classes.card}`]: {
    display: "flex",
    flexDirection: "column",
    "& .MuiCardContent-root": {
      flex: 1,
    },
  },

  [`& .${classes.readTime}`]: {
    flex: 1,
  },

  [`& .${classes.source}`]: {
    paddingRight: theme.spacing(1),
  }
}));

dayjs.extend(duration);

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

  const chips: any[] = [];
  props.tags.forEach((tag: string) => {
    chips.push(<Chip key={tag} label={tag} variant="outlined" />);
  });
  return (
    <StyledCard className={classes.card}>
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
          underline="hover"
        >
          Source ↗
        </Link>
      </CardActions>
    </StyledCard>
  );
}
