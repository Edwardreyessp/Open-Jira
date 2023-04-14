import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Link as Linki,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useContext } from "react";
import { UIContext } from "@/context/ui";
import Link from "next/link";

export const Navbar = () => {
  const { openSidebarMenu } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSidebarMenu}>
          <MenuRoundedIcon />
        </IconButton>
        <Link href="/" passHref>
          {/* <Linki underline="none" color="white"> */}
          <Typography variant="h6" color="white">
            Open Jira
          </Typography>
          {/* </Linki> */}
        </Link>
      </Toolbar>
    </AppBar>
  );
};
