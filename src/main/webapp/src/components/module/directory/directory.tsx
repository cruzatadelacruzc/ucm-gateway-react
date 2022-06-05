import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import Header from './header';
import {Container, Grid, Tab, Tabs, Typography} from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PersonIcon from '@mui/icons-material/Person';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CardPerson from './card-person';
import {getSearchPerson, getSearchPhone, getSearchWorkPlace} from './search-result.reducer';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../shared/reducer";
import {ISearchResultPerson} from "../../shared/models/search-result-person.model";
import {ISearchResultWorkPlace} from "../../shared/models/search-result-workplace.model";
import {ISearchResultPhone} from "../../shared/models/search-result-phone.model";
import {AUTHORITIES, INDICES} from "../../../config/constants";
import CardWorkPlace from "./card-workplace";
import {REDIRECT_URL} from "../../shared/util/url-util";
import {hasAnyAuthority} from "../../shared/auth/private-route";
import {useTheme} from "@mui/styles";
import CardPhone from "./card-phone";

export interface IDirectoryProps {
    searchValue: string;
    handleSearchValue: (e: React.ChangeEvent<{}>) => void;
    startSearching: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function Directory() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const {t} = useTranslation('directory');
    const [tabValue, setTabValue] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const search = useSelector((states: IRootState) => states.search);
    const isAuthenticated = useSelector((states: IRootState) => states.auth.isAuthenticated);
    const authorities = useSelector((states: IRootState) => states.auth.account.authorities);

    const canShowPhone = isAuthenticated && hasAnyAuthority(authorities, [AUTHORITIES.ADMIN])

    // Flow: user wants access private route, he is redirect to login page and save in localStorage the route private,
    // after successful flow login, hi is redirect to public route(/) and if REDIRECT_URL exists in localStorage
    // redirect to route
    useEffect(() => {
        const redirectURL = localStorage.getItem(REDIRECT_URL);
        if (redirectURL) {
            window.localStorage.removeItem(REDIRECT_URL);
            window.location.href = `${window.location.origin}${redirectURL}`;
        }
    });

    const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };
    const handleSearchValue = event => setSearchValue(event.target.value);
    type SearchResultType = ISearchResultPerson | ISearchResultPhone | ISearchResultWorkPlace;

    const startSearching = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        switch (tabValue) {
            case 0:
                dispatch(getSearchPerson(searchValue));
                break;
            case 1:
                dispatch(getSearchWorkPlace(searchValue));
                break;
            case 2:
                dispatch(getSearchPhone(searchValue));
                break;
            default:
                break;
        }
    };

    const props: IDirectoryProps = {
        handleSearchValue: handleSearchValue,
        searchValue: searchValue,
        startSearching: startSearching,
    };
    const DisplayCardList = (props: SearchResultType) => {
        return (
            <>
                {props.hits.total > 0 ? (
                    <Grid xs={12} container spacing={3} item>
                        <Grid item xs={12}>
                            <Typography variant='subtitle2' display='inline'>
                                {t('result_announce', {
                                    count: props.hits.total,
                                    second: props.took / 1000,
                                    quality: props.hits.max_score,
                                })}
                            </Typography>
                        </Grid>
                        {props.hits.total > 0 ?
                            (
                                props.hits.hits.map((result, index) => (
                                    <Grid key={index} item xs={12}>
                                        {(result._type === INDICES.EMPLOYEES || result._type === INDICES.STUDENTS) &&
                                        <CardPerson {...result} />}
                                        {result._type === INDICES.WORKPLACES && <CardWorkPlace {...result}/>}
                                        {result._type === INDICES.PHONES && <CardPhone {...result}/>}
                                    </Grid>
                                ))
                            ) : (
                                <Typography variant='h4' component='h5'>
                                    No hay Elementos que mostrar
                                </Typography>
                            )}
                    </Grid>
                ) : (
                    <Typography variant='h4' component='h5'>
                        Ordene mi amo
                    </Typography>
                )}
            </>
        )
    }

    return (
        <>
            <Header {...props} />
            <Container sx={{mt: theme.spacing(4.5)}}>
                <Grid container direction="column" alignItems='flex-start' spacing={3}>
                    <Grid xs={12} item>
                        <Tabs onChange={handleTabChange} indicatorColor='primary' textColor='primary' value={tabValue}>
                            <Tab label={t('tab.people')} icon={<PersonIcon/>}/>
                            <Tab label={t('tab.workplaces')} icon={<HomeWorkIcon/>}/>
                            {canShowPhone && <Tab label={t('tab.phones')} icon={<ContactPhoneIcon/>}/>}
                        </Tabs>
                    </Grid>
                    <Grid xs={12} item>
                        {tabValue === 0 && <DisplayCardList {...search.resultPerson}/>}
                        {tabValue === 1 && <DisplayCardList {...search.resultWorkPlace}/>}
                        {canShowPhone && tabValue === 2 && <DisplayCardList {...search.resultPhone}/>}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
