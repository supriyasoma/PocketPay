import { createTheme } from "@mui/material/styles";
import React from "react";
import './theme.css';
declare module "@mui/material/styles" {
  interface Palette {
    primaryColor: {
      500?: string;
      300?: string;
      100?: string;
    };
    textColor: {
      highemp?: string;
      lowemp?: string;
      medemp?: string;
    };
    greyColor: {
      stroke: string;
      icon01: string;
      icon02: string;
    };
    structuralColor: {
      background?: string;
      buttonhover?: string;
      white?: string;
      hovercolor?: string;
    };
  }

  interface PaletteOptions {
    primaryColor?: {
      500?: string;
      300?: string;
      100?: string;
    };
    textColor?: {
      highemp?: string;
      lowemp?: string;
      medemp?: string;
    };
    greyColor: {
      stroke: string;
      icon01: string;
      icon02: string;
    };
    structuralColor: {
      background?: string;
      buttonhover?: string;
      white?: string;
      hovercolor?: string;
    };
  }

  interface TypographyVariants {
    heading1: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    body3: React.CSSProperties;
    caption1: React.CSSProperties;
    linktext: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    heading1: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    body3: React.CSSProperties;
    caption1: React.CSSProperties;
    linktext: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    heading1: true;
    body1: true;
    body2: true;
    body3: true;
    caption1: true;
    linktext: true;
  }
}

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 601,
      md: 1081,
      lg: 1441,
      xl: 1920,
    },
  },
  spacing: 4,
  palette: {
    primaryColor: {
      500: "#7633FF",
      300: "#9764FF",
      100: "#E4D6FF",
    },
    structuralColor: {
      background: "#F8F9FA",
      buttonhover: "#F4EFFF",
      white: "#FFFFFF",
      hovercolor: "#F3F2F5",
    },
    textColor: {
      highemp: "#141414",
      medemp: "#77767A",
      lowemp: "#9F9DA3",
    },
    greyColor: {
      stroke: "#E4E4E5",
      icon01: "#141414",
      icon02: "#A5A8AC",
    },
  },

  typography: {
    heading1: {
      fontFamily: "Gerbra",
      fontWeight: "Regular",
      fontSize: "24px",
      lineHeight: "40px",
    },
    body1: {
      fontFamily: "Gerbra",
      fontWeight: "Regular",
      fontSize: "20px",
      lineHeight: "32px",
    },
    body2: {
      fontFamily: "Gerbra",
      fontWeight: "Regular",
      fontSize: "17px",
      lineHeight: "24px",
    },
    body3: {
      fontFamily: "Gerbra",
      fontWeight: "Regular",
      fontSize: "16px",
      lineHeight: "24px",
    },
    caption1: {
      fontFamily: "Gerbra",
      fontWeight: "Regular",
      fontSize: "14px",
      lineHeight: "21px",
    },
    linktext: {
      fontFamily: "Gerbra",
      fontWeight: "Regular",
      fontSize: "14px",
      lineHeight: "13.3px",
      textDecoration: "underline",
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#9F9DA3",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color:"#7633FF"
          }
        }
      }
    },
  },
});

theme = createTheme({ ...theme });

export default theme;
