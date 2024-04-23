"use client";
import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import componentsOverride from "./overrides";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  palette: {
    primary:{
      main: "#333"
    }
  },
});

theme.components = {
  ...componentsOverride(theme),
};

export default theme;
