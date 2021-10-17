import React from 'react'
import {Link, RouteComponentProps} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {IRootState} from "../../../../shared/reducer";
import {getEmployee} from "./employee.reducer";
import {Box, Button, Chip, Divider, FormControl, FormLabel} from "@material-ui/core";
import {detailsStyles} from "../../style";
import PersonDetails from "../person-details";
import dayjs from "dayjs";
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

export interface IEmployeeDetailsProps extends RouteComponentProps<{ id: string}> {
}

function EmployeeDetails(props: IEmployeeDetailsProps) {
    const dispatch = useDispatch();
    const {t} = useTranslation(['employee']);
    const classes = detailsStyles();
    const _entity = useSelector((states: IRootState) => states.employee.entity);

    React.useEffect(() => {
        dispatch(getEmployee(props.match.params.id))
    }, [props.match.params.id]) // eslint-disable-line react-hooks/exhaustive-deps

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
            <Button
                color="default"
                variant="contained"
                component={Link}
                to={'/employee'}>
                {t('common:cancel')}
            </Button>
        </Box>
    );
}

export default EmployeeDetails