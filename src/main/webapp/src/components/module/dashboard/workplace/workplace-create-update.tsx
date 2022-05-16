import React from 'react';
import * as yup from "yup";
import {Field, Form, Formik} from "formik";
import {useTranslation} from "react-i18next";
import {IRootState} from "../../../shared/reducer";
import Widget from "../../../shared/layout/widget";
import {formUpdateStyles} from "../style";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Autocomplete, CheckboxWithLabel, TextField} from "formik-mui";
import {
    AutocompleteRenderInputParams,
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField as MUITextField
} from "@mui/material";
import {defaultValue, IWorkPlace} from "../../../shared/models/workplace.model";
import {createWorkPlace, deleteAvatar, getWorkPlace, reset, updateWorkPlace} from "./workplace.reducer";
import {createDeepEqualSelector} from "../../../shared/util/function-utils";
import {IEmployee} from "../../../shared/models/employee.model";
import UCMAvatar from "../../../shared/components/avatar";
import {getFilteredEmployees, reset as ResetEmp} from "../person/employee/employee.reducer";
import {CONFIG} from "../../../../config/constants";
import throttle from "lodash/throttle";


const WorkPlaceManage = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = formUpdateStyles();
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
            navigate(-1); // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [isUpdateSuccess]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Widget title={t('title.manage')} disableWidgetMenu>
            <Formik
                initialValues={isNew ? defaultValue : entity}
                enableReinitialize={!isNew}
                onSubmit={async (values: IWorkPlace) => {
                        if (isNew) {
                            return dispatch(createWorkPlace({workplace: values, avatar: avatar}))
                        } else {
                            return dispatch(updateWorkPlace({workplace: values, avatar: avatar}))
                        }
                }}
                validationSchema={yup.object().shape({
                    email: yup.string().email(t("error:form.email")),
                    name: yup.string().required(t("error:form.required")),
                    description: yup.string().max(255, t("error:form.maxlength", {max: 255}))
                })}
            >
                {({submitForm, setFieldValue, values}) => (
                    <Form autoComplete="off" noValidate={true}>
                        <Grid container>
                            <Grid container item md={5} sm={12} xs={12} lg={4} justifyContent="center">
                                <UCMAvatar
                                    height={300}
                                    width={300}
                                    avatarUrl={entity.avatarUrl}
                                    setResultAvatar={setAvatar}
                                    backgroundUrl={`${CONFIG.DEFAULT_PATH}/workplace.svg`}
                                    deleteAvatar={() => dispatch(deleteAvatar(entity.id))}
                                />
                            </Grid>
                            <Grid container item md={7} sm={12} xs={12} lg={8}>
                                <Grid container item xs={12}>
                                    <Grid item xs={12} sm={9} md={9} lg={9}>
                                        <Box className={classes.input}>
                                            <Field
                                                InputLabelProps={{shrink: true}}
                                                component={TextField}
                                                fullWidth
                                                variant="outlined"
                                                name={"email"}
                                                label={t("email")}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <Box className={classes.inputSM}>
                                            <Field
                                                type="checkbox"
                                                name="active"
                                                component={CheckboxWithLabel}
                                                Label={{label: t('active')}}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box className={classes.input}>
                                        <Field
                                            InputLabelProps={{shrink: true}}
                                            component={TextField}
                                            fullWidth
                                            variant="outlined"
                                            name={"name"}
                                            label={t("name")}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box className={classes.input}>
                                        <Field
                                            multiple
                                            fullWidth
                                            name="employees"
                                            open={openEmployee}
                                            component={Autocomplete}
                                            filterOptions={(x) => x}
                                            loading={loadingEmployees}
                                            options={employeesToUpdate}
                                            loadingText={t('common:loading')}
                                            noOptionsText={t('common:no_option')}
                                            onOpen={() => setOpenEmployee(true)}
                                            onClose={() => setOpenEmployee(false)}
                                            onInputChange={(event: React.SyntheticEvent, newInputValue: string) => {
                                                setInputValueEmployee(newInputValue);
                                            }}
                                            onChange={(event: React.SyntheticEvent, values: Array<IEmployee>) => {
                                                    setFieldValue("employeeIds", values.map(emp => emp.id));
                                                    setFieldValue("employees", values);
                                            }}
                                            isOptionEqualToValue={(option: IEmployee, value: IEmployee) => option.id === value.id}
                                            getOptionLabel={(option: IEmployee) => `${option.name} ${option.firstLastName} ${option.secondLastName}` || ''}
                                            renderInput={(params: AutocompleteRenderInputParams) => (
                                                <MUITextField
                                                    {...params}
                                                    name="employees"
                                                    variant="outlined"
                                                    label={t('employees')}
                                                    InputLabelProps={{shrink: true}}
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
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
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
                            </Grid>
                            <Box className={classes.buttons}>
                                <Button
                                    className={classes.button}
                                    color="warning"
                                    variant="contained"
                                    component={Link}
                                    to='/dashboard/workplace'
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
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Widget>
    );
};

export default WorkPlaceManage;