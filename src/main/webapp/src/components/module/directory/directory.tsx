import React, { useState, Fragment, ChangeEvent, FormEvent, useContext } from 'react';
import Header from './header';
import { Tabs, Tab, Grid, Container, Typography } from '@material-ui/core';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PersonIcon from '@material-ui/icons/Person';
import CardPerson from './card-person';
import { IDirectoryProps } from '../../types';
import { getSearchPerson, getSearchPhone, getSearchWorkPlace } from './search-result.reducer';
import { AppContext } from '../../../config/context';
import { useTranslation } from 'react-i18next';

export default function Directory() {
  const { t } = useTranslation(['directory']);
  const [tabValue, setTabValue] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('Cesar');
  const {
    states: { searchResult },
    dispatch,
  } = useContext(AppContext);

  const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };
  const handleSearchValue = event => setSearchValue(event.target.value);

  const startSearching = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch (tabValue) {
      case 0:
        getSearchPerson(searchValue, dispatch);
        break;
      case 1:
        getSearchPhone(searchValue, dispatch);
        break;
      case 2:
        getSearchWorkPlace(searchValue, dispatch);
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

  return (
    <Fragment>
      <Header {...props} />
      <Container>
        <Grid container alignItems='flex-start' spacing={3}>
          <Grid xs={12} item>
            <Tabs onChange={handleTabChange} indicatorColor='primary' textColor='primary' value={tabValue}>
              <Tab label={t('directory:tab.people')} icon={<PersonIcon />} />
              <Tab label={t('directory:tab.phones')} icon={<ContactPhoneIcon />} />
              <Tab label={t('directory:tab.workplaces')} icon={<HomeWorkIcon />} />
            </Tabs>
          </Grid>
          {searchResult.resultPerson.total > 0 ? (
            <Grid xs={12} container spacing={3} item>
              <Grid item xs={12}>
                <Typography variant='subtitle2' display='inline' gutterBottom>
                  {t('directory:result_announce', {
                    count: searchResult.resultPerson.total,
                    second: searchResult.resultPerson.took / 1000,
                    quality: searchResult.resultPerson.max_score,
                  })}
                </Typography>
              </Grid>
              {searchResult.resultPerson.total > 0 ? (
                searchResult.resultPerson.hits.map((card, index) => (
                  <Grid key={index} item xs={12}>
                    <CardPerson {...card} />
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
        </Grid>
      </Container>
    </Fragment>
  );
}
