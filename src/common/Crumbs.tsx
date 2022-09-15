import React from "react";
import { styled } from "@mui/material/styles";
import { Breadcrumbs, Button, Link } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

const PREFIX = "Crumbs";
const classes = {
  crumbs: `${PREFIX}-crumbs`,
};
const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  [`&.${classes.crumbs}`]: {
    paddingBottom: theme.spacing(1),
  },
}));

interface Crumb {
  href: string;
  label: string;
}

interface CrumbsProps {
  crumbs: Crumb[];
}

export function Crumbs(props: CrumbsProps) {
  const links: any[] = [];
  props.crumbs.forEach((crumb) => {
    links.push(
      <Button
        key={crumb.label}
        variant="text"
        color="primary"
        href={crumb.href}
      >
        {crumb.label}
      </Button>
    );
  });
  return (
    <StyledBreadcrumbs
      className={classes.crumbs}
      separator={<NavigateNext fontSize="small" />}
    >
      {links}
    </StyledBreadcrumbs>
  );
}
