import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import Header from './header';
import {Container, Grid, Tab, Tabs, Typography} from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PersonIcon from '@mui/icons-material/Person';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import searchReducer, {
    getSearchPerson,
    getSearchPhone,
    getSearchWorkPlace,
    initialState,
    reset
} from './search-result.reducer';
import {useTranslation} from 'react-i18next';
import {useSelector} from "react-redux";
import {IRootState} from "../../shared/reducer";
import {ISearchResultPerson} from "../../shared/models/search-result-person.model";
import {ISearchResultWorkPlace} from "../../shared/models/search-result-workplace.model";
import {ISearchResultPhone} from "../../shared/models/search-result-phone.model";
import {AUTHORITIES, INDICES} from "../../../config/constants";
import {REDIRECT_URL} from "../../shared/util/url-util";
import {hasAnyAuthority} from "../../shared/auth/private-route";
import Button from "@mui/material/Button";
import {Business as BusinessIcon, Engineering as EngineeringIcon, School as SchoolIcon} from "@mui/icons-material";
import {Link} from "react-router-dom";
import CardWorkPlace from "./card-workplace";
import DisplaySkeleton from "./skeleton";
import CardPerson from "./card-person";
import CardPhone from "./card-phone";

export default function Directory() {
    const {t} = useTranslation('directory');
    const [tabValue, setTabValue] = useState(0);
    const inputEl = React.useRef<HTMLInputElement>(null);
    const [state, dispatch] = React.useReducer(searchReducer, initialState);
    const isAuthenticated = useSelector((states: IRootState) => states.auth.isAuthenticated);
    const authorities = useSelector((states: IRootState) => states.auth.account.authorities);
    const canShowPhone = isAuthenticated && hasAnyAuthority(authorities, [AUTHORITIES.ADMIN]);


    const [more, setMore] = useState(false)
    const observer = React.useRef<IntersectionObserver | null>(null)
    const lastElementRef = React.useCallback((node) => {
        if (state.loading) return;
        if (!observer) return;
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && state.hasMore) {
                setMore(true)
            }
        }, {threshold: 0.8})
        if (node) observer.current.observe(node)
    }, [state.loading, state.hasMore])


    // Flow: user wants access private route, he is redirect to login page and save in localStorage the route private,
    // after successful flow login, hi is redirect to public route(/) and if REDIRECT_URL exists in localStorage
    // redirect to route
    useEffect(() => {
        const redirectURL = window.sessionStorage.getItem(REDIRECT_URL);
        if (redirectURL) {
            window.sessionStorage.removeItem(REDIRECT_URL);
            window.location.href = `${window.location.origin}${redirectURL}`;
        }
    });

    const startSearching = useCallback((inputValue: string, from = 0) => {
        if (inputValue !== "") {
            switch (tabValue) {
                case 0:
                    getSearchPerson(inputValue, from)(dispatch)
                    break;
                case 1:
                    getSearchWorkPlace(inputValue, from)(dispatch);
                    break;
                case 2:
                    getSearchPhone(inputValue, from)(dispatch);
                    break;
                default:
                    break;
            }
        }
    }, [tabValue]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const from = state.fromWorkPlace + state.fromPerson + state.fromPhone
        if (inputEl.current && more && from > 0) {
            startSearching(inputEl.current.value, from)
        }
        return () => setMore(false)
    }, [more, state.fromWorkPlace, state.fromPerson, state.fromPhone]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };
    const handleSearchForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputEl.current) {
            reset()(dispatch)
            startSearching(inputEl.current.value)
        }
    }

    const DisplayCardList = (props: ISearchResultPerson | ISearchResultPhone | ISearchResultWorkPlace) => {

        if (props.hits.total.value > 0 && inputEl.current) {
            return (
                <Grid item container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant='subtitle2' display='inline'>
                            {t('result_announce', {
                                count: props.hits.total.value,
                                second: props.took / 1000,
                                quality: props.hits.max_score,
                            })}
                        </Typography>
                    </Grid>
                    {
                        props.hits.hits.map((result, index) => {
                            const lastCardElementRef = props.hits.hits.length === index + 1 ? lastElementRef : undefined;
                            return <Grid key={index} item xs={12}>
                                {(result._index === INDICES.EMPLOYEES || result._index === INDICES.STUDENTS) &&
                                <CardPerson {...result} ref={lastCardElementRef}/>}
                                {result._index === INDICES.WORKPLACES &&
                                <CardWorkPlace {...result} ref={lastCardElementRef}/>}
                                {result._index === INDICES.PHONES &&
                                <CardPhone {...result} ref={lastCardElementRef}/>}
                            </Grid>
                        })
                    }
                </Grid>
            )
        }
        if (props.hits.total.value === 0 && inputEl.current && inputEl.current.value !== "") {
            return (
                <Grid xs={12} item>
                    <Typography variant='h2' sx={{
                        textTransform: 'uppercase',
                        marginBottom: 2
                    }} color="text.secondary" gutterBottom display="block">
                        {t("no_result")}
                    </Typography>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" display="block" gutterBottom>
                            {t("suggestion")}
                        </Typography>
                        <Typography variant="subtitle2" display="block">
                            {t("suggestion_good_type_words")}
                        </Typography>
                        <Typography variant="subtitle2" display="block">
                            {t("common:manage")}
                            <Button variant="text" size="small"
                                    component={Link}
                                    to='/dashboard/student'
                                    endIcon={<SchoolIcon fontSize="small"/>}
                            > {t("common:entities.directoryStudent")}
                            </Button>
                        </Typography>
                        <Typography variant="subtitle2" display="block">
                            {t("common:manage")}
                            <Button variant="text" size="small"
                                    component={Link}
                                    to='/dashboard/employee'
                                    endIcon={<EngineeringIcon fontSize="small"/>}
                            > {t("common:entities.directoryEmployee")}
                            </Button>
                        </Typography>
                        <Typography variant="subtitle2" display="block">
                            {t("common:manage")}
                            <Button variant="text" size="small"
                                    component={Link}
                                    to='/dashboard/phone'
                                    endIcon={<ContactPhoneIcon fontSize="small"/>}
                            > {t("common:entities.directoryPhone")}
                            </Button>
                        </Typography>

                        <Typography variant="subtitle2" display="block">
                            {t("common:manage")}
                            <Button variant="text" size="small"
                                    component={Link}
                                    to='/dashboard/workplace'
                                    endIcon={<BusinessIcon fontSize="small"/>}
                            > {t("common:entities.directoryWorkPlace")}
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
            )
        }
        return null
    }

    return (
        <Container>
            <Grid container spacing={3.5}>
                <Grid xs={12} item>
                    <Header onSubmit={handleSearchForm} inputSearchRef={inputEl}/>
                </Grid>
                <Grid xs={12} item>
                    <Tabs onChange={handleTabChange} indicatorColor='primary' textColor='primary' value={tabValue}
                          variant="scrollable">
                        <Tab label={t('tab.people')} icon={<PersonIcon/>}/>
                        <Tab label={t('tab.workplaces')} icon={<HomeWorkIcon/>}/>
                        {canShowPhone && <Tab label={t('tab.phones')} icon={<ContactPhoneIcon/>}/>}
                    </Tabs>
                </Grid>
                {state.loading && !state.hasMore ? (
                    [...new Array(2)].map((_, index) => <DisplaySkeleton key={index}/>)
                ) : (
                    <Grid xs={12} item sx={{mb: 2}}>
                        {tabValue === 0 && <DisplayCardList {...state.resultPerson}/>}
                        {tabValue === 1 && <DisplayCardList {...state.resultWorkPlace}/>}
                        {canShowPhone && tabValue === 2 && <DisplayCardList {...state.resultPhone}/>}
                    </Grid>
                )}
                {state.loading && state.hasMore && <Grid xs={12} item>
                    <Typography align="center" variant="subtitle1">{t("loading")}</Typography>
                </Grid>}
            </Grid>
        </Container>
    );
}
