import React from 'react';
import { KeyboardArrowUp as KeyboardArrowUpIcon, Search as SearchIcon } from '@material-ui/icons';
import ScrollTop from '../../shared/scroll-top';
import { InputBase, Fab, AppBar, Toolbar, useScrollTrigger, IconButton, Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IDirectoryProps } from '../../types';
import { headerStyles } from './style';
import { useTranslation } from 'react-i18next';
import HeaderAccount from './header-account';

export default function Header(props: IDirectoryProps) {
  const { handleSearchValue, searchValue, startSearching } = props;
  const classes = headerStyles();
  const { t } = useTranslation(['header']);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <React.Fragment>
      <AppBar elevation={trigger ? 5 : 0} className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={3} justify='space-around'>
            <Grid container item xs alignItems='center' justify='center'>
              <Link to='/' className={classes.link}>
                <img alt='logo' src='./oficial-logo.svg' className={classes.large} />
              </Link>
            </Grid>
            <Grid container item xs={8}>
              <Paper elevation={trigger ? 0 : 2} className={classes.paper} style={trigger ? { border: '1px solid #e0e2e6' } : undefined}>
                <form onSubmit={startSearching} className={classes.form}>
                  <InputBase
                    value={searchValue}
                    onChange={handleSearchValue}
                    type='search'
                    autoFocus
                    className={classes.input}
                    placeholder={t('header:placeholder')}
                    inputProps={{ 'aria-label': t('header:placeholder').toLowerCase() }}
                  />
                  <IconButton type='submit' className={classes.iconButton} aria-label='search'>
                    <SearchIcon />
                  </IconButton>
                </form>
              </Paper>
            </Grid>
            <Grid container item xs alignItems='center' justify='center'>
              <HeaderAccount />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar id='back-to-top-anchor' />
      <ScrollTop>
        <Fab color='secondary' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
