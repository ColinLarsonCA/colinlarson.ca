import React from "react";
import { 
  Card,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  makeStyles
} from '@material-ui/core';
import Markdown from "react-markdown";

interface IntroCardProps {
  title: string;
  text: string;
  action: string;
  href: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    "& .MuiCardContent-root": {
      flex: 1,
   }
  },
}));

export function IntroCard(props: IntroCardProps) {
  const classes = useStyles();
  console.log(props.text);
  return (
    <Card className={classes.card}>
      <CardHeader
        title={props.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="textSecondary">
          <Markdown source={props.text} />
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" href={props.href}>{props.action}</Button>
      </CardActions>
    </Card>
  );
}