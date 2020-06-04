import React from "react";
import { 
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Moment } from "moment";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 140,
  }
}));

interface Props {
  role: string;
  company: string;
  logo: string;
  text: string;
  start: Moment;
  end?: Moment;
}

export function JobPreview(props: Props) {
  const classes = useStyles();
  return (
    <Card>
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
        <Typography variant="body2" color="textSecondary">
          {props.text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}