import React from "react";
import { styled } from '@mui/material/styles';
import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Link,
} from "@mui/material";
import Markdown from "react-markdown";

const PREFIX = 'IntroCard';
const classes = {
  card: `${PREFIX}-card`,
  spacer: `${PREFIX}-spacer`,
  source: `${PREFIX}-source`
};
const StyledCard = styled(Card)((
  {
    theme
  }
) => ({
  [`&.${classes.card}`]: {
    display: "flex",
    flexDirection: "column",
    "& .MuiCardContent-root": {
      flex: 1,
    },
  },

  [`& .${classes.spacer}`]: {
    flex: 1,
  },

  [`& .${classes.source}`]: {
    paddingRight: theme.spacing(1),
  }
}));

interface IntroCardProps {
  title: string;
  text: string;
  action: string;
  href: string;
  external?: boolean;
  source?: string;
}

export function IntroCard(props: IntroCardProps) {

  return (
    <StyledCard className={classes.card}>
      <CardHeader title={props.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" color="textSecondary">
          <Markdown children={props.text} />
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          href={props.href}
          target={props.external ? "_blank" : ""}
        >
          {props.action}
        </Button>
        {props.source && (
          <React.Fragment>
            <div className={classes.spacer} />
            <Link
              className={classes.source}
              color="textSecondary"
              href={props.source}
              target="_blank"
            >
              Source ↗
            </Link>
          </React.Fragment>
        )}
      </CardActions>
    </StyledCard>
  );
}
