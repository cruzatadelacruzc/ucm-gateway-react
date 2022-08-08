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
import PersonDetails from "../person-details";
import dayjs from "dayjs";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import {Business, LocalPhone} from "@mui/icons-material";
import Widget from "../../../../shared/layout/widget";
import DialogDelete from "../../../../shared/components/dialog-delete";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useTheme from "@mui/material/styles/useTheme";
import styled from "@mui/material/styles/styled";

const ChipStyled = styled(Chip)(() => ({
    order: 2,
    flex: '1 1 auto'
}))

const Divider1Styled = styled(Divider)(() => ({
    order: 1,
    flex: '1 1 auto'
}))

const Divider2Styled = styled(Divider)(() => ({
    order: 3,
    flex: '1 1 auto'
}))

function EmployeeDetails() {
    const theme = useTheme();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let {id} = useParams<{ id: string }>();
    const {t} = useTranslation(['employee']);
    const [modalOpen, setModalOpen] = React.useState(false);
    const _entity = useSelector((states: IRootState) => states.employee.entity);
    const updating = useSelector((states: IRootState) => states.employee.updating);
    const isUpdateSuccess = useSelector((states: IRootState) => states.employee.updateSuccess);

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
            <Box
                sx={{
                    width: '100%',
                    ...theme.typography.body2,
                    '& > :not(style) + :not(style)': {
                            marginTop: 2,
                            marginBottom: 2,
                        }
                }}
            >
                <Box sx={{display: 'flex'}}>
                    <Divider1Styled/><ChipStyled variant='outlined' label={t("person:step")}/><Divider2Styled/>
                </Box>

                <PersonDetails {..._entity} />

                <Box sx={{display: 'flex'}}>
                    <Divider1Styled/><ChipStyled variant='outlined' label={t("title.step")}/><Divider2Styled/>
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
                                sx={buttonSX}>
                                {t('common:close')}
                            </Button>
                            <Button
                                component={RouterLink}
                                color="secondary"
                                startIcon={<EditIcon/>}
                                variant="contained"
                                sx={buttonSX}
                                to={`/dashboard/employee/edit/${id}`}>
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