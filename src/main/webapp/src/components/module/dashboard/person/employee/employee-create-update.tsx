import * as yup from 'yup';
import {Field} from "formik";
import React, {useEffect} from "react";
import DayjsUtils from "@date-io/dayjs";
import {useTranslation} from "react-i18next";
import i18n from "../../../../../config/i18n";
import {Box, MenuItem} from "@material-ui/core";
import Widget from "../../../../shared/layout/widget";
import {batch, useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../../shared/reducer";
import {useHistory, useParams} from "react-router-dom";
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
import {createEmployee, getEmployee, reset, updateEmployee} from "./employee.reducer";
import FormStepper, {FormStep} from "../../../../shared/components/FormStepper";

function EmployeeManage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = formUpdateStyles();
    const {id} = useParams<{ id: string }>();
    const [_isNew] = React.useState(!id);
    const {t} = useTranslation(['employee']);
    const [avatar, setAvatar] = React.useState<File>();
    const _entity = useSelector((states: IRootState) => states.employee.entity);
    const charges = useSelector((states: IRootState) => states.nomenclature.charges);
    const workPlaces = useSelector((states: IRootState) => states.workPlace.entities);
    const categories = useSelector((states: IRootState) => states.nomenclature.categories);
    const professions = useSelector((states: IRootState) => states.nomenclature.professions);
    const isUpdateSuccess = useSelector((states: IRootState) => states.employee.updateSuccess);
    const teachingCategories = useSelector((states: IRootState) => states.nomenclature.teachingCategories);
    const scientificDegrees = useSelector((states: IRootState) => states.nomenclature.scientificDegrees);

    React.useEffect(() => {
        if (_isNew) {
            dispatch(reset())
        } else {
            dispatch(getEmployee(id))
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
           history.push('/employee');
        }
    }, [isUpdateSuccess]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        batch(() => {
            dispatch(getCharges())
            dispatch(getWorkPlaces())
            dispatch(getCategories())
            dispatch(getProfessions())
            dispatch(getTeachingCategories())
            dispatch(getScientificDegrees())
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return <Widget title={t('title.manage')} disableWidgetMenu>
        <FormStepper
            initialValues={_isNew ? defaultValue : _entity}
            enableReinitialize={!_isNew}
            onSubmit={async (values: IEmployee) => {
                if (_isNew) {
                    return dispatch(createEmployee({employee: values, avatar: avatar}));
                } else {
                    return dispatch(updateEmployee({employee: values, avatar: avatar}));
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
                    person={_entity}
                    setFileInput={setAvatar}
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