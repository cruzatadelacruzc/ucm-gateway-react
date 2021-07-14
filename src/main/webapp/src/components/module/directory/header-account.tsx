import React, { useState, Fragment, useEffect, useContext } from 'react';
import { Avatar, Menu, MenuItem, IconButton, Typography, Link } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import { headerStyles } from './style';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { REDIRECT_URL, getLoginUrl } from '../../shared/util/url-util';
import { AppContext } from '../../../config/context';
import { NavLink as RouterLink } from 'react-router-dom';


export default function HeaderAccount() {
  const {
    states: { authentication },
  } = useContext(AppContext);
  const [profileMenu, setProfileMenu] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const { t } = useTranslation(['common']);
  const classes = headerStyles();

    useEffect(() => {
        const redirectURL = localStorage.getItem(REDIRECT_URL);
        if (redirectURL) {
            window.localStorage.removeItem(REDIRECT_URL);
            window.location.href = `${window.location.origin}${redirectURL}`;
        }
    });

    const PrivateMenu = function () {
        return(
            <div>
                <MenuItem component={RouterLink} to={"/profile"} className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
                    <AccountCircleOutlinedIcon className={classes.profileMenuIcon} />
                    {t('common:profile')}
                </MenuItem>
                <MenuItem component={RouterLink} to={"/dashboard"} className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
                    Dashboard
                </MenuItem>
            </div>
        )
    }
    const LogInOut = function (){
        return(
            <MenuItem className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
                <MeetingRoomOutlinedIcon className={classes.profileMenuIcon} />
                {authentication.isAuthenticated ?
                    <Link component={RouterLink} to={"/logout"} >{t('common:log_out')}</Link>:
                    <Link href={getLoginUrl()}>{t('common:log_in')}</Link>
                }
            </MenuItem>
        )
    }

  return (
    <Fragment>
      <IconButton aria-haspopup='true' aria-controls='profile-menu' onClick={e => setProfileMenu(e.currentTarget)}>
        <Avatar alt='Cesar Manuel' src='/broken-image.jpg' className={classes.avatar} />
      </IconButton>
      <Menu
        id='profile-menu'
        open={Boolean(profileMenu)}
        anchorEl={profileMenu}
        onClose={() => setProfileMenu(null)}
        className={classes.headerMenu}
        classes={{ paper: classes.profileMenu }}
        disableAutoFocusItem
      >
        <div className={classes.profileMenuUser}>
          <Typography variant='overline' display='block'>
            {authentication.account.login ? authentication.account.login : t('common:anonymous')}
          </Typography>
        </div>
        {/*{authentication.isAuthenticated && <PrivateMenu/>}*/}
          <PrivateMenu/>
       <LogInOut/>
      </Menu>
    </Fragment>
  );
}
