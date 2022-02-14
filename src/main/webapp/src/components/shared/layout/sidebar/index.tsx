import React, {useEffect, useState} from "react";
import {Drawer, IconButton, List, useTheme} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import classNames from 'classnames';
import {sidebarStyles} from "./style";
import SidebarMenu from "./sidebarMenu";
import i18n from "../../../../config/i18n";
import {Apps, Business, ContactPhone, Dashboard, Engineering, School} from "@mui/icons-material";

export const menuItems = [
    {   label: i18n.t("common:dashboard"),
        link: "/home",
        icon: <Dashboard /> },
    {
        label: i18n.t("common:entities.directoryStudent"),
        link: "/student",
        icon: <School />,
    },
    {
        label: i18n.t("common:entities.directoryEmployee"),
        link: "/employee",
        icon: <Engineering />,
    },
    {
        label: i18n.t("common:entities.directoryNomenclature"),
        link: "/nomenclature",
        icon: <Apps />,
    },
    {
        label: i18n.t("common:entities.directoryPhone"),
        link: "/phone",
        icon: <ContactPhone />,
    },
    {
        label: i18n.t("common:entities.directoryWorkPlace"),
        link: "/workplace",
        icon: <Business />,
    },
];

export interface ISidebar {
    toggleSidebar: () => void,
    isSidebarOpened: boolean
}

const Sidebar = ({toggleSidebar, isSidebarOpened}: ISidebar) => {
    const theme = useTheme();
    const classes = sidebarStyles();
    const [isPermanent, setPermanent] = useState(true);

    const handleWindowWidthChange = () => {
        const windowWidth = window.innerWidth;
        const breakpointWidth = theme.breakpoints.values.md;
        const isSmallScreen = windowWidth < breakpointWidth;

        if (isSmallScreen && isPermanent) {
            setPermanent(false);
        } else if (!isSmallScreen && !isPermanent) {
            setPermanent(true);
        }
    }

    useEffect( () => {
        window.addEventListener("resize", handleWindowWidthChange);
        handleWindowWidthChange();
        return function cleanup() {
            window.removeEventListener("resize", handleWindowWidthChange);
        };
    })
   return (
       <Drawer
           variant={isPermanent ? "permanent" : "temporary"}
           className={classNames(classes.drawer, {
               [classes.drawerOpen]: isSidebarOpened,
               [classes.drawerClose]: !isSidebarOpened,
           })}
           classes={{
               paper: classNames({
                   [classes.drawerOpen]: isSidebarOpened,
                   [classes.drawerClose]: !isSidebarOpened,
               }),
           }}
           open={isSidebarOpened}
       >
           <div className={classes.toolbar} />
           <div className={classes.mobileBackButton}>
               <IconButton onClick={toggleSidebar} size="large">
                   <ArrowBackIcon
                       classes={{
                           root: classNames(classes.headerIcon, classes.headerIconCollapse),
                       }}
                   />
               </IconButton>
           </div>
           <List>
               {menuItems.map((link, index) => (
                   <SidebarMenu
                       key={index}
                       isSidebarOpened={isSidebarOpened}
                       {...link}
                   />
               ))}
           </List>
       </Drawer>
   );}

export default Sidebar;