import React from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {detailsStyles} from "../style";
import {IRootState} from "../../../shared/reducer";
import {Link, useHistory, useParams} from "react-router-dom";
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
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import Widget from "../../../shared/layout/widget";
import {LocalPhone} from "@material-ui/icons";
import {buildAvatarURL} from "../../../shared/util/function-utils";


const WorkplaceDetails = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const classes = detailsStyles();
    let {id} = useParams<{ id: string }>();
    const {t} = useTranslation(['workplace']);
    const _entity = useSelector((states: IRootState) => states.workPlace.entity);
    const updating = useSelector((states: IRootState) => states.workPlace.updating);
    const isUpdateSuccess = useSelector((states: IRootState) => states.workPlace.updateSuccess);

    React.useEffect(() => {
        dispatch(getWorkPlace(id))
    }, [id])// eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
            history.push('/workplace');
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
                <Box className={classes.data_row}>
                    <Box className={classes.data_column}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    style={{maxWidth: '100%' , padding: "10px"}}
                                    component="img"
                                    alt={_entity.name}
                                    image={_entity.avatarUrl || "../../workplace.jpg"}
                                />
                            </CardActionArea>
                        </Card>
                    </Box>
                    <Box className={classes.data_column}>
                        <Box className={classes.data_row}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">{t("active")}</FormLabel>
                                {_entity.active ? t("positive") : "NO"}
                            </FormControl>
                        </Box>
                        <Box className={classes.data_row}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">{t("name")}</FormLabel>
                                {_entity.name}
                            </FormControl>
                        </Box>
                        <Box className={classes.data_row}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">{t("email")}</FormLabel>
                                {_entity.email}
                            </FormControl>
                        </Box>
                        <Box className={classes.data_row}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">{t("description")}</FormLabel>
                                {_entity.description}
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.data_row}><Typography variant="h6">{t("phones")}:</Typography></Box>
                <Box className={classes.data_row}>
                    <List>
                        {_entity.phones?.map( (phone, index) => {
                            return (
                                <IconButton key={index}>
                                    <ListItem  alignItems="flex-start" component={Link} to={`/phone/show/${phone.id}`}>
                                        <ListItemAvatar>
                                            <LocalPhone/>
                                        </ListItemAvatar>
                                        <ListItemText primary={phone.number} />
                                    </ListItem>
                                </IconButton>
                            )
                         })
                        }
                    </List>
                </Box>
                <Box className={classes.data_row}><Typography variant="h6">{t("members")}:</Typography></Box>
                <Box className={classes.data_row}>
                    <List>
                        {_entity.employees?.map((employee,index) => {
                            return (
                                <IconButton key={index}>
                                    <ListItem  alignItems="flex-start" component={Link} to={`/employee/show/${employee.id}`}>
                                        <ListItemAvatar>
                                            <Avatar alt={employee.name} src={employee.avatarUrl ? buildAvatarURL(employee.avatarUrl): ''}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`${employee.name} ${employee.firstLastName} ${employee.secondLastName}`}
                                            secondary={employee.chargeName}
                                        />
                                    </ListItem>
                                </IconButton>
                            )
                        })}
                    </List>
                </Box>
                <Box className={classes.buttons}>
                    <Button
                        component={Link}
                        color="default"
                        variant="contained"
                        to={'/workplace'}
                        className={classes.button}>
                        {t('common:cancel')}
                    </Button>
                    <Button
                        component={Link}
                        color="secondary"
                        variant="contained"
                        className={classes.button}
                        to={`/workplace/edit/${id}`}>
                        {t('common:edit')}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        className={classes.button}
                        onClick={() => dispatch(deleteWorkPlace(id))}
                        disabled={updating}
                        endIcon={updating ? <CircularProgress size="1rem"/> : null}
                    >
                        {t('common:delete')}
                    </Button>
                </Box>
            </Box>
        </Widget>
    );
};

export default WorkplaceDetails;