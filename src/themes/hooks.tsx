import { useTheme } from "@material-ui/core";

export function useThemeType() {
  return useTheme().palette.type;
}

export function useIsDark() {
  return useThemeType() === "dark";
}

export function useIsLight() {
  return useThemeType() === "light";
}
