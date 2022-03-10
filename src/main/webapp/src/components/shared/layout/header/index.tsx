import React from 'react';
import {Avatar, Box, ButtonBase} from '@mui/material';
import {headerStyles} from './style';
import ProfileSection from "./profile-section";
import {useSelector} from "react-redux";
import {IRootState} from "../../reducer";
import {useTheme} from "@mui/material/styles";
import {Menu} from "@mui/icons-material";
import NotificationSection from "./notification-section";
import LogoSection from "./logo-section";

export interface IHeader {
    toggleSidebar: () => void,
    isSidebarOpened: boolean
}

const Header = ({toggleSidebar, isSidebarOpened}: IHeader) => {
    const theme = useTheme();
    const { account } = useSelector((states: IRootState) => states.auth);
    const classes = headerStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const menuId = 'account-menu';
    return <>
                {/*<IconButton*/}
                {/*    color="primary"*/}
                {/*    aria-label="open drawer"*/}
                {/*    onClick={toggleSidebar}*/}
                {/*    className={classNames(*/}
                {/*        classes.headerMenuButton,*/}
                {/*        classes.headerMenuButtonCollapse,*/}
                {/*    )}*/}
                {/*    size="large">*/}
                {/*    { isSidebarOpened ? (*/}
                {/*        <ArrowBackIcon*/}
                {/*            classes={{*/}
                {/*                root: classNames(*/}
                {/*                    classes.headerIcon,*/}
                {/*                    classes.headerIconCollapse,*/}
                {/*                ),*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    ) : (*/}
                {/*        <MenuIcon*/}
                {/*            classes={{*/}
                {/*                root: classNames(*/}
                {/*                    classes.headerIcon,*/}
                {/*                    classes.headerIconCollapse,*/}
                {/*                ),*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    )}*/}
                {/*</IconButton>*/}
                {/*<div className={classes.grow}/>*/}
                {/*<div className={classes.sectionDesktop}>*/}
                {/*    <IconButton*/}
                {/*        aria-haspopup='true'*/}
                {/*        aria-controls={menuId}*/}
                {/*        aria-label="account of current user"*/}
                {/*        onClick={handleProfileMenuOpen}*/}
                {/*        size="large">*/}
                {/*        <Avatar alt={ account.login?.toUpperCase() }*/}
                {/*                src='/broken-image.jpg'*/}
                {/*                className={classes.avatar}/>*/}
                {/*    </IconButton>*/}
                {/*</div>*/}
                {/*<div className={classes.sectionMobile}>*/}
                {/*    <IconButton*/}
                {/*        aria-haspopup='true'*/}
                {/*        aria-controls={menuId}*/}
                {/*        aria-label="account of current user"*/}
                {/*        onClick={handleProfileMenuOpen}*/}
                {/*        size="large">*/}
                {/*        <MoreIcon/>*/}
                {/*    </IconButton>*/}
                {/*</div>*/}
                {/*<HeaderAccount {...{*/}
                {/*    anchorEl: anchorEl,*/}
                {/*    menuId: menuId,*/}
                {/*    isMenuOpen: isMenuOpen,*/}
                {/*    handleMenuClose: handleMenuClose*/}
                {/*}}/>*/}
        {/* logo & toggler button */}
        <Box
            sx={{
               width: 228,
               display: 'flex',
               [theme.breakpoints.down('md')]: {
                   width: 'auto'
               }
            }}>
            <Box component="span" sx={{display: { xs: 'none', md: 'block'}, flexGrow: 1}}>
                <LogoSection/>
            </Box>
            <ButtonBase sx={{borderRadius: 12, overflow: 'hidden'}}>
                <Avatar
                    variant="rounded"
                    sx={{
                        width: 34,
                        height: 34,
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        borderRadius: 8,
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.secondary.light,
                        color: theme.palette.secondary.dark,
                        '&:hover': {
                            background: theme.palette.secondary.dark,
                            color: theme.palette.secondary.light
                        }
                    }}
                    onClick={toggleSidebar}
                    color="inherit"
                >
                    <Menu/>
                </Avatar>
            </ButtonBase>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* notification & profile */}
            <NotificationSection />
            <ProfileSection />
        </Box>
        </>
};
export default Header;

