import React from 'react';
import {AppBar, Avatar, IconButton, Toolbar, useScrollTrigger} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {headerStyles} from './style';
import MoreIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HeaderAccount from "./menu-account";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {IRootState} from "../../reducer";

export interface IHeader {
    toggleSidebar: () => void,
    isSidebarOpened: boolean
}

const Header = ({toggleSidebar, isSidebarOpened}: IHeader) => {
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

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });
    const menuId = 'account-menu';
    return <>
        <AppBar elevation={trigger ? 5 : 0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    color="primary"
                    aria-label="open drawer"
                    onClick={toggleSidebar}
                    className={classNames(
                        classes.headerMenuButton,
                        classes.headerMenuButtonCollapse,
                    )}
                    size="large">
                    { isSidebarOpened ? (
                        <ArrowBackIcon
                            classes={{
                                root: classNames(
                                    classes.headerIcon,
                                    classes.headerIconCollapse,
                                ),
                            }}
                        />
                    ) : (
                        <MenuIcon
                            classes={{
                                root: classNames(
                                    classes.headerIcon,
                                    classes.headerIconCollapse,
                                ),
                            }}
                        />
                    )}
                </IconButton>
                <div className={classes.grow}/>
                <div className={classes.sectionDesktop}>
                    <IconButton
                        aria-haspopup='true'
                        aria-controls={menuId}
                        aria-label="account of current user"
                        onClick={handleProfileMenuOpen}
                        size="large">
                        <Avatar alt={ account.login?.toUpperCase() }
                                src='/broken-image.jpg'
                                className={classes.avatar}/>
                    </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton
                        aria-haspopup='true'
                        aria-controls={menuId}
                        aria-label="account of current user"
                        onClick={handleProfileMenuOpen}
                        size="large">
                        <MoreIcon/>
                    </IconButton>
                </div>
                <HeaderAccount {...{
                    anchorEl: anchorEl,
                    menuId: menuId,
                    isMenuOpen: isMenuOpen,
                    handleMenuClose: handleMenuClose
                }}/>
            </Toolbar>
        </AppBar>
    </>;
};
export default Header;

