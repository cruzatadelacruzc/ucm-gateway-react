import React from 'react';
import Widget from "../../../shared/layout/widget";
import {useDispatch, useSelector} from "react-redux";
import {detailsStyles} from "../style";
import {deletePhone, getPhone} from "./phone.reducer";
import {Link, useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {IRootState} from "../../../shared/reducer";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import {Avatar, Box, Button, Chip, CircularProgress, Divider, Typography, useTheme} from "@mui/material";
import DialogDelete from "../../../shared/components/dialog-delete";
import {buildAvatarURL} from "../../../shared/util/function-utils";

const PhoneDetails = () => {
    const theme = useTheme();
    let history = useHistory();
    const dispatch = useDispatch();
    const classes = detailsStyles();
    let {id} = useParams<{ id: string }>();
    const {t} = useTranslation(['phone']);
    const [modalOpen, setModalOpen] = React.useState(false);
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

    return (
        <Widget disableWidgetMenu>
            <Box className={classes.root}>
                <Box className={classes.wrapDivider}>
                    <Divider className={classes.order1}/>
                    <Chip variant='outlined' label={t('detail.title')} className={classes.order2}/>
                    <Divider className={classes.order3}/>
                </Box>
                <Box className={classes.data_row} style={{alignItems: 'stretch'}}>
                    <Typography variant="subtitle1" style={{marginRight: theme.spacing(1)}}>{t("active")} :</Typography>
                    <Typography variant="subtitle1" color='primary'>{_entity.active ? t("positive") : "NO"}</Typography>
                </Box>
                <Box className={classes.data_row} style={{alignItems: 'stretch'}}>
                    <Typography variant="subtitle1" style={{marginRight: theme.spacing(1)}}>{t("number")} :</Typography>
                    <Typography variant="subtitle1">{_entity.number}</Typography>
                </Box>
                <Box className={classes.data_row} style={{alignItems: 'stretch'}}>
                    <Typography variant="subtitle1" style={{marginRight: theme.spacing(1)}}>{t("description")}:</Typography>
                    <Typography variant="subtitle1">{_entity.description ? _entity.description : '-'}</Typography>
                </Box>
                {_entity.employee
                    ?
                    <Box className={classes.data_row} style={{alignItems: 'stretch'}}>
                        <Avatar
                            alt={`${_entity.employee?.name} ${_entity.employee?.firstLastName} ${_entity.employee?.secondLastName}`}
                            src={_entity.employee.avatarUrl ? buildAvatarURL(_entity.employee.avatarUrl): ""}
                        />
                        <Button variant="text" color='primary' component={Link}
                                to={`/employee/show/${_entity.employee.id}`}>
                            <Typography variant="subtitle1" style={{borderBottom: '2px dotted red'}}>
                                {`${_entity.employee?.name} ${_entity.employee?.firstLastName} ${_entity.employee?.secondLastName}`}
                            </Typography>
                        </Button>
                    </Box>
                    : ''
                }
                {_entity.workPlace
                    ?
                    <Box className={classes.data_row} style={{alignItems: 'stretch'}}>
                        {_entity.workPlace?.avatarUrl ?
                            <Avatar alt={_entity.workPlace?.name} src={buildAvatarURL(_entity.workPlace.avatarUrl)} />
                            :
                            <HomeWorkIcon fontSize='large' style={{marginRight: theme.spacing(1)}}/>
                        }
                        <Button variant="text" color='primary' component={Link}
                                to={`/workplace/show/${_entity.workPlace?.id}`}>
                            <Typography variant="subtitle1" style={{borderBottom: '2px dotted red'}}>
                                {_entity.workPlace?.name}
                            </Typography>
                        </Button>
                    </Box>
                    : ''
                }
                <Box className={classes.buttons}>
                    <Button
                        component={Link}
                        variant="contained"
                        to={'/phone'}
                        className={classes.button}>
                        {t('common:close')}
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
                        onClick={() => setModalOpen(true)}
                        disabled={updating}
                        endIcon={updating ? <CircularProgress size="1rem"/> : null}
                    >
                        {t('common:delete')}
                    </Button>
                    <DialogDelete
                        open={modalOpen}
                        setOpen={setModalOpen}
                        title={t("delete.title")}
                        deleteItem={() => dispatch(deletePhone(id))}
                        content={t("delete.question", {param: _entity.number})}/>
                </Box>
            </Box>
        </Widget>
    );
};

export default PhoneDetails;