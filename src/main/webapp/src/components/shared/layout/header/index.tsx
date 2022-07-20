import React from 'react';
import {Avatar, Box, ButtonBase} from '@mui/material';
import ProfileSection from "./profile-section";
import {useTheme} from "@mui/material/styles";
import {Menu} from "@mui/icons-material";
import NotificationSection from "./notification-section";
import LogoSection from "./logo-section";

export interface IHeader {
    toggleSidebar: () => void,
    isSidebarOpened: boolean
}

const Header = ({toggleSidebar}: IHeader) => {
    const theme = useTheme();
    return <>
        <Box
            sx={{
               width: 228,
               display: 'flex',
               [theme.breakpoints.down('md')]: {
                   width: 'auto'
               }
            }}>
            <Box component="span" sx={{display: {xs: 'none', md: 'block'}, flexGrow: 1}}>
                <LogoSection/>
            </Box>
            <ButtonBase>
                <Avatar
                    variant="rounded"
                    sx={{
                        cursor: 'pointer',
                        fontSize: '1.25rem',
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.secondary.main,
                        color: theme.palette.background.default,
                        '&:hover': {
                            color: theme.palette.secondary.contrastText,
                            background: theme.palette.secondary.light,
                        }
                    }}
                    onClick={toggleSidebar}
                    color="inherit"
                >
                    <Menu/>
                </Avatar>
            </ButtonBase>
        </Box>
        <Box sx={{flexGrow: 1}}/>
            <Box sx={{ flexGrow: 1 }} />
            {/* notification & profile */}
            <NotificationSection />
            <ProfileSection />
    </>
};
export default Header;

