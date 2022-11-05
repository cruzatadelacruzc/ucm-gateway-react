import React from 'react';
import * as yup from "yup";
import {Field, Form, Formik} from "formik";
import {useTranslation} from "react-i18next";
import {IRootState} from "../../../shared/reducer";
import Widget from "../../../shared/layout/widget";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {CheckboxWithLabel, TextField} from "formik-mui";
import {Button, CircularProgress, Grid} from "@mui/material";
import {defaultValue, IWorkPlace} from "../../../shared/models/workplace.model";
import {createWorkPlace, deleteAvatar, getWorkPlace, reset, updateWorkPlace} from "./workplace.reducer";
import {createDeepEqualSelector} from "../../../shared/util/function-utils";
import {IEmployee} from "../../../shared/models/employee.model";
import UCMAvatar from "../../../shared/components/avatar";
import {getFilteredEmployees, reset as ResetEmp} from "../person/employee/employee.reducer";
import {CONFIG} from "../../../../config/constants";
import throttle from "lodash/throttle";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import UCMAutocomplete from "../../../shared/components/autocomplete";
import {INomenclature} from "../../../shared/models/nomenclature.model";


const WorkPlaceManage = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let {id} = useParams<{ id: string }>();
    const [isNew] = React.useState(!id);
    const {t} = useTranslation(['workplace']);
    const [avatar, setAvatar] = React.useState<File>();
    const entity = useSelector((states: IRootState) => states.workPlace.entity);
    const updating = useSelector((states: IRootState) => states.workPlace.updating);
    const isUpdateSuccess = useSelector((states: IRootState) => states.workPlace.updateSuccess);
    const employeesToUpdate = useSelector(createDeepEqualSelector(
        (states: IRootState) => states.employee.entities,
        (states: IRootState) => states.workPlace.entity.employeeIds,
        (states: IRootState) => states.workPlace.entity.employees,
        (entities: ReadonlyArray<IEmployee>, employeeIds, employees) => entities.concat(employees)
            .filter(emp => emp.id && (employeeIds.includes(emp.id) || !emp.workPlaceId))
    ));

    const [openEmployee, setOpenEmployee] = React.useState(false);
    const [inputValueEmployee, setInputValueEmployee] = React.useState('');
    const loadingEmployees = useSelector((states: IRootState) => states.employee.loading);

    React.useEffect(() => {
        dispatch(ResetEmp()) // avoid duplicate employees in employeesToUpdate
        if (undefined === id) { // id undefined, then action is Create, otherwise Update
            dispatch(reset())
        } else {
            dispatch(getWorkPlace(id))
        }
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

    const fetch = React.useMemo(
        () => throttle((input: string) => {
                if (input !== '') {
                    const filter = `name.contains=${input}&firstLastName.contains=${input}&secondLastName.contains=${input}`
                    dispatch(getFilteredEmployees(filter, 'name,ASC', 'OR'))
                }
            },
            300,
        ),
        []); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (openEmployee) {
            if (inputValueEmployee === '') {
                dispatch(getFilteredEmployees(`workPlaceId.specified=false`, 'name,ASC'))
            }
            if (inputValueEmployee !== '') {
                fetch(inputValueEmployee)
            }
        }
    }, [openEmployee, inputValueEmployee]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
            dispatch(reset())
            navigate(-1); // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [isUpdateSuccess]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Widget title={t('title.manage')} disableWidgetMenu>
            <Formik
                initialValues={isNew ? defaultValue : entity}
                enableReinitialize={!isNew}
                onSubmit={async (values: IWorkPlace) => {
                    let ids: Array<string> = []
                    if (values.employees !== undefined) {
                        values.employees.forEach(emp => emp.id != undefined && ids.push(emp.id))
                    }
                    const transformValues: IWorkPlace = {...values, employeeIds: ids}

                    if (isNew) {
                        return dispatch(createWorkPlace({workplace: transformValues, avatar: avatar}))
                    } else {
                        return dispatch(updateWorkPlace({workplace: transformValues, avatar: avatar}))
                    }
                }}
                validationSchema={yup.object().shape({
                    email: yup.string().email(t("error:form.email")),
                    name: yup.string().required(t("error:form.required")),
                    description: yup.string().max(255, t("error:form.maxlength", {max: 255}))
                })}
            >
                {({submitForm}) => (
                    <Form autoComplete="off" noValidate={true}>
                        <Grid container spacing={2}>
                            <Grid container item xs={12} md={4} lg={4} justifyContent="center">
                                <UCMAvatar
                                    height={300}
                                    width={300}
                                    avatarUrl={entity.avatarUrl}
                                    setResultAvatar={setAvatar}
                                    backgroundUrl={`${CONFIG.DEFAULT_PATH}/workplace.svg`}
                                    deleteAvatar={() => dispatch(deleteAvatar(entity.id))}
                                />
                            </Grid>
                            <Grid container item xs={12} md={8} lg={8}>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        type="checkbox"
                                        name="active"
                                        component={CheckboxWithLabel}
                                        Label={{label: t('active')}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        InputLabelProps={{shrink: true}}
                                        component={TextField}
                                        fullWidth
                                        variant="outlined"
                                        name={"email"}
                                        label={t("email")}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        InputLabelProps={{shrink: true}}
                                        component={TextField}
                                        fullWidth
                                        variant="outlined"
                                        name={"name"}
                                        label={t("name")}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    multiple
                                    fullWidth
                                    name='employees'
                                    open={openEmployee}
                                    options={employeesToUpdate}
                                    component={UCMAutocomplete}
                                    loading={loadingEmployees}
                                    onOpen={() => setOpenEmployee(true)}
                                    onClose={() => setOpenEmployee(false)}
                                    getOptionLabel={(option: INomenclature) => option.name || ''}
                                    textFieldProps={{label: t('employees')}}
                                    onInputChange={(event: React.SyntheticEvent, newInputValue) => {
                                        setInputValueEmployee(newInputValue);
                                    }}
                                    isOptionEqualToValue={(option: INomenclature, value: INomenclature) => option.id === value.id}
                                />
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
                            <Grid item container xs={12} spacing={{xs: 2, sm: 0}}>
                                <Grid item xs={12} sm={2}>
                                    <Button
                                        fullWidth
                                        color="warning"
                                        variant="contained"
                                        component={Link}
                                        to='/dashboard/workplace'
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

export default WorkPlaceManage;