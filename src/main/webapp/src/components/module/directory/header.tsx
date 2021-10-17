import React from 'react';
import {KeyboardArrowUp as KeyboardArrowUpIcon, Search as SearchIcon} from '@material-ui/icons';
import ScrollTop from '../../shared/scroll-top';
import {AppBar, Avatar, Fab, IconButton, InputBase, Paper, Toolbar, useScrollTrigger} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {IDirectoryProps} from './directory';
import {headerStyles} from './style';
import {useTranslation} from 'react-i18next';
import HeaderAccount from '../../shared/layout/header/menu-account';
import MoreIcon from "@material-ui/icons/MoreVert";
import {useSelector} from "react-redux";
import {IRootState} from "../../shared/reducer";


export default function Header(props: IDirectoryProps) {
    const classes = headerStyles();
    const {t} = useTranslation(['header']);
    const {handleSearchValue, searchValue, startSearching} = props;
    const { account } = useSelector((states: IRootState) => states.auth);
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
    return (
        <div className={classes.grow}>
            <AppBar elevation={trigger ? 5 : 0} className={classes.appBar}>
                <Toolbar>
                    <div className={classes.logo}>
                    <Link to='/' className={classes.link}>
                        <img alt='logo' src='./oficial-logo.svg' className={classes.large}/>
                    </Link>
                    </div>
                    <div className={classes.grow}/>
                    <Paper elevation={trigger ? 0 : 2} className={classes.paper}
                           style={trigger ? {border: '1px solid #e0e2e6'} : undefined}>
                        <form onSubmit={startSearching} className={classes.form}>
                            <InputBase
                                value={searchValue}
                                onChange={handleSearchValue}
                                type='search'
                                autoFocus
                                className={classes.input}
                                placeholder={t('header:placeholder')}
                                inputProps={{'aria-label': t('header:placeholder').toLowerCase()}}
                            />
                            <IconButton type='submit' className={classes.iconButton} aria-label='search'>
                                <SearchIcon/>
                            </IconButton>
                        </form>
                    </Paper>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            aria-haspopup='true'
                            aria-controls={menuId}
                            aria-label="account of current user"
                            onClick={handleProfileMenuOpen}
                        >
                            <Avatar alt={ account.login?.toUpperCase() }
                                    src='/broken-image.jpg'
                                    className={classes.avatar} />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-haspopup='true'
                            aria-controls={menuId}
                            aria-label="account of current user"
                            onClick={handleProfileMenuOpen}
                        >
                            <MoreIcon />
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
            <Toolbar id='back-to-top-anchor'/>
            <ScrollTop>
                <Fab color='secondary' size='small' aria-label='scroll back to top'>
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </div>
    );
}
