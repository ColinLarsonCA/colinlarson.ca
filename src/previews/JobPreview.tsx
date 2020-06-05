import React from "react";
import { 
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import moment, { Moment } from "moment";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 140,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
    "& .MuiCardContent-root": {
      flex: 1,
   }
  }
}));

export interface JobPreviewProps {
  role: string;
  company: string;
  logo: string;
  tags: string[];
  readtime: number;
  start: Moment;
  end?: Moment;
}

export function JobPreview(props: JobPreviewProps) {
  const classes = useStyles();
  const chips: any[] = [];
  props.tags.forEach((tag: string) => {
    chips.push(<Chip key={tag} label={tag} variant="outlined"/>);
  })
  return (
    <Card className={classes.card}>
      <CardHeader
        title={props.role}
        subheader={props.start.format("MMM YYYY") + " to " + (props.end ? props.end.format("MMM YYYY") : "now")}
      />
      <CardMedia
        className={classes.logo}
        image={props.logo}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="textSecondary">
          {props.company}
        </Typography>
        <div className={classes.chips}>
          {chips}
        </div>
      </CardContent>
      <CardActions>
        <Button color="primary">
          Read More
        </Button>
        <Typography variant="caption" color="textSecondary">{moment.duration(props.readtime, "s").minutes() + "m"}</Typography>
      </CardActions>
    </Card>
  );
}