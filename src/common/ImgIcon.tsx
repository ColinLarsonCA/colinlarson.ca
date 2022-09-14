import React from "react";
import { styled } from '@mui/material/styles';
import { Icon } from "@mui/material";

const PREFIX = 'ImgIcon';
const classes = {
  root: `${PREFIX}-root`,
  image: `${PREFIX}-image`
};
const StyledIcon = styled(Icon)((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    textAlign: "center",
    display: "flex"
  },

  [`& .${classes.image}`]: {
    height: "100%",
    color: theme.palette.primary.main,
  }
}));

interface Props {
  src: string;
  alt: string;
}

export function ImgIcon(props: Props) {

  return (
    <StyledIcon className={classes.root}>
      <img alt={props.alt} className={classes.image} src={props.src} />
    </StyledIcon>
  );
}
