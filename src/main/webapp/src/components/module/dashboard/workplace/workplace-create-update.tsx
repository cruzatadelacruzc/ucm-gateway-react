import React from 'react';
import * as yup from "yup";
import {Field, Form, Formik} from "formik";
import {useTranslation} from "react-i18next";
import {IRootState} from "../../../shared/reducer";
import Widget from "../../../shared/layout/widget";
import {formUpdateStyles, MenuProps} from "../style";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory, useParams} from "react-router-dom";
import {CheckboxWithLabel, Select, TextField} from "formik-material-ui";
import {Box, Button, CircularProgress, InputLabel, MenuItem} from "@material-ui/core";
import {defaultValue, IWorkPlace} from "../../../shared/models/workplace.model";
import {createWorkPlace, getWorkPlace, updateWorkPlace} from "./workplace.reducer";
import {geEmployees, getFilterEmployees} from "../person/employee/employee.reducer";
import {createDeepEqualSelector} from "../../../shared/util/function-utils";
import {IEmployee} from "../../../shared/models/employee.model";


const WorkPlaceManage = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const classes = formUpdateStyles();
    let {id} = useParams<{id: string}>();
    const [isNew] = React.useState(!id);
    const {t} = useTranslation(['workplace']);
    const entity = useSelector((states: IRootState) => states.workPlace.entity);
    const updating = useSelector((states: IRootState) => states.workPlace.updating);
    const isUpdateSuccess = useSelector((states: IRootState) => states.workPlace.updateSuccess);
    const selector = createDeepEqualSelector(
        (states: IRootState) =>  states.employee.entities,
        (states: IRootState) =>  states.workPlace.entity.employeeIds,
        (entities: ReadonlyArray<IEmployee>, employeeIds) => entities
            .filter( emp => emp.id && (employeeIds?.includes(emp.id) || !emp.workPlaceId))
    );
    const employeesToUpdate = useSelector((states: IRootState) => selector(states));

    React.useEffect( () => {
        if (isNew) {
            dispatch(getFilterEmployees(`workPlaceId.specified=false`))
        } else {
            dispatch(geEmployees())
            dispatch(getWorkPlace(id))
        }
    }, [isNew, id]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
            history.push('/workplace');
        }
    }, [isUpdateSuccess, history])



    return (
        <Widget title={t('title.manage')} disableWidgetMenu>
            <Formik
                initialValues={isNew ? defaultValue : entity}
                enableReinitialize={!isNew}
                onSubmit={(values :IWorkPlace) => {
                    if (isNew) {
                        dispatch(createWorkPlace(values))
                    } else {
                        dispatch(updateWorkPlace(values))
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
                        <Box className={classes.form_group}>
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
                            <Box className={classes.inputSM}>
                                <Field
                                    type="checkbox"
                                    name="active"
                                    component={CheckboxWithLabel}
                                    Label={{label: t('active')}}
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
                           <Box className={classes.form_group}>
                               <Box className={classes.input}>
                                   <InputLabel shrink={true} htmlFor="employeeIds">{t('employees')}</InputLabel>
                                <Field
                                    fullWidth
                                    multiple
                                    name="employeeIds"
                                    variant="outlined"
                                    component={Select}
                                    MenuProps={{...MenuProps.MenuProps}}
                                >
                                    {employeesToUpdate.map((option, index) => (
                                        <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                    ))}
                                </Field>
                               </Box>
                           </Box>
                        <Box className={classes.buttons}>
                            <Button
                                className={classes.button}
                                color="default"
                                variant="contained"
                                component={Link}
                                to='/workplace'
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

export default WorkPlaceManage;