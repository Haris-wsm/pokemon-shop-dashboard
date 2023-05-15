import { Box, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import DrawerPermanent from "../DrawerPermanent";

const MainLayout = (props) => {
  const [drawerWidth, setDrawerWidth] = useLocalStorage("drawerWidth", 240);

  const handleDrawerWidthChange = (newWidth) => {
    setDrawerWidth(newWidth);
  };

  return (
    <>
      <CssBaseline />
      <Navbar setWidth={handleDrawerWidthChange} width={drawerWidth} />
      <Box sx={{ display: "flex" }} className="h-screen">
        <DrawerPermanent
          width={drawerWidth}
          setWidth={handleDrawerWidthChange}
        />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 0, sm: 1, md: 3 } }}>
          {props.children}
        </Box>
      </Box>
    </>
  );
};

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue =
      typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default MainLayout;
