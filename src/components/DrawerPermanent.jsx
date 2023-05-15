import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MultilineChartIcon from "@mui/icons-material/MultilineChart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import SettingsIcon from "@mui/icons-material/Settings";
import PublicIcon from "@mui/icons-material/Public";
import ContactMailIcon from "@mui/icons-material/ContactMail";

import {
  Divider,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Collapse,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const DrawerPermanent = ({ width, setWidth }) => {
  // const [width, setWidth] = useState(drawerWidth);
  // const theme = useTheme();

  const match = useMediaQuery("(max-width:1100px)");

  useEffect(() => {
    if (match) setWidth(60);
    else setWidth(width);
  }, [match]);

  const router = useRouter();
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openEditPage, setOpenEditPage] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);
  const [openSetting, setSetting] = useState(false);

  const [selectedItemListMainIndex, setSelectedItemListMainIndex] = useState(0);
  const [selectedItemListSubIndex, setSelectedItemListSubIndex] = useState(0);

  const handleListItemSubClick = (path, index) => {
    setSelectedItemListSubIndex(index);
    router.push(path);
  };

  const handleListItemMainClick = (index) => {
    setOpenDashboard(false);
    setOpenProduct(false);
    setOpenEditPage(false);
    setOpenBlog(false);
    setSetting(false);

    setSelectedItemListMainIndex(index);
    if (index === 0) {
      setOpenDashboard(!openDashboard);
    } else if (index === 1) {
      setOpenProduct(!openProduct);
    } else if (index === 2) {
      setOpenEditPage(!openEditPage);
    } else if (index === 3) {
      setOpenBlog(!openBlog);
    } else if (index === 4) {
      setSetting(!openSetting);
    }
  };
  const menuItems = [
    {
      id: 1,
      text: "Dashboard",
      icon: <DashboardIcon />,
      open: openDashboard,
      subMenus: [
        {
          text: "สรุปภาพรวม",
          icon: <MultilineChartIcon />,
          path: "/dashboard/overall",
        },
      ],
    },
    {
      id: 2,
      text: "จัดการสินค้า",
      icon: <AllInboxIcon />,
      open: openProduct,
      subMenus: [
        {
          text: "สินค้าทั้งหมด",
          icon: <ListAltIcon />,
          path: "/products/all",
        },
        {
          text: "ประเภทสินค้า",
          icon: <ListAltIcon />,
          path: "/products/catergories",
        },
        {
          text: "เพิ่มสินค้า",
          icon: <AddIcon />,
          path: "/products/add",
        },
      ],
    },
    {
      id: 4,
      text: "จัดการหน้าเว็บ",
      icon: <BorderColorIcon />,
      open: openEditPage,
      subMenus: [
        {
          text: "Banner",
          icon: <ViewCarouselIcon />,
          path: "/banner/view",
        },
        {
          text: "Hero Section",
          icon: <EditNoteIcon />,
          path: "/editor/hero-section",
        },
        {
          text: "Terms of Service",
          icon: <EditNoteIcon />,
          path: "/editor/term-of-service",
        },
        {
          text: "Privacy Policy",
          icon: <EditNoteIcon />,
          path: "/editor/privacy-policy",
        },
        {
          text: "About Us",
          icon: <EditNoteIcon />,
          path: "/editor/about-us",
        },
      ],
    },
    {
      id: 5,
      text: "จัดการบล็อก",
      icon: <MarkUnreadChatAltIcon />,
      open: openBlog,
      subMenus: [
        {
          text: "บล็อคทั้งหมด",
          icon: <ListAltIcon />,
          path: "/blog/view",
        },
        {
          text: "สร้างบล็อค",
          icon: <DesignServicesIcon />,
          path: "/blog/create",
        },
      ],
    },
    {
      id: 6,
      text: "การตั้งค่า",
      icon: <SettingsIcon />,
      open: openSetting,
      subMenus: [
        {
          text: "Socail",
          icon: <PublicIcon />,
          path: "/setting/social",
        },
        {
          text: "Contact",
          icon: <ContactMailIcon />,
          path: "/setting/contact",
        },
      ],
    },
  ];

  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        flexShrink: 0,
        width: width,
        "& .MuiPaper-root": {
          width: width,
          position: "sticky",
          overflow: "hidden",
        },
      }}
    >
      <List className="z-[1000]">
        {menuItems.map((menuItem, index) => (
          <Fragment key={index}>
            <Tooltip
              title={
                <Typography className="text-xs">{menuItem.text}</Typography>
              }
              placement="right"
              //   disableHoverListener={openDrawer}
              arrow
            >
              <ListItem
                key={menuItem.id}
                button
                onClick={() => handleListItemMainClick(index)}
                selected={selectedItemListMainIndex === index}
              >
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText
                  primary={menuItem.text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: 14,
                    },
                  }}
                />
              </ListItem>
            </Tooltip>
            <Collapse in={menuItem.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {menuItem.subMenus.map((menu, index_sub) => (
                  <Tooltip
                    title={
                      <Typography className="text-xs">{menu.text}</Typography>
                    }
                    placement="right"
                    // disableHoverListener={openDrawer}
                    arrow
                    key={index_sub}
                  >
                    <ListItem
                      key={menu.text}
                      button
                      onClick={() =>
                        handleListItemSubClick(menu.path, index_sub)
                      }
                      selected={
                        selectedItemListSubIndex === index_sub &&
                        router.pathname === menu.path
                      }
                    >
                      <ListItemIcon>{menu.icon}</ListItemIcon>

                      <ListItemText
                        primary={menu.text}
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontSize: 14,
                          },
                        }}
                      />
                    </ListItem>
                  </Tooltip>
                ))}
              </List>
            </Collapse>

            <Divider />
          </Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerPermanent;
