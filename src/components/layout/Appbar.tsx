"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "@mui/material";
import useAuth from "@/auth/useAuth";
import { useLocale } from "next-intl";
import { useLocalStorage } from "@uidotdev/usehooks";
import { usePathname } from "@/navigation";

export default function Appbar() {
  const { isAuthenticated, logout, redirectToLogin } = useAuth();
  const [, savePath] = useLocalStorage("currentPageBeforeLogout", "");
  const path = usePathname();

  const locale = useLocale() as "th" | "en";

  const onLogout = () => {
    logout();
    savePath(path);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Link
          href={"/"}
          variant="h6"
          sx={{ flexGrow: 1, color: "white" }}
          underline="none"
        >
          Exambrisk
        </Link>
        <Box>
          {locale === "th" ? (
            <Button color="inherit" href="/en">
              en
            </Button>
          ) : (
            <Button color="inherit" href="/th">
              ไทย
            </Button>
          )}
          {isAuthenticated ? (
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => redirectToLogin()}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
