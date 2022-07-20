import React from 'react';
import Widget from "../../../shared/layout/widget";
import {useDispatch, useSelector} from "react-redux";
import {detailsStyles} from "../style";
import {deletePhone, getPhone} from "./phone.reducer";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {IRootState} from "../../../shared/reducer";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import {Avatar, Box, Button, Chip, CircularProgress, Divider, Stack, styled, Typography, useTheme} from "@mui/material";
import DialogDelete from "../../../shared/components/dialog-delete";
import {buildAvatarURL} from "../../../shared/util/function-utils";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Item = styled("div")(({theme}) => ({
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        flexDirection: "column",
    },
    padding: theme.spacing(1),
    textAlign: 'center',
    display: "flex"
}));

const Root = styled("div")(({theme}) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

const PhoneDetails = () => {
    const theme = useTheme();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = detailsStyles();
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
            <Root>
                <Box sx={{display: 'flex'}}>
                    <Divider sx={{order: 1, flex: '1 1 auto'}}/>
                    <Chip variant='outlined' label={t('detail.title')} sx={{order: 2, flex: '1 1 auto'}}/>
                    <Divider sx={{order: 3, flex: '1 1 auto'}}/>
                </Box>
                <Stack direction="column" justifyContent="space-evenly" alignItems="flex-start">
                    <Item>
                        <Typography variant="subtitle1"
                                    style={{marginRight: theme.spacing(1)}}>{t("active")} :</Typography>
                        <Typography variant="subtitle1"
                                    color='primary'>{_entity.active ? t("positive") : "NO"}</Typography>
                    </Item>
                    <Item>
                        <Typography variant="subtitle1"
                                    style={{marginRight: theme.spacing(1)}}>{t("number")} :</Typography>
                        <Typography variant="subtitle1">{_entity.number}</Typography>
                    </Item>
                    <Item>
                        <Typography variant="subtitle1"
                                    style={{marginRight: theme.spacing(1)}}>{t("description")}:</Typography>
                        <Typography variant="subtitle1">{_entity.description ? _entity.description : '-'}</Typography>
                    </Item>
                    {_entity.employee
                        ?
                        <Item>
                            <Avatar
                                alt={`${_entity.employee?.name} ${_entity.employee?.firstLastName} ${_entity.employee?.secondLastName}`}
                                src={_entity.employee.avatarUrl ? buildAvatarURL(_entity.employee.avatarUrl) : ""}
                            />
                            <Button variant="text" color='primary' component={Link}
                                    to={`/dashboard/employee/show/${_entity.employee.id}`}>
                                <Typography variant="subtitle1" style={{borderBottom: '2px dotted red'}}>
                                    {`${_entity.employee?.name} ${_entity.employee?.firstLastName} ${_entity.employee?.secondLastName}`}
                                </Typography>
                            </Button>
                        </Item>
                        : ''
                    }
                    {_entity.workPlace
                        ?
                        <Item>
                            {_entity.workPlace?.avatarUrl ?
                                <Avatar alt={_entity.workPlace?.name}
                                        src={buildAvatarURL(_entity.workPlace.avatarUrl)}/>
                                :
                                <HomeWorkIcon fontSize='large' style={{marginRight: theme.spacing(1)}}/>
                            }
                            <Button variant="text" color='primary' component={Link} sx={{textTransform: 'uppercase'}}
                                    to={`/dashboard/workplace/show/${_entity.workPlace?.id}`}>
                                <Typography variant="subtitle1" style={{borderBottom: '2px dotted red'}}>
                                    {_entity.workPlace?.name}
                                </Typography>
                            </Button>
                        </Item>
                        : ''
                    }
                    <Box className={classes.buttons}>
                        <Button
                            component={Link}
                            color="secondary"
                            startIcon={<CancelIcon/>}
                            variant="contained"
                            to={'/dashboard/phone'}
                            className={classes.button}>
                            {t('common:close')}
                        </Button>
                        <Button
                            component={Link}
                            color="secondary"
                            startIcon={<EditIcon/>}
                            variant="contained"
                            className={classes.button}
                            to={`/dashboard/phone/edit/${id}`}>
                            {t('common:edit')}
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => setModalOpen(true)}
                            disabled={updating}
                            startIcon={updating ? <CircularProgress size="1rem"/> : <DeleteIcon/>}
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
                </Stack>
            </Root>
        </Widget>
    );
};

export default PhoneDetails;