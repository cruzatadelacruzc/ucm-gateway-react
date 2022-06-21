import React from 'react';
import {KeyboardArrowUp as KeyboardArrowUpIcon, Search as SearchIcon} from '@mui/icons-material';
import ScrollTop from '../../shared/components/scroll-top';
import {AppBar, ButtonBase, Fab, IconButton, InputBase, Paper, Toolbar, useScrollTrigger} from '@mui/material';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import ProfileSection from '../../shared/layout/header/profile-section';
import SvgLogo from "../../shared/components/svg-logo";
import styled from "@mui/material/styles/styled";

const StyledPaper = styled(Paper, {shouldForwardProp: trigger => trigger !== 'trigger'})<{ trigger: boolean }>(({theme, trigger}) => ({
    padding: "2px 4px",
    width: "100%",
    borderRadius: 50,
    flexGrow: 1,
    marginRight: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(0),
    },
    ...(trigger && {border: '1px solid #e0e2e6'})
}));

interface IHeader {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    inputSearchRef: React.RefObject<HTMLInputElement>;
}

export default function Header(props: IHeader) {
    const {t} = useTranslation(['directory']);
    const {onSubmit, inputSearchRef} = props
    const trigger = useScrollTrigger();

    return (
        <>
            <AppBar elevation={trigger ? 5 : 0} sx={{backgroundColor: "#fff"}}>
                <Toolbar disableGutters>
                    <ButtonBase disableRipple component={Link} to="/" sx={{
                        flexGrow: 1,
                        mr: {xs: 0, sm: 5},
                        display: {xs: 'none', sm: 'inline-flex'}
                    }}>
                        <SvgLogo sx={{fontSize: '3.5rem'}}/>
                    </ButtonBase>
                    <StyledPaper elevation={trigger ? 0 : 2} trigger={trigger}>
                        <form onSubmit={onSubmit} style={{width: "100%", display: "flex"}}>
                            <InputBase
                                inputRef={inputSearchRef}
                                type='search'
                                autoFocus
                                sx={{
                                    borderRadius: 50,
                                    width: '100%',
                                    ml: 1
                                }}
                                placeholder={t('placeholder')}
                                inputProps={{'aria-label': t('placeholder').toLowerCase()}}
                            />
                            <IconButton
                                type='submit'
                                sx={{p: 1}}
                                aria-label='search'
                                size="large">
                                <SearchIcon/>
                            </IconButton>
                        </form>
                    </StyledPaper>
                    <ProfileSection/>
                </Toolbar>
            </AppBar>
            <Toolbar id='back-to-top-anchor'/>
            <ScrollTop>
                <Fab color='secondary' size='small' aria-label='scroll back to top'>
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </>
    );
}
