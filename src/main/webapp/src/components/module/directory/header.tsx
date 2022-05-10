import React from 'react';
import {KeyboardArrowUp as KeyboardArrowUpIcon, Search as SearchIcon} from '@mui/icons-material';
import ScrollTop from '../../shared/components/scroll-top';
import {
    AppBar,
    ButtonBase,
    Fab,
    IconButton,
    InputBase,
    Paper,
    Toolbar,
    useScrollTrigger,
    useTheme
} from '@mui/material';
import {Link} from 'react-router-dom';
import {IDirectoryProps} from './directory';
import {headerStyles} from './style';
import {useTranslation} from 'react-i18next';
import ProfileSection from '../../shared/layout/header/profile-section';
import SvgLogo from "../../shared/components/svg-logo";


export default function Header(props: IDirectoryProps) {
    const theme = useTheme();
    const classes = headerStyles();
    const {t} = useTranslation(['header']);
    const {handleSearchValue, searchValue, startSearching} = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return (
        <div className={classes.grow}>
            <AppBar elevation={trigger ? 5 : 0} className={classes.appBar}>
                <Toolbar>
                    <ButtonBase disableRipple component={Link} to="/"
                                sx={{[theme.breakpoints.down('sm')]: {display: 'none'}}}
                    >
                        <SvgLogo sx={{fontSize: '3.5rem'}}/>
                    </ButtonBase>
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
                            <IconButton
                                type='submit'
                                className={classes.iconButton}
                                aria-label='search'
                                size="large">
                                <SearchIcon/>
                            </IconButton>
                        </form>
                    </Paper>
                    <div className={classes.grow}/>
                    <ProfileSection />
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
