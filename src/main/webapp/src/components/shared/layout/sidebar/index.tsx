import React from "react";
import {Box, Drawer, useMediaQuery, useTheme} from "@mui/material";
import i18n from "../../../../config/i18n";
import {Apps, Business, ContactPhone, Dashboard, Engineering, School} from "@mui/icons-material";
import {drawerWidth} from "../../../../config/constants";
import LogoSection from "../header/logo-section";
import {BrowserView, MobileView} from "react-device-detect";
import PerfectScrollbar from 'react-perfect-scrollbar'
import MenuItems from "./menu-items";

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
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const container = window !== undefined ? () => window.document.body : undefined;

   //  const classes = sidebarStyles();
   //  const [isPermanent, setPermanent] = useState(true);
   //
   //  const handleWindowWidthChange = () => {
   //      const windowWidth = window.innerWidth;
   //      const breakpointWidth = theme.breakpoints.values.md;
   //      const isSmallScreen = windowWidth < breakpointWidth;
   //
   //      if (isSmallScreen && isPermanent) {
   //          setPermanent(false);
   //      } else if (!isSmallScreen && !isPermanent) {
   //          setPermanent(true);
   //      }
   //  }
   //
   //  useEffect( () => {
   //      window.addEventListener("resize", handleWindowWidthChange);
   //      handleWindowWidthChange();
   //      return function cleanup() {
   //          window.removeEventListener("resize", handleWindowWidthChange);
   //      };
   //  })

   return (
       // <Drawer
       //     variant={isPermanent ? "permanent" : "temporary"}
       //     className={classNames(classes.drawer, {
       //         [classes.drawerOpen]: isSidebarOpened,
       //         [classes.drawerClose]: !isSidebarOpened,
       //     })}
       //     classes={{
       //         paper: classNames({
       //             [classes.drawerOpen]: isSidebarOpened,
       //             [classes.drawerClose]: !isSidebarOpened,
       //         }),
       //     }}
       //     open={isSidebarOpened}
       // >
       //     <div className={classes.toolbar} />
       //     <div className={classes.mobileBackButton}>
       //         <IconButton onClick={toggleSidebar} size="large">
       //             <ArrowBackIcon
       //                 classes={{
       //                     root: classNames(classes.headerIcon, classes.headerIconCollapse),
       //                 }}
       //             />
       //         </IconButton>
       //     </div>
       //     <List>
       //         {menuItems.map((link, index) => (
       //             <SidebarMenu
       //                 key={index}
       //                 isSidebarOpened={isSidebarOpened}
       //                 {...link}
       //             />
       //         ))}
       //     </List>
       // </Drawer>
       <Box component="nav" sx={{flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
       <Drawer
           anchor="left"
           container={container}
           open={isSidebarOpened}
           onClose={toggleSidebar}
           variant={matchUpMd ? 'persistent' : 'temporary'}
           sx={{
               '& .MuiDrawer-paper': {
                   width: drawerWidth,
                   background: theme.palette.background.default,
                   color: theme.palette.text.primary,
                   borderRight: 'none',
                   [theme.breakpoints.up('md')]: {
                       top: '88px'
                   }
               }
           }}
           ModalProps={{ keepMounted: true }}
           color="inherit"
       >
           <Box sx={{display: { xs: 'block', md: 'none' }}}>
               <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                   <LogoSection/>
               </Box>
           </Box>
           <BrowserView>
               <PerfectScrollbar
                   component="div"
                   style={{
                       height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                       paddingLeft: '16px',
                       paddingRight: '16px'
                    }}
               >
                <MenuItems/>
               </PerfectScrollbar>
           </BrowserView>
           <MobileView>
               <Box sx={{px: 2}}>
                   <MenuItems/>
               </Box>
           </MobileView>
       </Drawer>
       </Box>
   );}

export default Sidebar;