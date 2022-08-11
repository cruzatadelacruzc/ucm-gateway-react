import * as yup from 'yup';
import {Field} from "formik";
import React from "react";
import {useTranslation} from "react-i18next";
import i18n from "../../../../../config/i18n";
import {InputAdornment} from "@mui/material";
import Widget from "../../../../shared/layout/widget";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../../shared/reducer";
import {useNavigate, useParams} from "react-router-dom";
import PersonalStep, {_validationSchema} from '../index'
import {
    getCategories,
    getCharges,
    getFilteredCategories,
    getFilteredCharges,
    getFilteredProfessions,
    getFilteredScientificDegrees,
    getFilteredTeachingCategories,
    getProfessions,
    getScientificDegrees,
    getTeachingCategories,
    reset as nomenclatureReset
} from "../../nomenclature/nomenclature.reducer";
import {DatePicker} from "formik-mui-lab";
import AdapterDayjs from '@mui/lab/AdapterDayjs'
import {CheckboxWithLabel, TextField} from 'formik-mui';
import {defaultValue, IEmployee} from "../../../../shared/models/employee.model";
import FormStepper, {FormStep} from "../../../../shared/components/form-stepper";
import {createEmployee, getEmployee, partialUpdateEmployee, reset, updateEmployee} from "./employee.reducer";
import {LocalizationProvider} from "@mui/lab";
import throttle from "lodash/throttle";
import {INomenclature} from "../../../../shared/models/nomenclature.model";
import UCMAutocomplete from "../../../../shared/components/autocomplete";
import {getFilteredWorkPlace, getWorkPlaces, reset as workPlaceReset} from "../../workplace/workplace.reducer";
import Grid from "@mui/material/Grid";

function EmployeeManage() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
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

    const [openCharge, setOpenCharge] = React.useState(false);
    const [inputValueCharge, setInputValueCharge] = React.useState('');
    const loadingCharges = useSelector((states: IRootState) => states.nomenclature.loadingCharges);

    const [openCategory, setOpenCategory] = React.useState(false);
    const [inputValueCategory, setInputValueCategory] = React.useState('');
    const loadingCategories = useSelector((states: IRootState) => states.nomenclature.loadingCategories);

    const [openWorkPlace, setOpenWorkPlace] = React.useState(false);
    const [inputValueWorkPlace, setInputValueWorkPlace] = React.useState('');
    const loadingWorkPlaces = useSelector((states: IRootState) => states.workPlace.loading);

    const [openTeachingCategory, setOpenTeachingCategory] = React.useState(false);
    const [inputValueTeachingCategory, setInputValueTeachingCategory] = React.useState('');
    const loadingTeachingCategory = useSelector((states: IRootState) => states.nomenclature.loadingTeachingCategories);

    const [openProfession, setOpenProfession] = React.useState(false);
    const [inputValueProfession, setInputValueProfession] = React.useState('');
    const loadingProfessions = useSelector((states: IRootState) => states.nomenclature.loadingProfessions);

    const [openScientificDegree, setOpenScientificDegree] = React.useState(false);
    const [inputValueScientificDegree, setInputValueScientificDegree] = React.useState('');
    const loadingScientificDegrees = useSelector((states: IRootState) => states.nomenclature.loadingScientificDegrees);

    React.useEffect(() => {
        dispatch(reset())
        dispatch(workPlaceReset())
        dispatch(nomenclatureReset())
        if (undefined !== id) {
            dispatch(getEmployee(id))
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    React.useEffect(() => {
        if (isUpdateSuccess) {
            dispatch(reset())
            navigate(-1); // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [isUpdateSuccess]) // eslint-disable-line react-hooks/exhaustive-deps

    const fetch = React.useMemo(
        () => throttle((input: string, callback: (input: string) => void) => {
                if (input !== '') {
                    callback(input);
                }
            },
            300,
        ),
        []); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (inputValueCharge === '' && openCharge) {
            dispatch(getCharges('name,ASC'))
        }
        if (inputValueCategory === '' && openCategory) {
            dispatch(getCategories('name,ASC'))
        }
        if (inputValueWorkPlace === '' && openWorkPlace) {
            dispatch(getWorkPlaces('name,ASC'))
        }
        if (inputValueTeachingCategory === '' && openTeachingCategory) {
            dispatch(getTeachingCategories('name,ASC'))
        }
        if (inputValueProfession === '' && openProfession) {
            dispatch(getProfessions('name,ASC'))
        }

        if (inputValueScientificDegree === '' && openScientificDegree) {
            dispatch(getScientificDegrees('name,ASC'))
        }
        if (inputValueCharge !== '' && openCharge) {
            fetch(inputValueCharge, (inputValue) => {
                dispatch(getFilteredCharges(`name.contains=${inputValue}`, 'name,ASC', 'OR'))
            })
        }
        if (inputValueCategory !== '' && openCategory) {
            fetch(inputValueCategory, (inputValue) => {
                dispatch(getFilteredCategories(`name.contains=${inputValue}`, 'name,ASC', 'OR'))
            })
        }
        if (inputValueProfession !== '' && openProfession) {
            fetch(inputValueProfession, (inputValue) => {
                dispatch(getFilteredProfessions(`name.contains=${inputValue}`, 'name,ASC', 'OR'))
            })
        }
        if (inputValueWorkPlace !== '' && openWorkPlace) {
            fetch(inputValueWorkPlace, (inputValue) => {
                dispatch(getFilteredWorkPlace(`name.contains=${inputValue}`, 'name,ASC', 'OR'))
            })
        }
        if (inputValueTeachingCategory !== '' && openTeachingCategory) {
            fetch(inputValueTeachingCategory, (inputValue) => {
                dispatch(getFilteredTeachingCategories(`name.contains=${inputValue}`, 'name,ASC', 'OR'))
            })
        }
        if (inputValueScientificDegree !== '' && openScientificDegree) {
            fetch(inputValueScientificDegree, (inputValue) => {
                dispatch(getFilteredScientificDegrees(`name.contains=${inputValue}`, 'name,ASC', 'OR'))
            })
        }
    }, [
        fetch,
        dispatch,
        openCharge,
        inputValueCharge,
        openCategory,
        inputValueCategory,
        openTeachingCategory,
        inputValueTeachingCategory,
        openWorkPlace,
        inputValueWorkPlace,
        openProfession,
        inputValueProfession,
        openScientificDegree,
        inputValueScientificDegree
    ])

    return <Widget title={t('title.manage')} disableWidgetMenu>
        <FormStepper
            initialValues={_isNew ? defaultValue : _entity}
            enableReinitialize={!_isNew}
            onSubmit={async (values: IEmployee) => {
                const transformValues: IEmployee = {
                    ...values,
                    districtId: values.district?.id,
                    specialtyId: values.specialty?.id,
                    workPlaceId: values.workPlace?.id,
                    categoryId: values.category?.id,
                    scientificDegreeId: values.scientificDegree?.id,
                    teachingCategoryId: values.teachingCategory?.id,
                    chargeId: values.charge?.id,
                    professionId: values.profession?.id
                }
                if (_isNew) {
                    return dispatch(createEmployee({employee: transformValues, avatar: avatar}));
                } else {
                    return dispatch(updateEmployee({employee: transformValues, avatar: avatar}));
                }
            }}
            cancelRoute='/employee'
        >
            <FormStep
                label={t("person:step")}
                validationSchema={_validationSchema}
                operationKind={_isNew ? "CREATE" : "UPDATE"}
                onSubmit={async (values: IEmployee) => {
                    if (undefined !== id) {
                        return dispatch(partialUpdateEmployee({id, employee: values, avatar: avatar}))
                    }
                }}
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
                    salary: yup.number().integer(i18n.t("error:form.number")).min(0, i18n.t("error:form.min", {min: 0})),
                    startDate: yup.string().required(i18n.t("error:form.required")),
                    registerNumber: yup.string().required(i18n.t("error:form.required")),
                })}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid container spacing={2}>
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={4}>
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
                            </Grid>
                            <Grid item xs={12} sm={4}>
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
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Field component={TextField} type="number" variant="outlined" fullWidth
                                       InputLabelProps={{shrink: true}}
                                       name="graduateYears" label={t('graduateYears')}/>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Field
                                    type="checkbox"
                                    name="isGraduatedBySector"
                                    component={CheckboxWithLabel}
                                    Label={{label: t('isGraduatedBySector')}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Field component={TextField} type="number" name="serviceYears" label={t('serviceYears')}
                                       variant="outlined" fullWidth InputLabelProps={{shrink: true}}/>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Field component={TextField} name="registerNumber" label={t('registerNumber')}
                                       variant="outlined" fullWidth InputLabelProps={{shrink: true}}/>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Field component={TextField} type="number" name="salary" label={t('salary')}
                                       variant="outlined" fullWidth InputLabelProps={{shrink: true}}
                                       InputProps={{
                                           startAdornment: (<InputAdornment position="start">$</InputAdornment>)
                                       }}/>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Field name='profession'
                                       open={openProfession}
                                       options={professions}
                                       component={UCMAutocomplete}
                                       loading={loadingProfessions}
                                       onOpen={() => setOpenProfession(true)}
                                       onClose={() => setOpenProfession(false)}
                                       getOptionLabel={(option: INomenclature) => option.name || ''}
                                       textFieldProps={{label: t('profession')}}
                                       onInputChange={(event: React.SyntheticEvent, newInputValue) => {
                                           setInputValueProfession(newInputValue);
                                       }}
                                       isOptionEqualToValue={(option: INomenclature, value: INomenclature) => option.id === value.id}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Field component={TextField} name="professionalNumber" label={t('professionalNumber')}
                                       variant="outlined" fullWidth InputLabelProps={{shrink: true}}/>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Field name='category'
                                       open={openCategory}
                                       options={categories}
                                       component={UCMAutocomplete}
                                       loading={loadingCategories}
                                       onOpen={() => setOpenCategory(true)}
                                       onClose={() => setOpenCategory(false)}
                                       getOptionLabel={(option: INomenclature) => option.name || ''}
                                       textFieldProps={{label: t('category')}}
                                       onInputChange={(event: React.SyntheticEvent, newInputValue) => {
                                           setInputValueCategory(newInputValue);
                                       }}
                                       isOptionEqualToValue={(option: INomenclature, value: INomenclature) => option.id === value.id}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Field name='teachingCategory'
                                       open={openTeachingCategory}
                                       options={teachingCategories}
                                       component={UCMAutocomplete}
                                       loading={loadingTeachingCategory}
                                       onOpen={() => setOpenTeachingCategory(true)}
                                       onClose={() => setOpenTeachingCategory(false)}
                                       getOptionLabel={(option: INomenclature) => option.name || ''}
                                       textFieldProps={{label: t('teachingCategory')}}
                                       onInputChange={(event: React.SyntheticEvent, newInputValue) => {
                                           setInputValueTeachingCategory(newInputValue);
                                       }}
                                       isOptionEqualToValue={(option: INomenclature, value: INomenclature) => option.id === value.id}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Field name='scientificDegree'
                                       open={openScientificDegree}
                                       options={scientificDegrees}
                                       component={UCMAutocomplete}
                                       loading={loadingScientificDegrees}
                                       onOpen={() => setOpenScientificDegree(true)}
                                       onClose={() => setOpenScientificDegree(false)}
                                       getOptionLabel={(option: INomenclature) => option.name || ''}
                                       textFieldProps={{label: t('scientificDegree')}}
                                       onInputChange={(event: React.SyntheticEvent, newInputValue) => {
                                           setInputValueScientificDegree(newInputValue);
                                       }}
                                       isOptionEqualToValue={(option: INomenclature, value: INomenclature) => option.id === value.id}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Field name='charge'
                                       open={openCharge}
                                       options={charges}
                                       component={UCMAutocomplete}
                                       loading={loadingCharges}
                                       onOpen={() => setOpenCharge(true)}
                                       onClose={() => setOpenCharge(false)}
                                       getOptionLabel={(option: INomenclature) => option.name || ''}
                                       textFieldProps={{label: t('charge')}}
                                       onInputChange={(event: React.SyntheticEvent, newInputValue) => {
                                           setInputValueCharge(newInputValue);
                                       }}
                                       isOptionEqualToValue={(option: INomenclature, value: INomenclature) => option.id === value.id}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Field name='workPlace'
                                       open={openWorkPlace}
                                       options={workPlaces}
                                       component={UCMAutocomplete}
                                       loading={loadingWorkPlaces}
                                       onOpen={() => setOpenWorkPlace(true)}
                                       onClose={() => setOpenWorkPlace(false)}
                                       getOptionLabel={(option: INomenclature) => option.name || ''}
                                       textFieldProps={{label: t('workPlace')}}
                                       onInputChange={(event: React.SyntheticEvent, newInputValue) => {
                                           setInputValueWorkPlace(newInputValue);
                                       }}
                                       isOptionEqualToValue={(option: INomenclature, value: INomenclature) => option.id === value.id}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Field
                                    type="checkbox"
                                    name="bossWorkPlace"
                                    component={CheckboxWithLabel}
                                    Label={{label: t('bossWorkPlace')}}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </LocalizationProvider>
            </FormStep>
        </FormStepper>
    </Widget>
}

export default EmployeeManage