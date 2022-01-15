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
    Grid,
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
import DialogDelete from "../../../shared/components/dialog-delete";
import {makeStyles, Theme} from "@material-ui/core/styles";

const localStyles = makeStyles((theme: Theme) => ({
    cover: {
        maxWidth: 305,
        maxHeight: 305,
        [theme.breakpoints.down('md')]: {
            maxWidth: 260,
            maxHeight: 260,
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: 305,
            maxHeight: 305,
        },
    },
    item: {
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(2)
        }
    }
}));

const WorkplaceDetails = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const classes = detailsStyles();
    const localClasses = localStyles();
    let {id} = useParams<{ id: string }>();
    const {t} = useTranslation(['workplace']);
    const [modalOpen, setModalOpen] = React.useState(false);
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

    const getAvatarUrl = (): string => {
        if (_entity.avatarUrl) {
            return buildAvatarURL(_entity.avatarUrl)
        } else {
            return  "../../workplace.jpg"
        }
    }

    return (
        <Widget disableWidgetMenu>
            <Box className={classes.root}>
                <Box className={classes.wrapDivider}>
                    <Divider className={classes.order1}/>
                    <Chip variant='outlined' label={t('detail.title')} className={classes.order2}/>
                    <Divider className={classes.order3}/>
                </Box>
                <Grid container>
                    <Grid item xs={12} sm={5} md={5} lg={4} className={localClasses.item}>
                        <Card className={localClasses.cover}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    style={{padding:5, maxHeight: 300}}
                                    alt={_entity.name}
                                    image={getAvatarUrl()}
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item container xs={12} sm={6} md={7} lg={8} spacing={1}>
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
                <Grid item xs={12} style={{marginTop: 10}}><Typography variant="h6">{t("phones")}:</Typography></Grid>
                <Grid item xs={12}>
                    <List>
                        {_entity.phones?.map( (phone, index) => {
                            return (
                                <IconButton key={index}>
                                    <ListItem  alignItems="flex-start" component={Link} to={`/phone/show/${phone.id}`}>
                                        <LocalPhone/>
                                        <ListItemText primary={phone.number} />
                                    </ListItem>
                                </IconButton>
                            )
                         })
                        }
                    </List>
                </Grid>
                <Grid item xs={12}><Typography variant="h6">{t("members")}:</Typography></Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                    <Button
                        component={Link}
                        color="default"
                        variant="contained"
                        to={'/workplace'}
                        className={classes.button}>
                        {t('common:close')}
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
                        deleteItem={() => dispatch(deleteWorkPlace(id))}
                        content={t("delete.question", {param: _entity.name})}
                    />
                </Grid>
                </Grid>
            </Box>
        </Widget>
    );
};

export default WorkplaceDetails;