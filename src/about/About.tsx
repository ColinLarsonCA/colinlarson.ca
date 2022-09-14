import React from "react";
import { useWidth } from "hooks";
import { TopBar } from "./TopBar";
import { SideBar } from "./SideBar";

interface Props {
  toggleTheme: () => void;
}

export function About(props: Props) {
  const width = useWidth();
  const isMobile = width !== "lg" && width !== "xl";
  return isMobile ? <TopBar {...props} /> : <SideBar {...props} />;
}
