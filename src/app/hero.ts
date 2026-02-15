import { heroui } from "@heroui/react";

export default heroui({
  defaultTheme: "dark",
  themes: {
    dark: {
      colors: {
        background: "#110B07",
        foreground: "#ECEDEE",
        primary: {
          50: "#FFF1F1",
          100: "#FFE0E0",
          200: "#FFC7C7",
          300: "#FFA3A3",
          400: "#FF6B6B",
          500: "#FF4D4D",
          600: "#E63E3E",
          700: "#CC2D2D",
          800: "#A82424",
          900: "#8B1F1F",
          DEFAULT: "#FF4D4D",
          foreground: "#FFFFFF",
        },
        secondary: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
          DEFAULT: "#F97316",
          foreground: "#FFFFFF",
        },
      },
    },
  },
});
