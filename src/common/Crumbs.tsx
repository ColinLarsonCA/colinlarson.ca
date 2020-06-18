import React from "react";
import {
  Breadcrumbs,
  Grid,
  Link,
  makeStyles,
} from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  crumbs: {
    paddingBottom: theme.spacing(1)
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
  const classes = useStyles();
  const links: any[] = [];
  props.crumbs.forEach(crumb => {
    links.push(<Link key={crumb.label} color="inherit" href={crumb.href}>{crumb.label}</Link>);
  })
  return (
    <Breadcrumbs className={classes.crumbs} separator={<NavigateNext fontSize="small" />}>
      {links}
    </Breadcrumbs>
  )
}