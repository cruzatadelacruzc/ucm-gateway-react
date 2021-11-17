import React from 'react'
import {Link, useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {IRootState} from "../../../../shared/reducer";
import {deleteEmployee, getEmployee} from "./employee.reducer";
import {Box, Button, Chip, CircularProgress, Divider, FormControl, FormLabel} from "@material-ui/core";
import {detailsStyles} from "../../style";
import PersonDetails from "../person-details";
import dayjs from "dayjs";
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

function EmployeeDetails() {
    let history = useHistory();
    const dispatch = useDispatch();
    const classes = detailsStyles();
    let {id} = useParams<{ id: string }>();
    const {t} = useTranslation(['employee']);
    const _entity = useSelector((states: IRootState) => states.employee.entity);
    const updating = useSelector((states: IRootState) => states.employee.updating);
    const isUpdateSuccess = useSelector((states: IRootState) => states.employee.updateSuccess);

    React.useEffect(() => {
        dispatch(getEmployee(id))
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
            history.push('/employee');
        }
    }, [isUpdateSuccess, history])

    return (
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

            <Box className={classes.data_row}>
                <Box className={classes.data_column}>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{`${t("startDate")} / ${t("endDate")}`}</FormLabel>
                            {`${dayjs(_entity.startDate).format(t('common:date_format'))}
                             / ${_entity.endDate ? dayjs(_entity.endDate).format(t('common:date_format')) : ""}`}
                        </FormControl>
                    </Box>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("isGraduatedBySector")}</FormLabel>
                            {_entity.isGraduatedBySector ? t("positive") : "NO"}
                        </FormControl>
                    </Box>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("workPlace")}</FormLabel>
                            {_entity.workPlaceName}
                        </FormControl>
                    </Box>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("category")}</FormLabel>
                            {_entity.categoryName}
                        </FormControl>
                    </Box>
                </Box>
                <Box className={classes.data_column}>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("registerNumber")}</FormLabel>
                            {_entity.registerNumber}
                        </FormControl>
                    </Box>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("serviceYears")}</FormLabel>
                            {_entity.serviceYears}
                        </FormControl>
                    </Box>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("bossWorkPlace")}</FormLabel>
                            {_entity.bossWorkPlace ? t("positive") : "NO"}
                        </FormControl>
                    </Box>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("teachingCategory")}</FormLabel>
                            {_entity.teachingCategoryName}
                        </FormControl>
                    </Box>
                </Box>
                <Box className={classes.data_column}>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("profession")}</FormLabel>
                            {_entity.professionName}
                        </FormControl>
                    </Box>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("professionalNumber")}</FormLabel>
                            {_entity.professionalNumber}
                        </FormControl>
                    </Box>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("charge")}</FormLabel>
                            {_entity.chargeName}
                        </FormControl>
                    </Box>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("scientificDegree")}</FormLabel>
                            {_entity.scientificDegreeName}
                        </FormControl>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.data_row}>
                <Box className={classes.data_cell}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend"><ContactPhoneIcon/></FormLabel>
                        {_entity.phones?.join("-")}
                    </FormControl>
                </Box>
            </Box>
            <Box className={classes.buttons}>
                <Button
                    component={Link}
                    color="default"
                    variant="contained"
                    to={'/employee'}
                    className={classes.button}>
                    {t('common:cancel')}
                </Button>
                <Button
                    component={Link}
                    color="secondary"
                    variant="contained"
                    className={classes.button}
                    to={`/employee/edit/${id}`}>
                    {t('common:edit')}
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    onClick={() => dispatch(deleteEmployee(id))}
                    disabled={updating}
                    endIcon={updating ? <CircularProgress size="1rem"/> : null}
                >
                    {t('common:delete')}
                </Button>
            </Box>
        </Box>
    );
}

export default EmployeeDetails