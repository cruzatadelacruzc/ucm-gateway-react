import Paper from '@material-ui/core/Paper';
import {Grid, List, ListItem, ListItemText, TextField, Typography} from '@material-ui/core';
import {cardStyles} from './style';
import {useTranslation} from 'react-i18next';
import React from "react";
import {ISearchResultWorkPlaceDetails,} from "../../shared/models/search-result-workplace.model";
import ApartmentIcon from '@material-ui/icons/Apartment';

export default function CardWorkPlace(props: ISearchResultWorkPlaceDetails) {
  const { t } = useTranslation(['card']);
  const classes = cardStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.content}>
        <Grid container direction='row' justifyContent='space-evenly'>
          <Grid md={3} lg={3} item>
            <ApartmentIcon fontSize={"large"}  />
          </Grid>
          <Grid item md={3} lg={3} container justifyContent='center' direction='row'>
            <Grid item>
              <TextField disabled label={t('card:name', { count: props.name.split(' ').length })} value={props.name} />
            </Grid>
            <Grid item>
              <TextField disabled label={t('card:email')} value={props.email} />
            </Grid>
            <Grid item >
              <List>
                {props.phones?.map((phone, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={phone.number}/>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>

          <Grid item md={3} lg={3} container justifyContent='center' direction='row'>
            <Grid item>
              <Typography variant="body2" gutterBottom>
                {props.description}
              </Typography>
            </Grid>
          </Grid>

          <Grid item md={3} lg={3} container justifyContent='center' direction='row'>
            <Grid item>
              <List>
                {props.employees?.map((employee, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`${employee.name} ${employee.firstLastName} ${employee.secondLastName}`}/>
                    </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
