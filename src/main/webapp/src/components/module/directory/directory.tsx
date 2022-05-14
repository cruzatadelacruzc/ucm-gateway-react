import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import Header from './header';
import {Container, Grid, Tab, Tabs, Typography} from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PersonIcon from '@mui/icons-material/Person';
import CardPerson from './card-person';
import {getSearchPerson, getSearchPhone, getSearchWorkPlace} from './search-result.reducer';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../shared/reducer";
import {ISearchResultPerson} from "../../shared/models/search-result-person.model";
import {ISearchResultWorkPlace} from "../../shared/models/search-result-workplace.model";
import {ISearchResultPhone} from "../../shared/models/search-result-phone.model";
import {INDICES} from "../../../config/constants";
import CardWorkPlace from "./card-workplace";
import {REDIRECT_URL} from "../../shared/util/url-util";

export interface IDirectoryProps {
    searchValue: string;
    handleSearchValue: (e: React.ChangeEvent<{}>) => void;
    startSearching: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function Directory() {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>('Cesar');
    const search = useSelector((states: IRootState) => states.search);

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
                            <Typography variant='subtitle2' display='inline' gutterBottom>
                                {t('directory:result_announce', {
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
            <Container>
                <Grid container alignItems='flex-start' spacing={3}>
                    <Grid xs={12} item>
                        <Tabs onChange={handleTabChange} indicatorColor='primary' textColor='primary' value={tabValue}>
                            <Tab label={t('directory:tab.people')} icon={<PersonIcon/>}/>
                            <Tab label={t('directory:tab.workplaces')} icon={<HomeWorkIcon/>}/>
                            {/*{(auth.isAuthenticated && hasAnyAuthority(auth.account.authorities, [AUTHORITIES.ADMIN])) &&*/}
                            {/*<Tab label={t('directory:tab.phones')} icon={<ContactPhoneIcon/>}/>}*/}
                        </Tabs>
                    </Grid>
                    {tabValue === 0 && <DisplayCardList {...search.resultPerson}/>}
                    {tabValue === 1 && <DisplayCardList {...search.resultWorkPlace}/>}
                    {/*{(auth.isAuthenticated && hasAnyAuthority(auth.account.authorities, [AUTHORITIES.ADMIN])) &&*/}
                    {/*tabValue === 2 && <DisplayCardList {...search.resultPhone}/>}*/}
                </Grid>
            </Container>
        </>
    );
}
