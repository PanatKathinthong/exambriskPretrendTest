import { Theme } from "@mui/material/styles";

import CssBaseline from "./CssBaseline";
import Link from "./Link";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(CssBaseline(theme), Link());
}
