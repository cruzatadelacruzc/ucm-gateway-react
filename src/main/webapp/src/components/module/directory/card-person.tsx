import Paper from '@material-ui/core/Paper';
import dayjs from 'dayjs';
import { TextField, Grid } from '@material-ui/core';
import { ISearchPersonDetails } from '../../shared/models/search-result-person.model';
import { StyledBadge, cardStyles } from './style';
import { useTranslation } from 'react-i18next';

export default function CardPerson(props: ISearchPersonDetails) {
  const { t } = useTranslation(['card']);
  const classes = cardStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.content}>
        <Grid container direction='row' justifyContent='space-evenly'>
          <Grid md={3} lg={3} item>
            {props._type ? (
              <StyledBadge badgeContent={t(`card:${props._type}`)} color='secondary'>
                <img alt='user' src='./user.svg' className={classes.cover} />
              </StyledBadge>
            ) : (
              <img alt='user' src='./user.svg' className={classes.cover} />
            )}
          </Grid>
          <Grid item md={3} lg={3} container justifyContent='center' direction='row'>
            <Grid item>
              <TextField disabled label={t('card:ID')} value={props._source.ci} />
            </Grid>
            <Grid item>
              <TextField disabled label={t('card:name', { count: props._source.name.split(' ').length })} value={props._source.name} />
            </Grid>
            <Grid item>
              <TextField
                disabled
                label={t('card:lastName', { count: props._source.secondLastName.length > 0 ? 2 : 1 })}
                value={`${props._source.firstLastName} ${props._source.secondLastName}`}
              />
            </Grid>
          </Grid>
          <Grid item md={3} lg={3} container justifyContent='center' direction='row'>
            <Grid item>
              <TextField disabled label={t('card:gender')} value={props._source.gender} />
            </Grid>
            <Grid item>
              <TextField disabled label={t('card:race')} value={props._source.race} />
            </Grid>
            <Grid item>
              <TextField disabled label={t('card:specialty')} value={props._source.specialty} />
            </Grid>
          </Grid>
          <Grid item md={3} lg={3} container justifyContent='center' direction='row'>
            <Grid item>
              <TextField disabled label={t('card:username')} value={props._source.email} />
            </Grid>
            <Grid item>
              <TextField disabled label={t('card:birthdate')} value={dayjs(props._source.birthdate).format(t('card:date_format'))} />
            </Grid>
            <Grid item>
              <TextField disabled label={t('card:district')} value={`${props._source.parentDistrict}, ${props._source.district}`} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
