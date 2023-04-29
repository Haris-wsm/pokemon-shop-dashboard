import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { signOut } from "next-auth/react";

const Navbar = ({ setWidth, width }) => {
  const logout = () => {
    signOut();
  };

  const handleResizeDrawer = () => {
    width === 240 ? setWidth(60) : setWidth(240);
  };
  return (
    <>
      <AppBar position="static" className="z-[1200] ">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleResizeDrawer}
          >
            <MenuIcon className="text-white" />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="text-white"
          >
            Admin
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Tooltip title="ออกจากระบบ">
            <ExitToAppIcon
              className="text-white cursor-pointer"
              onClick={logout}
            />
          </Tooltip>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
