import React from 'react';
import {Link, Menu, MenuItem, Typography} from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
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
  const { isAuthenticated, account } = useSelector((states: IRootState) => states.auth);
  const { t } = useTranslation();
  const classes = headerStyles();

    const PrivateMenu = function () {
        return(
            <div>
                <MenuItem component={RouterLink} to={"/"} className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
                    {t('common:directory')}
                </MenuItem>
                <MenuItem component={RouterLink} to={"/profile"} className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
                    <AccountCircleOutlinedIcon className={classes.profileMenuIcon} />
                    {t('common:profile')}
                </MenuItem>
                <MenuItem component={RouterLink} to={"/home"} className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
                    {t('common:dashboard')}
                </MenuItem>
            </div>
        )
    }
    const LogInOut = function (){
        return(
            <MenuItem className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
                <MeetingRoomOutlinedIcon className={classes.profileMenuIcon} />
                {isAuthenticated ?
                    <Link component={RouterLink} to={"/logout"} >{t('common:log_out')}</Link>:
                    <Link href={getLoginUrl()}>{t('common:log_in')}</Link>
                }
            </MenuItem>
        )
    }

  return (
    <>
      <Menu
        id={props.menuId}
        open={props.isMenuOpen}
        anchorEl={props.anchorEl}
        onClose={props.handleMenuClose}
        className={classes.headerMenu}
        classes={{ paper: classes.profileMenu }}
        disableAutoFocusItem
      >
        <div className={classes.profileMenuUser}>
          <Typography variant='overline' display='block'>
            {account.login ? account.login : t('common:anonymous')}
          </Typography>
        </div>
        {isAuthenticated && <PrivateMenu/>}
       <LogInOut/>
      </Menu>
    </>
  );
}
