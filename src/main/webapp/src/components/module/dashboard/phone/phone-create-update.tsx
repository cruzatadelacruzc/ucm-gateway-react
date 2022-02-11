import React from 'react';
import Widget from "../../../shared/layout/widget";
import {Link, useHistory, useParams} from "react-router-dom";
import {batch, useDispatch, useSelector} from "react-redux";
import {formUpdateStyles, MenuProps} from "../style";
import {useTranslation} from "react-i18next";
import {Field, Form, Formik} from "formik";
import {defaultValue, IPhone} from "../../../shared/models/phone.model";
import {IRootState} from "../../../shared/reducer";
import {createPhone, getPhone, updatePhone} from "./phone.reducer";
import * as yup from "yup";
import {Box, Button, CircularProgress, MenuItem} from "@mui/material";
import {CheckboxWithLabel, TextField} from "formik-mui";
import {geEmployees} from "../person/employee/employee.reducer";
import {getWorkPlaces} from "../workplace/workplace.reducer";

const PhoneManage = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const classes = formUpdateStyles();
    let {id} = useParams<{id: string}>();
    const [isNew] = React.useState(!id);
    const {t} = useTranslation(['phone']);
    const entity = useSelector((states: IRootState) => states.phone.entity);
    const updating = useSelector((states: IRootState) => states.phone.updating);
    const employees = useSelector((states: IRootState) => states.employee.entities);
    const workPlaces = useSelector((states: IRootState) => states.workPlace.entities);
    const isUpdateSuccess = useSelector((states: IRootState) => states.phone.updateSuccess);

    const handleSelect = React.useCallback((handleChange, setFieldValue, name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== "") {
            if (name === "employeeId") {
                setFieldValue("employeeId", event.target.value);
                setFieldValue("workPlaceId","");
            } else {
                setFieldValue("workPlaceId", event.target.value);
                setFieldValue("employeeId","");
            }
        }
        handleChange(event);
    }, [])

    React.useEffect(() => {
        batch( () => {
            dispatch(geEmployees())
            dispatch(getWorkPlaces())
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect( () => {
        if (!isNew) {
         dispatch(getPhone(id))
        }
    }, [isNew, id])// eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
            history.push('/phone');
        }
    }, [isUpdateSuccess])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Widget title={t('title.manage')} disableWidgetMenu>
            <Formik
                initialValues={isNew ? defaultValue : entity}
                enableReinitialize={!isNew}
                onSubmit={(values : IPhone, {setSubmitting}) => {
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
                {({submitForm, handleChange, setFieldValue}) => (
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
                                <Field
                                    select
                                    fullWidth
                                    name="employeeId"
                                    variant="outlined"
                                    component={TextField}
                                    SelectProps={MenuProps}
                                    label={t('employee')}
                                    InputLabelProps={{shrink: true}}
                                    onChange={handleSelect(handleChange, setFieldValue, "employeeId")}
                                    onBlur={handleSelect(handleChange,setFieldValue,  "employeeId")}
                                >
                                    <MenuItem value=""><em>-- {t('common:empty')} --</em></MenuItem>
                                    {employees.map((option, index) => (
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
                                    label={t('workplace')}
                                    InputLabelProps={{shrink: true}}
                                    onChange={handleSelect(handleChange,setFieldValue, "workplaceId")}
                                    onBlur={handleSelect(handleChange, setFieldValue,"workplaceId")}
                                >
                                    <MenuItem value=""><em>-- {t('common:empty')} --</em></MenuItem>
                                    {workPlaces.map((option, index) => (
                                        <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                    ))}
                                </Field>
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
                                variant="contained"
                                component={Link}
                                to='/phone'
                                disabled={updating}>
                                {t('common:cancel')}
                            </Button>
                            <Button
                                className={classes.button}
                                color="primary"
                                variant="contained"
                                disabled={updating}
                                endIcon={updating ? <CircularProgress size="1rem" /> : null}
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