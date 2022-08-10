import React from 'react';
import Widget from "../../../shared/layout/widget";
import {useDispatch, useSelector} from "react-redux";
import {deletePhone, getPhone} from "./phone.reducer";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {IRootState} from "../../../shared/reducer";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import {
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import DialogDelete from "../../../shared/components/dialog-delete";
import {buildAvatarURL} from "../../../shared/util/function-utils";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PhoneDetails = () => {
    const theme = useTheme();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let {id} = useParams<{ id: string }>();
    const {t} = useTranslation(['phone']);
    const [modalOpen, setModalOpen] = React.useState(false);
    const _entity = useSelector((states: IRootState) => states.phone.entity);
    const updating = useSelector((states: IRootState) => states.phone.updating);
    const isUpdateSuccess = useSelector((states: IRootState) => states.phone.updateSuccess);

    React.useEffect(() => {
        if (undefined !== id) {
            dispatch(getPhone(id))
        } else {
            navigate(-1); // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [id])// eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
            navigate(-1); // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [isUpdateSuccess]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Widget disableWidgetMenu>
            <Box sx={{
                width: '100%',
                ...theme.typography.body2,
                '& > :not(style) + :not(style)': {
                    marginTop: 2,
                    marginBottom: 2,
                }
            }}>
                <Box sx={{display: 'flex'}}>
                    <Divider sx={{order: 1, flex: '1 1 auto'}}/>
                    <Chip variant='outlined' label={t('detail.title')} sx={{order: 2, flex: '1 1 auto'}}/>
                    <Divider sx={{order: 3, flex: '1 1 auto'}}/>
                </Box>
                <Grid container spacing={{xs: 2, md: 1}}>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("active")}</FormLabel>
                            {_entity.active ? t("positive") : "NO"}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("number")}</FormLabel>
                            {_entity.number}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("description")}</FormLabel>
                            {_entity.description ? _entity.description : '-'}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">{t("owner")}</Typography>
                        {_entity.workPlace &&
                        <IconButton size="large" sx={{p: 0, borderRadius: 0}}>
                            <ListItem alignItems="flex-start" component={Link} sx={{pl: 0}}
                                      to={`/dashboard/workplace/show/${_entity.workPlace?.id}`}>
                                <ListItemAvatar>
                                    {_entity.workPlace?.avatarUrl
                                        ?
                                        <Avatar alt={_entity.workPlace?.name}
                                                src={buildAvatarURL(_entity.workPlace.avatarUrl)}
                                        />
                                        :
                                        <HomeWorkIcon fontSize='large' style={{marginRight: theme.spacing(1)}}/>
                                    }
                                </ListItemAvatar>
                                <ListItemText primary={_entity.workPlace.name}/>
                            </ListItem>
                        </IconButton>
                        }

                        {_entity.employee &&
                        <IconButton size="large" sx={{p: 0, borderRadius: 0}}>
                            <ListItem alignItems="flex-start" component={Link} sx={{pl: 0}}
                                      to={`/dashboard/employee/show/${_entity.employee?.id}`}>
                                <ListItemAvatar>
                                    <Avatar alt={_entity.employee?.name} sizes="medium"
                                            src={_entity.employee?.avatarUrl && buildAvatarURL(_entity.employee.avatarUrl)}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${_entity.employee.name} ${_entity.employee.firstLastName} ${_entity.employee.secondLastName}`}
                                    secondary={_entity.employee.chargeName}/>
                            </ListItem>
                        </IconButton>
                        }
                    </Grid>
                    <Grid item container xs={12} spacing={{xs: 2, sm: 0}}>
                        <Grid item xs={12} sm={2}>
                            <Button
                                fullWidth
                                component={Link}
                                color="secondary"
                                startIcon={<CancelIcon/>}
                                variant="contained"
                                to={'/dashboard/phone'}>
                                {t('common:close')}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                fullWidth
                                component={Link}
                                color="secondary"
                                startIcon={<EditIcon/>}
                                variant="contained"
                                to={`/dashboard/phone/edit/${id}`}>
                                {t('common:edit')}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => setModalOpen(true)}
                                disabled={updating}
                                startIcon={updating ? <CircularProgress size="1rem"/> : <DeleteIcon/>}
                            >
                                {t('common:delete')}
                            </Button>
                        </Grid>
                        <DialogDelete
                            open={modalOpen}
                            setOpen={setModalOpen}
                            title={t("delete.title")}
                            deleteItem={() => dispatch(deletePhone(id))}
                            content={t("delete.question", {param: _entity.number})}/>
                    </Grid>
                </Grid>
            </Box>
        </Widget>
    );
};

export default PhoneDetails;