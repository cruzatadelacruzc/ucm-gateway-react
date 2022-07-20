import React from 'react'
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {IRootState} from "../../../../shared/reducer";
import {deleteEmployee, getEmployee} from "./employee.reducer";
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
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import {detailsStyles} from "../../style";
import PersonDetails from "../person-details";
import dayjs from "dayjs";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import {Business, LocalPhone} from "@mui/icons-material";
import Widget from "../../../../shared/layout/widget";
import DialogDelete from "../../../../shared/components/dialog-delete";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function EmployeeDetails() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = detailsStyles();
    let {id} = useParams<{ id: string }>();
    const {t} = useTranslation(['employee']);
    const [modalOpen, setModalOpen] = React.useState(false);
    const _entity = useSelector((states: IRootState) => states.employee.entity);
    const updating = useSelector((states: IRootState) => states.employee.updating);
    const isUpdateSuccess = useSelector((states: IRootState) => states.employee.updateSuccess);

    React.useEffect(() => {
        if (undefined !== id) {
            dispatch(getEmployee(id))
        } else {
            navigate(-1); // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
            navigate(-1) // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [isUpdateSuccess]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Widget disableWidgetMenu>
            <Box className={classes.root}>
                <Box className={classes.wrapDivider}>
                    <Divider className={classes.order1}/>
                    <Chip variant='outlined' label={t("person:step")} className={classes.order2}/>
                    <Divider className={classes.order3}/>
                </Box>

                <PersonDetails {..._entity} />

                <Box className={classes.wrapDivider}>
                    <Divider className={classes.order1}/>
                    <Chip variant='outlined' label={t("title.step")} className={classes.order2}/>
                    <Divider className={classes.order3}/>
                </Box>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={{xs: 2, md: 1}}>
                        <Grid container item xs={12} sm={4} spacing={2} sx={{mb: 1}}>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{`${t("startDate")} / ${t("endDate")}`}</FormLabel>
                                    {`${dayjs(_entity.startDate).format(t('common:date_format'))}
                                 / ${_entity.endDate ? dayjs(_entity.endDate).format(t('common:date_format')) : ""}`}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("registerNumber")}</FormLabel>
                                    {_entity.registerNumber}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel component="legend">{t("charge")}</FormLabel>
                                {_entity.chargeName}
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("bossWorkPlace")}</FormLabel>
                                    {_entity.bossWorkPlace ? t("positive") : "NO"}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={4}>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("profession")}</FormLabel>
                                    {_entity.professionName}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("serviceYears")}</FormLabel>
                                    {_entity.serviceYears}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel component="legend">{t("category")}</FormLabel>
                                {_entity.categoryName}
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("salary")}</FormLabel>
                                    ${_entity.salary}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={4}>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("isGraduatedBySector")}</FormLabel>
                                    {_entity.isGraduatedBySector ? t("positive") : "NO"}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("professionalNumber")}</FormLabel>
                                    {_entity.professionalNumber}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("scientificDegree")}</FormLabel>
                                    {_entity.scientificDegreeName}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("teachingCategory")}</FormLabel>
                                    {_entity.teachingCategoryName}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{mb: 1}}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">{t("workPlace")}</FormLabel>
                                {_entity.workPlaceId && <Button variant="text" color='primary' component={RouterLink}
                                                                sx={{textTransform: 'uppercase'}}
                                                                to={`/dashboard/workplace/show/${_entity.workPlaceId}`}
                                                                startIcon={<Business fontSize='large'/>}>
                                    <Typography variant="subtitle1">{_entity.workPlaceName}</Typography>
                                </Button>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{mb: 1}}>
                            <ContactPhoneIcon fontSize='large'/>
                            <List sx={{py: 1}}>
                                {_entity.phones?.map((phone, index) => (
                                    <IconButton key={index} size="large" sx={{p: 0, borderRadius: 0}}>
                                        <ListItem component={RouterLink} to={`/dashboard/phone/show/${phone.id}`} sx={{pl: 0}}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <LocalPhone/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={phone.number}/>
                                        </ListItem>
                                        </IconButton>
                                    )
                                )
                                }
                            </List>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                component={RouterLink}
                                startIcon={<CancelIcon/>}
                                color="secondary"
                                variant="contained"
                                to={'/dashboard/employee'}
                                className={classes.button}>
                                {t('common:close')}
                            </Button>
                            <Button
                                component={RouterLink}
                                color="secondary"
                                startIcon={<EditIcon/>}
                                variant="contained"
                                className={classes.button}
                                to={`/dashboard/employee/edit/${id}`}>
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
                        </Grid>
                    </Grid>
                </Box>
                <DialogDelete
                    open={modalOpen}
                    setOpen={setModalOpen}
                    title={t("delete.title")}
                    deleteItem={() => dispatch(deleteEmployee(id))}
                    content={t("delete.question", {param: _entity.name})}
                />
            </Box>
        </Widget>
    );
}

export default EmployeeDetails