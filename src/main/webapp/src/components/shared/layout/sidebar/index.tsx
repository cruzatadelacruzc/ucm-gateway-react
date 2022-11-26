import React from "react";
import {Box, Drawer, useMediaQuery, useTheme} from "@mui/material";
import {drawerWidth} from "../../../../config/constants";
import LogoSection from "../header/logo-section";
import {BrowserView, MobileView} from "react-device-detect";
import PerfectScrollbar from 'react-perfect-scrollbar'
import MenuItems from "./menu-items";

export interface ISidebar {
    toggleSidebar: () => void,
    isSidebarOpened: boolean
}

const Sidebar = ({toggleSidebar, isSidebarOpened}: ISidebar) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const drawer = (
        <>
            <Box sx={{display: {xs: 'block', md: 'none'}}}>
                <Box sx={{display: 'flex', p: 2, mx: 'auto'}}>
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
        </>
    )

    return (
        <Box component="nav" sx={{flexShrink: {md: 0}, width: matchUpMd ? drawerWidth : 'auto'}}
             aria-label="mailbox folders">
            <Drawer
                anchor="left"
                container={() => window.document.body}
                open={isSidebarOpened}
                onClose={toggleSidebar}
                variant={'temporary'}
                sx={{
                    display: {xs: 'block', md: 'none'},
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: 'none'
                    }
                }}
                ModalProps={{keepMounted: true}}
            >
                {drawer}
            </Drawer>
            <Drawer
                anchor="left"
                open={isSidebarOpened}
                onClose={toggleSidebar}
                variant={'persistent'}
                sx={{
                    display: {xs: 'none', md: 'block'},
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        top: '88px'
                    }
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

export default Sidebar;