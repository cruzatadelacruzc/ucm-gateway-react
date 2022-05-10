import React from 'react';
import Widget from "../../../shared/layout/widget";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {formUpdateStyles} from "../style";
import {useTranslation} from "react-i18next";
import {Field, Form, Formik} from "formik";
import {defaultValue, IPhone} from "../../../shared/models/phone.model";
import {IRootState} from "../../../shared/reducer";
import {createPhone, getPhone, reset, updatePhone} from "./phone.reducer";
import * as yup from "yup";
import {
    Autocomplete as MUIAutocomplete,
    AutocompleteRenderInputParams,
    Box,
    Button,
    CircularProgress,
    TextField as MUITextField
} from "@mui/material";
import {CheckboxWithLabel, TextField} from "formik-mui";
import {geEmployees, getFilteredEmployees} from "../person/employee/employee.reducer";
import {IEmployee} from "../../../shared/models/employee.model";
import throttle from 'lodash/throttle'
import {IWorkPlace} from "../../../shared/models/workplace.model";
import {getFilteredWorkPlace, getWorkPlaces} from "../workplace/workplace.reducer";

const PhoneManage = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = formUpdateStyles();
    let {id} = useParams<{ id: string }>();
    const [isNew] = React.useState(!id);
    const {t} = useTranslation(['phone']);
    const entity = useSelector((states: IRootState) => states.phone.entity);
    const updating = useSelector((states: IRootState) => states.phone.updating);
    const employees = useSelector((states: IRootState) => states.employee.entities);
    const workPlaces = useSelector((states: IRootState) => states.workPlace.entities);
    const isUpdateSuccess = useSelector((states: IRootState) => states.phone.updateSuccess);

    const [openEmployee, setOpenEmployee] = React.useState(false);
    const [inputValueEmployee, setInputValueEmployee] = React.useState('');
    const loadingEmployees = useSelector((states: IRootState) => states.employee.loading);
    const [valueEmployee, setValueEmployee] = React.useState<IEmployee | null>(entity.employee || null);

    const [openWorkPlace, setOpenWorkPlace] = React.useState(false);
    const [inputValueWorkPlace, setInputValueWorkPlace] = React.useState('');
    const loadingWorkPlaces = useSelector((states: IRootState) => states.workPlace.loading);
    const [valueWorkPlace, setValueWorkPlace] = React.useState<IWorkPlace | null>(entity.workPlace || null);

    const handleSelect = React.useCallback((handleChange, setFieldValue, name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== "") {
            if (name === "employeeId") {
                setFieldValue("employeeId", event.target.value);
                setFieldValue("workPlaceId", "");
            } else {
                setFieldValue("workPlaceId", event.target.value);
                setFieldValue("employeeId", "");
            }
        }
        handleChange(event);
    }, [])

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
        if (openEmployee) {
            if (inputValueEmployee === '') {
                dispatch(geEmployees('name,ASC'))
            }
            if (inputValueEmployee !== '') {
                fetch(inputValueEmployee, (inputValueEmployee) => {
                    const filter = `name.contains=${inputValueEmployee}&firstLastName.contains=${inputValueEmployee}&secondLastName.contains=${inputValueEmployee}`
                    dispatch(getFilteredEmployees(filter, 'name,ASC', 'OR'))
                })
            }
        }
    }, [openEmployee, inputValueEmployee]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (openWorkPlace) {
            if (inputValueWorkPlace === '') {
                dispatch(getWorkPlaces('name,ASC'))
            }
            if (inputValueWorkPlace !== '') {
                fetch(inputValueWorkPlace, (inputValueWorkPlace) => {
                    dispatch(getFilteredWorkPlace(`name.contains=${inputValueWorkPlace}`, 'name,ASC', 'OR'))
                })
            }
        }
    }, [openWorkPlace, inputValueWorkPlace]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (undefined === id) {
            dispatch(reset())
        } else {
            dispatch(getPhone(id))
        }
    }, [id])// eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
            navigate(-1); // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [isUpdateSuccess])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Widget title={t('title.manage')} disableWidgetMenu>
            <Formik
                initialValues={isNew ? defaultValue : entity}
                enableReinitialize={!isNew}
                onSubmit={(values: IPhone, {setSubmitting}) => {
                    if (isNew) {
                        dispatch(createPhone(values))
                    } else {
                        dispatch(updatePhone(values))
                    }
                    if (!updating && !isUpdateSuccess) {
                        setSubmitting(false)
                    }
                }}
                validationSchema={yup.object().shape({
                    number: yup.string().required(t("error:form.required")),
                    description: yup.string().max(255, t("error:form.maxlength", {max: 255}))
                })}
            >
                {({submitForm, handleChange, setFieldValue, touched, errors, values}) => (
                    <Form autoComplete="off" noValidate={true}>
                        <Box className={classes.form_group}>
                            <Box className={classes.input}>
                                <Field
                                    fullWidth
                                    name={"number"}
                                    variant="outlined"
                                    component={TextField}
                                    label={t("number")}
                                    InputLabelProps={{shrink: true}}
                                />
                            </Box>
                            <Box className={classes.inputSM}>
                                <Field
                                    name="active"
                                    type="checkbox"
                                    component={CheckboxWithLabel}
                                    Label={{label: t('active')}}
                                />
                            </Box>
                        </Box>
                        <Box className={classes.form_group}>
                            <Box className={classes.input}>
                                <MUIAutocomplete
                                    id="employeeId"
                                    open={openEmployee}
                                    options={employees}
                                    value={valueEmployee}
                                    loading={loadingEmployees}
                                    onOpen={() => setOpenEmployee(true)}
                                    filterOptions={(x) => x}
                                    onClose={() => setOpenEmployee(false)}
                                    loadingText={t('common:loading')}
                                    noOptionsText={t('common:no_option')}
                                    isOptionEqualToValue={(option: IEmployee, value: IEmployee) => option.id === value.id}
                                    onInputChange={(event: React.SyntheticEvent, newInputValue) => {
                                        if (newInputValue === '') {
                                            setFieldValue('employeeId', "")
                                        }
                                        setInputValueEmployee(newInputValue);
                                    }}
                                    onChange={(event: React.SyntheticEvent, value) => {
                                        setFieldValue('employeeId', value?.id || "")
                                        setValueEmployee(value)
                                    }}
                                    getOptionLabel={(option: IEmployee) => `${option.name} ${option.firstLastName} ${option.secondLastName}` || ''}
                                    renderInput={(params: AutocompleteRenderInputParams) => (
                                        <MUITextField
                                            {...params}
                                            variant="outlined"
                                            label={t('employee')}
                                            InputLabelProps={{shrink: true}}
                                            helperText={errors['employeeId']}
                                            error={touched['employeeId'] && !!errors['employeeId']}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {loadingEmployees ?
                                                            <CircularProgress color="inherit" size={20}/> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Box>
                            <Box className={classes.input}>
                                <MUIAutocomplete
                                    id="workPlaceId"
                                    open={openWorkPlace}
                                    options={workPlaces}
                                    value={valueWorkPlace}
                                    loading={loadingWorkPlaces}
                                    filterOptions={(x) => x}
                                    onOpen={() => setOpenWorkPlace(true)}
                                    onClose={() => setOpenWorkPlace(false)}
                                    loadingText={t('common:loading')}
                                    noOptionsText={t('common:no_option')}
                                    isOptionEqualToValue={(option: IWorkPlace, value: IWorkPlace) => option.id === value.id}
                                    onInputChange={(event: React.SyntheticEvent, newInputValue) => {
                                        if (newInputValue === '') {
                                            setFieldValue('workPlaceId', "")
                                        }
                                        setInputValueWorkPlace(newInputValue);
                                    }}
                                    onChange={(event: React.SyntheticEvent, value) => {
                                        setFieldValue('workPlaceId', value?.id || "")
                                        setValueWorkPlace(value)
                                    }}
                                    getOptionLabel={(option: IWorkPlace) => option.name || ''}
                                    renderInput={(params: AutocompleteRenderInputParams) => (
                                        <MUITextField
                                            {...params}
                                            variant="outlined"
                                            label={t('workPlace')}
                                            InputLabelProps={{shrink: true}}
                                            helperText={errors['workPlaceId']}
                                            error={touched['workPlaceId'] && !!errors['workPlaceId']}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {loadingWorkPlaces ?
                                                            <CircularProgress color="inherit" size={20}/> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Box>
                        </Box>
                        <Box className={classes.form_group}>
                            <Box className={classes.input}>
                                <Field
                                    component={TextField}
                                    InputLabelProps={{shrink: true}}
                                    fullWidth
                                    name={"description"}
                                    multiline
                                    variant="outlined"
                                    inputProps={{maxLength: "255"}}
                                    label={t("description")}
                                />
                            </Box>
                        </Box>
                        <Box className={classes.buttons}>
                            <Button
                                className={classes.button}
                                color="warning"
                                variant="contained"
                                component={Link}
                                to='/dashboard/phone'
                                disabled={updating}>
                                {t('common:cancel')}
                            </Button>
                            <Button
                                className={classes.button}
                                color="success"
                                variant="contained"
                                disabled={updating}
                                endIcon={updating ? <CircularProgress size="1rem"/> : null}
                                onClick={submitForm}>
                                {t('common:submit')}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Widget>
    );
};

export default PhoneManage;