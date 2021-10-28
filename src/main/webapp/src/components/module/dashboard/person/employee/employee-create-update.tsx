import * as yup from 'yup';
import {Field} from "formik";
import React, {useEffect} from "react";
import DayjsUtils from "@date-io/dayjs";
import {useTranslation} from "react-i18next";
import i18n from "../../../../../config/i18n";
import {Box, MenuItem} from "@material-ui/core";
import Widget from "../../../../shared/layout/widget";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../../shared/reducer";
import {RouteComponentProps} from "react-router-dom";
import PersonalStep, {_validationSchema} from '../index'
import {formUpdateStyles, MenuProps} from "../../style";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {getWorkPlaces} from "../../workplace/workplace.reducer";
import {
    getCategories,
    getCharges,
    getProfessions,
    getScientificDegrees,
    getTeachingCategories
} from "../../nomenclature/nomenclature.reducer";
import {DatePicker} from "formik-material-ui-pickers";
import {CheckboxWithLabel, TextField} from 'formik-material-ui';
import {defaultValue, IEmployee} from "../../../../shared/models/employee.model";
import {createEmployee, getEmployee, updateEmployee} from "./employee.reducer";
import FormStepper, {FormStep} from "../../../../shared/components/FormStepper";

export interface IEmployeeManage extends RouteComponentProps<{ id: string }> {}

    function EmployeeManage(props: IEmployeeManage) {
    const dispatch = useDispatch();
    const classes = formUpdateStyles();
    const {t} = useTranslation(['employee']);
    const _entity = useSelector((states: IRootState) => states.employee.entity);
    const [_isNew] = React.useState(!props.match.params || !props.match.params.id);
    const charges = useSelector((states: IRootState) => states.nomenclature.charges);
    const workPlaces = useSelector((states: IRootState) => states.workPlace.entities);
    const categories = useSelector((states: IRootState) => states.nomenclature.categories);
    const professions = useSelector((states: IRootState) => states.nomenclature.professions);
    const isUpdateSuccess = useSelector((states: IRootState) => states.employee.updateSuccess);
    const teachingCategories = useSelector((states: IRootState) => states.nomenclature.teachingCategories);
    const scientificDegrees = useSelector((states: IRootState) => states.nomenclature.scientificDegrees);

    React.useEffect(() => {
        if (!_isNew){
            dispatch(getEmployee(props.match.params.id))
        }
    }, [dispatch, _isNew, props.match.params.id])

    React.useEffect(() => {
        if (isUpdateSuccess) {
            props.history.push('/employee');
        }
    }, [isUpdateSuccess, props.history])

    useEffect(() => {
        dispatch(getCharges())
        dispatch(getWorkPlaces())
        dispatch(getCategories())
        dispatch(getProfessions())
        dispatch(getTeachingCategories())
        dispatch(getScientificDegrees())
    }, [dispatch])

    return <Widget title={t('title.manage')} disableWidgetMenu>
        <FormStepper
            initialValues={_isNew ? defaultValue : _entity}
            enableReinitialize={!_isNew}
            onSubmit={(values: IEmployee) => {
                if (_isNew) {
                    dispatch(createEmployee(values));
                } else {
                    dispatch(updateEmployee(values));
                }
            }}
            cancelRoute='/employee'
        >
            <FormStep
                label={t("person:step")}
                validationSchema={_validationSchema}
            >
                <PersonalStep
                    isNew={_isNew}
                    districtId={_entity.districtId}
                    specialtyId={_entity.specialtyId}
                    gender={_entity.gender}
                />
            </FormStep>
            <FormStep
                label={t("title.step")}
                validationSchema={yup.object().shape({
                    graduateYears: yup.number().integer(i18n.t("error:form.number")).min(0, i18n.t("error:form.min", {min: 0})),
                    serviceYears: yup.number().integer(i18n.t("error:form.number")).min(0, i18n.t("error:form.min", {min: 0})),
                    startDate: yup.string().required(i18n.t("error:form.required")),
                    registerNumber: yup.string().required(i18n.t("error:form.required")),
                })}
            >
                <MuiPickersUtilsProvider utils={DayjsUtils}>
                    <Box className={classes.form_group}>
                        <Box className={classes.input}>
                            <Field
                                autoOk
                                fullWidth
                                name={"startDate"}
                                component={DatePicker}
                                inputVariant="outlined"
                                label={t('startDate')}
                                InputLabelProps={{shrink: true}}
                                format={t("common:date_format")}
                            />
                        </Box>
                        <Box className={classes.input}>
                            <Field
                                autoOk
                                fullWidth
                                name={"endDate"}
                                clearable={true}
                                component={DatePicker}
                                inputVariant="outlined"
                                label={t('endDate')}
                                InputLabelProps={{shrink: true}}
                                format={t("common:date_format")}
                            />
                        </Box>
                        <Box className={classes.input}>
                            <Field component={TextField} type="number" variant="outlined" fullWidth
                                   InputLabelProps={{shrink: true}}
                                   name="graduateYears" label={t('graduateYears')}/>
                        </Box>
                    </Box>
                    <Box className={classes.form_group}>
                        <Box className={classes.input}>
                            <Field
                                type="checkbox"
                                name="isGraduatedBySector"
                                component={CheckboxWithLabel}
                                Label={{label: t('isGraduatedBySector')}}
                            />
                        </Box>
                        <Box className={classes.input}>
                            <Field component={TextField} type="number" name="serviceYears" label={t('serviceYears')}
                                   variant="outlined" fullWidth InputLabelProps={{shrink: true}}/>
                        </Box>
                        <Box className={classes.input}>
                            <Field component={TextField} name="registerNumber" label={t('registerNumber')}
                                   variant="outlined" fullWidth InputLabelProps={{shrink: true}}/>
                        </Box>
                    </Box>
                    <Box className={classes.form_group}>
                        <Box className={classes.input}>
                            <Field
                                select
                                fullWidth
                                name="professionId"
                                variant="outlined"
                                component={TextField}
                                SelectProps={MenuProps}
                                label={t('profession')}
                                InputLabelProps={{shrink: true}}
                            >
                                <MenuItem value=""><em>-- {t('common:empty')} --</em></MenuItem>
                                {professions.map((option, index) => (
                                    <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                ))}
                            </Field>
                        </Box>
                        <Box className={classes.input}>
                            <Field component={TextField} name="professionalNumber" label={t('professionalNumber')}
                                   variant="outlined" fullWidth InputLabelProps={{shrink: true}}/>
                        </Box>
                    </Box>
                    <Box className={classes.form_group}>
                        <Box className={classes.input}>
                            <Field
                                select
                                fullWidth
                                name="categoryId"
                                variant="outlined"
                                component={TextField}
                                SelectProps={MenuProps}
                                label={t('category')}
                                InputLabelProps={{shrink: true}}
                            >
                                <MenuItem value=""><em>-- {t('common:empty')} --</em></MenuItem>
                                {categories.map((option, index) => (
                                    <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                ))}
                            </Field>
                        </Box>
                        <Box className={classes.input}>
                            <Field
                                select
                                fullWidth
                                variant="outlined"
                                component={TextField}
                                SelectProps={MenuProps}
                                name="teachingCategoryId"
                                InputLabelProps={{shrink: true}}
                                label={t('teachingCategory')}
                            >
                                <MenuItem value=""><em>-- {t('common:empty')} --</em></MenuItem>
                                {teachingCategories.map((option, index) => (
                                    <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                ))}
                            </Field>
                        </Box>
                        <Box className={classes.input}>
                            <Field
                                select
                                fullWidth
                                variant="outlined"
                                component={TextField}
                                SelectProps={MenuProps}
                                name="scientificDegreeId"
                                InputLabelProps={{shrink: true}}
                                label={t('scientificDegree')}
                            >
                                <MenuItem value=""><em>-- {t('common:empty')} --</em></MenuItem>
                                {scientificDegrees.map((option, index) => (
                                    <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                ))}
                            </Field>
                        </Box>
                    </Box>
                    <Box className={classes.form_group}>
                        <Box className={classes.input}>
                            <Field
                                select
                                fullWidth
                                name="chargeId"
                                variant="outlined"
                                component={TextField}
                                label={t('charge')}
                                SelectProps={MenuProps}
                                InputLabelProps={{shrink: true}}
                            >
                                <MenuItem value=""><em>-- {t('common:empty')} --</em></MenuItem>
                                {charges.map((option, index) => (
                                    <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                ))}
                            </Field>
                        </Box>
                        <Box className={classes.input}>
                            <Field
                                select
                                fullWidth
                                name="workPlaceId"
                                variant="outlined"
                                component={TextField}
                                SelectProps={MenuProps}
                                label={t('workPlace')}
                                InputLabelProps={{shrink: true}}
                            >
                                <MenuItem value=""><em>-- {t('common:empty')} --</em></MenuItem>
                                {workPlaces.map((option, index) => (
                                    <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                ))}
                            </Field>
                        </Box>
                        <Box className={classes.input}>
                            <Field
                                type="checkbox"
                                name="bossWorkPlace"
                                component={CheckboxWithLabel}
                                Label={{label: t('bossWorkPlace')}}
                            />
                        </Box>
                    </Box>
                </MuiPickersUtilsProvider>
            </FormStep>
        </FormStepper>
    </Widget>
}

export default EmployeeManage