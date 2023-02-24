import { PaletteMode, useTheme } from "@mui/material";

export function useThemeMode(): PaletteMode {
  return useTheme().palette.mode;
}

export function useIsDark(): boolean {
  return useThemeMode() === "dark";
}

export function useIsLight(): boolean {
  return useThemeMode() === "light";
}
