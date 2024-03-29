import React from 'react';
import Widget from "../../../shared/layout/widget";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Field, Form, Formik} from "formik";
import {defaultValue, IPhone} from "../../../shared/models/phone.model";
import {IRootState} from "../../../shared/reducer";
import {createPhone, getPhone, reset, updatePhone} from "./phone.reducer";
import * as yup from "yup";
import {AutocompleteRenderInputParams, Button, CircularProgress, TextField as MUITextField} from "@mui/material";
import {Autocomplete, CheckboxWithLabel, TextField} from "formik-mui";
import {geEmployees, getFilteredEmployees, reset as resetEmployee} from "../person/employee/employee.reducer";
import {IEmployee} from "../../../shared/models/employee.model";
import throttle from 'lodash/throttle'
import {IWorkPlace} from "../../../shared/models/workplace.model";
import {getFilteredWorkPlace, getWorkPlaces, reset as resetWorkPlace} from "../workplace/workplace.reducer";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";

const PhoneManage = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
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


    const [openWorkPlace, setOpenWorkPlace] = React.useState(false);
    const [inputValueWorkPlace, setInputValueWorkPlace] = React.useState('');
    const loadingWorkPlaces = useSelector((states: IRootState) => states.workPlace.loading);

    const handleSelect = React.useCallback((setFieldValue, name: string) => (event: React.SyntheticEvent, value) => {
        if (name === "employeeId") {
            setFieldValue("employeeId", value?.id || '');
            setFieldValue("employee", value);
            setFieldValue("workPlaceId", "");
            setFieldValue("workPlace", null);
        } else {
            setFieldValue("workPlaceId", value?.id || '');
            setFieldValue("workPlace", value);
            setFieldValue("employeeId", "");
            setFieldValue("employee", null);
        }
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
        dispatch(resetEmployee())
        dispatch(resetWorkPlace())
        if (undefined === id) {
            dispatch(reset())
        } else {
            dispatch(getPhone(id))
        }
    }, [id])// eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
            dispatch(reset())
            navigate(-1); // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [isUpdateSuccess])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Widget title={t('title.manage')} disableWidgetMenu>
            <Formik
                initialValues={isNew ? defaultValue : entity}
                enableReinitialize={!isNew}
                onSubmit={async (values: IPhone) => {
                    if (isNew) {
                        return dispatch(createPhone(values))
                    } else {
                        return dispatch(updatePhone(values))
                    }
                }}
                validationSchema={yup.object().shape({
                    number: yup.string().required(t("error:form.required")),
                    description: yup.string().max(255, t("error:form.maxlength", {max: 255}))
                })}
            >
                {({submitForm, setFieldValue, touched, errors}) => (
                    <Form autoComplete="off" noValidate={true}>
                        <Grid container spacing={2}>
                            <Grid item container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        fullWidth
                                        name={"number"}
                                        variant="outlined"
                                        component={TextField}
                                        label={t("number")}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="active"
                                        type="checkbox"
                                        component={CheckboxWithLabel}
                                        Label={{label: t('active')}}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="employee"
                                        component={Autocomplete}
                                        open={openEmployee}
                                        options={employees}
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
                                        onChange={handleSelect(setFieldValue, 'employeeId')}
                                        getOptionLabel={(option: IEmployee) => `${option.name} ${option.firstLastName} ${option.secondLastName}` || ''}
                                        renderInput={(params: AutocompleteRenderInputParams) => (
                                            <MUITextField
                                                {...params}
                                                name="employee"
                                                variant="outlined"
                                                label={t('employee')}
                                                InputLabelProps={{shrink: true}}
                                                helperText={errors['employee']}
                                                error={touched['employee'] && !!errors['employee']}
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
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="workPlace"
                                        component={Autocomplete}
                                        open={openWorkPlace}
                                        options={workPlaces}
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
                                        onChange={handleSelect(setFieldValue, 'workPlaceId')}
                                        getOptionLabel={(option: IWorkPlace) => option.name || ''}
                                        renderInput={(params: AutocompleteRenderInputParams) => (
                                            <MUITextField
                                                {...params}
                                                name='workPlace'
                                                variant="outlined"
                                                label={t('workPlace')}
                                                InputLabelProps={{shrink: true}}
                                                helperText={errors['workPlace']}
                                                error={touched['workPlace'] && !!errors['workPlace']}
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
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
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
                            </Grid>
                            <Grid item container xs={12} spacing={2}>
                                <Grid item xs={12} sm={2}>
                                    <Button
                                        fullWidth
                                        color="secondary"
                                        variant="contained"
                                        component={Link}
                                        to='/dashboard/phone'
                                        startIcon={<CancelIcon/>}
                                        disabled={updating}>
                                        {t('common:cancel')}
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        disabled={updating}
                                        startIcon={updating ? <CircularProgress size="1rem"/> : <SendIcon/>}
                                        onClick={submitForm}>
                                        {t('common:submit')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Widget>
    );
};

export default PhoneManage;