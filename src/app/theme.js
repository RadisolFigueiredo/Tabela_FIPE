import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal"],
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.className,
  },
});

export default theme;
