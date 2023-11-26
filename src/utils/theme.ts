import { createTheme, responsiveFontSizes } from "@mui/material";

const initialSettings = {
  colorPreset: "indigo",
  contrast: "normal",
  direction: "ltr",
  layout: "vertical",
  navColor: "evident",
  paletteMode: "light",
  responsiveFontSizes: true,
  stretch: false,
};

let theme = createTheme({
  direction: "ltr",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
