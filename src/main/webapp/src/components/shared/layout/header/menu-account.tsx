import React from 'react';
import {Link, Menu, MenuItem, Typography} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import {BallotOutlined, DashboardOutlined} from '@mui/icons-material';
import {headerStyles} from './style';
import classNames from 'classnames';
import {useTranslation} from 'react-i18next';
import {NavLink as RouterLink} from 'react-router-dom';
import {useSelector} from "react-redux";
import {IRootState} from "../../reducer";
import {getLoginUrl} from "../../util/url-util";

export interface IHeaderMenuAccount {
    anchorEl: HTMLElement | null,
    menuId: string,
    isMenuOpen: boolean,
    handleMenuClose: () => void
}

export default function HeaderAccount(props: IHeaderMenuAccount) {
    const {isAuthenticated, account} = useSelector((states: IRootState) => states.auth);
    const {t} = useTranslation();
    const classes = headerStyles();

    const PrivateMenu = function () {
        return (
            <div>
                <MenuItem component={RouterLink} to={"/profile"}
                          className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
                    <AccountCircleOutlinedIcon className={classes.profileMenuIcon}/>
                    {t('common:profile')}
                </MenuItem>
                <MenuItem component={RouterLink} to={"/home"}
                          className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
                    <DashboardOutlined className={classes.profileMenuIcon}/>
                    {t('common:dashboard')}
                </MenuItem>
            </div>
        )
    }
    const LogInOut = function () {
        return (
            <MenuItem className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
                <MeetingRoomOutlinedIcon className={classes.profileMenuIcon}/>
                {isAuthenticated ?
                    <Link component={RouterLink} to={"/logout"} underline="hover">{t('common:log_out')}</Link> :
                    <Link href={getLoginUrl()} underline="hover">{t('common:log_in')}</Link>
                }
            </MenuItem>
        );
    }

    return (
        <Menu
            id={props.menuId}
            open={props.isMenuOpen}
            anchorEl={props.anchorEl}
            onClose={props.handleMenuClose}
            className={classes.headerMenu}
            classes={{paper: classes.profileMenu}}
            disableAutoFocusItem
        >
            <div className={classes.profileMenuUser}>
                <Typography variant='overline' display='block'>
                    {account.login ? account.login : t('common:anonymous')}
                </Typography>
            </div>
            <MenuItem component={RouterLink} to={"/"}
                      className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
                <BallotOutlined className={classes.profileMenuIcon}/>
                {t('common:directory')}
            </MenuItem>
            {isAuthenticated && <PrivateMenu/>}
            <LogInOut/>
        </Menu>
    );
}
