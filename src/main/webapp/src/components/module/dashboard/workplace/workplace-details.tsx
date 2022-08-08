import React from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../shared/reducer";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteWorkPlace, getWorkPlace} from "./workplace.reducer";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
    CardMedia,
    Chip,
    CircularProgress,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import Widget from "../../../shared/layout/widget";
import {LocalPhone} from "@mui/icons-material";
import {buildAvatarURL} from "../../../shared/util/function-utils";
import DialogDelete from "../../../shared/components/dialog-delete";
import {CONFIG} from "../../../../config/constants";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useTheme from "@mui/material/styles/useTheme";

const WorkplaceDetails = () => {
    const theme = useTheme()
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let {id} = useParams<{ id: string }>();
    const {t} = useTranslation(['workplace']);
    const [modalOpen, setModalOpen] = React.useState(false);
    const _entity = useSelector((states: IRootState) => states.workPlace.entity);
    const updating = useSelector((states: IRootState) => states.workPlace.updating);
    const isUpdateSuccess = useSelector((states: IRootState) => states.workPlace.updateSuccess);

    const buttonSX = {
        marginRight: 3,
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            marginRight: 0,
            marginBottom: 1
        }
    }

    React.useEffect(() => {
        if (undefined !== id) {
            dispatch(getWorkPlace(id))
        } else {
            navigate(-1); // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [id])// eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
            navigate(-1); // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [isUpdateSuccess]) // eslint-disable-line react-hooks/exhaustive-deps

    const getAvatarUrl = (): string => {
        if (_entity.avatarUrl) {
            return buildAvatarURL(_entity.avatarUrl)
        } else {
            return `${CONFIG.DEFAULT_PATH}/workplace.svg`
        }
    }

    return (
        <Widget disableWidgetMenu>
            <Box  sx={{
                width: '100%',
                ...theme.typography.body2,
                '& > :not(style) + :not(style)': {
                    marginTop: 2,
                    marginBottom: 2,
                }
            }}>
                <Box sx={{display: 'flex'}}>
                    <Divider sx={{order: 1,flex: '1 1 auto'}}/>
                    <Chip variant='outlined' label={t('detail.title')} sx={{  order: 2, flex: '1 1 auto'}}/>
                    <Divider sx={{  order: 3, flex: '1 1 auto'}}/>
                </Box>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={{xs: 2, md: 1}}>
                        <Grid item xs={12} sm={4}>
                            <Card sx={{maxWidth: 305, maxHeight: 305}}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        style={{padding: 5, maxHeight: 300}}
                                        alt={_entity.name}
                                        image={getAvatarUrl()}
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item container xs={12} sm={8}>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("active")}</FormLabel>
                                    {_entity.active ? t("positive") : "NO"}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("name")}</FormLabel>
                                    {_entity.name}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("email")}</FormLabel>
                                    {_entity.email}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("description")}</FormLabel>
                                    {_entity.description}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{mt: 3}}>
                            <Typography variant="h3">{t("phones")}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{mb: 1}}>
                            <List sx={{py: 1}}>
                                {_entity.phones?.map((phone, index) => {
                                    return (
                                        <IconButton key={index} size="large" sx={{p: 0, borderRadius: 0}}>
                                            <ListItem component={Link} to={`/phone/show/${phone.id}`} sx={{pl: 0}}>
                                                <ListItemAvatar><Avatar><LocalPhone/></Avatar></ListItemAvatar>
                                                <ListItemText primary={phone.number}/>
                                            </ListItem>
                                        </IconButton>
                                    );
                                })
                                }
                            </List>
                        </Grid>
                        <Grid item xs={12}><Typography variant="h3">{t("members")}</Typography></Grid>
                        <Grid item xs={12} sx={{mb: 1}}>
                            <List sx={{py: 1}}>
                                {_entity.employees?.map((employee, index) => {
                                    return (
                                        <IconButton key={index} size="large" sx={{p: 0, borderRadius: 0, mr: 1}}>
                                            <ListItem alignItems="flex-start" component={Link}
                                                      to={`/dashboard/employee/show/${employee.id}`} sx={{pl: 0}}>
                                                <ListItemAvatar>
                                                    <Avatar alt={employee.name}
                                                            src={employee.avatarUrl ? buildAvatarURL(employee.avatarUrl) : ''}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={`${employee.name} ${employee.firstLastName} ${employee.secondLastName}`}
                                                    secondary={employee.chargeName}
                                                />
                                            </ListItem>
                                        </IconButton>
                                    );
                                })}
                            </List>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                sx={{
                                    marginRight: 3,
                                    [theme.breakpoints.down('sm')]: {
                                        width: "100%",
                                        marginRight: 0,
                                        marginBottom: 1
                                    }
                                }}
                                component={Link}
                                color="secondary"
                                startIcon={<CancelIcon/>}
                                variant="contained"
                                to={'/dashboard/workplace'}>
                                {t('common:close')}
                            </Button>
                            <Button
                                component={Link}
                                color="secondary"
                                variant="contained"
                                startIcon={<EditIcon/>}
                                sx={buttonSX}
                                to={`/dashboard/workplace/edit/${id}`}>
                                {t('common:edit')}
                            </Button>
                            <Button
                                variant="contained"
                                sx={buttonSX}
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
                                deleteItem={() => dispatch(deleteWorkPlace(id))}
                                content={t("delete.question", {param: _entity.name})}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Widget>
    );
};

export default WorkplaceDetails;