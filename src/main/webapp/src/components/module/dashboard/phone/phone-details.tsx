import React from 'react';
import Widget from "../../../shared/layout/widget";
import {useDispatch, useSelector} from "react-redux";
import {detailsStyles} from "../style";
import {deletePhone, getPhone} from "./phone.reducer";
import {Link, useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import PersonIcon from '@material-ui/icons/Person';
import {IRootState} from "../../../shared/reducer";
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import {Box, Button, Chip, CircularProgress, Divider, Typography, useTheme} from "@material-ui/core";

const PhoneDetails = () => {
    const theme = useTheme();
    let history = useHistory();
    const dispatch = useDispatch();
    const classes = detailsStyles();
    let {id} = useParams<{ id: string }>();
    const {t} = useTranslation(['phone']);
    const _entity = useSelector((states: IRootState) => states.phone.entity);
    const updating = useSelector((states: IRootState) => states.phone.updating);
    const isUpdateSuccess = useSelector((states: IRootState) => states.phone.updateSuccess);

    React.useEffect(() => {
        dispatch(getPhone(id))
    }, [id])// eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
            history.push('/phone');
        }
    }, [isUpdateSuccess, history])

    return <Widget disableWidgetMenu>
        <Box className={classes.root}>
            <Box className={classes.wrapDivider}>
                <Divider className={classes.order1}/>
                <Chip variant='outlined' label={t('detail.title')} className={classes.order2}/>
                <Divider className={classes.order3}/>
            </Box>
            <Box className={classes.data_row} style={{alignItems: 'strech'}}>
                <Typography variant="subtitle1" style={{marginRight: theme.spacing(1)}}>{t("active")} :</Typography>
                <Typography variant="subtitle1" color='primary'>{_entity.active ? t("positive") : "NO"}</Typography>
            </Box>
            <Box className={classes.data_row} style={{alignItems: 'strech'}}>
                <Typography variant="subtitle1" style={{marginRight: theme.spacing(1)}}>{t("number")} :</Typography>
                <Typography variant="subtitle1">{_entity.number}</Typography>
            </Box>
            <Box className={classes.data_row} style={{alignItems: 'strech'}}>
                <Typography variant="subtitle1" style={{marginRight: theme.spacing(1)}}>{t("description")}:</Typography>
                <Typography variant="subtitle1">{_entity.description ? _entity.description : '-'}</Typography>
            </Box>
            {_entity.employeeId
                ?
                <Box className={classes.data_row} style={{alignItems: 'strech'}}>
                    <PersonIcon fontSize='large' style={{marginRight: theme.spacing(1)}}/>
                    <Button variant="text" color='primary' component={Link}
                            to={`/employee/show/${_entity.employeeId}`}>
                        <Typography variant="subtitle1" style={{borderBottom: '2px dotted red'}}>
                            {_entity.employeeName}
                        </Typography>
                    </Button>
                </Box>
                : ''
            }
            {_entity.workPlaceId
                ?
                <Box className={classes.data_row} style={{alignItems: 'strech'}}>
                    <HomeWorkIcon fontSize='large' style={{marginRight: theme.spacing(1)}}/>
                    <Button variant="text" color='primary' component={Link}
                            to={`/workplace/show/${_entity.workPlaceId}`}>
                        <Typography variant="subtitle1" style={{borderBottom: '2px dotted red'}}>
                            {_entity.workPlaceName}
                        </Typography>
                    </Button>
                </Box>
                : ''
            }
            <Box className={classes.buttons}>
                <Button
                    component={Link}
                    color="default"
                    variant="contained"
                    to={'/phone'}
                    className={classes.button}>
                    {t('common:cancel')}
                </Button>
                <Button
                    component={Link}
                    color="secondary"
                    variant="contained"
                    className={classes.button}
                    to={`/phone/edit/${id}`}>
                    {t('common:edit')}
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    onClick={() => dispatch(deletePhone(id))}
                    disabled={updating}
                    endIcon={updating ? <CircularProgress size="1rem"/> : null}
                >
                    {t('common:delete')}
                </Button>
            </Box>
        </Box>
    </Widget>
};

export default PhoneDetails;