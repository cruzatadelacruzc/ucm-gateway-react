import React from 'react';
import * as yup from "yup";
import {Field} from "formik";
import {useTranslation} from "react-i18next";
import {TextField} from "formik-mui";
import i18n from "../../../../../config/i18n";
import {Box, MenuItem} from "@mui/material";
import Widget from "../../../../shared/layout/widget";
import {IRootState} from "../../../../shared/reducer";
import {useNavigate, useParams} from "react-router-dom";
import {formUpdateStyles, MenuProps} from "../../style";
import PersonalStep, {_validationSchema} from "../index";
import {batch, useDispatch, useSelector} from "react-redux";
import {createStudent, getStudent, partialUpdateStudent, reset, updateStudent} from "./student.reducer";
import {defaultValue, IStudent} from "../../../../shared/models/student.model";
import FormStepper, {FormStep} from "../../../../shared/components/form-stepper";
import {getKinds, getStudyCenters} from "../../nomenclature/nomenclature.reducer";

const StudentManage = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = formUpdateStyles();
    let {id} = useParams<{id: string}>();
    const [isNew] = React.useState(!id);
    const {t} = useTranslation(['student']);
    const [avatar, setAvatar] = React.useState<File>();
    const _entity = useSelector((states: IRootState) => states.student.entity);
    const kinds = useSelector((states: IRootState) => states.nomenclature.kinds);
    const studyCenters = useSelector((states: IRootState) => states.nomenclature.studyCenters);
    const isUpdateSuccess = useSelector((states: IRootState) => states.student.updateSuccess);

    React.useEffect(() => {
        if (undefined === id) {
            dispatch(reset())
        } else {
            dispatch(getStudent(id))
        }
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        batch( () => {
            dispatch(getKinds())
            dispatch(getStudyCenters())
        })},[]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
            navigate(-1) // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [isUpdateSuccess]) // eslint-disable-line react-hooks/exhaustive-deps

    return <Widget title={t('title.manage')} disableWidgetMenu>
        <FormStepper
            initialValues={isNew ? defaultValue : _entity}
            enableReinitialize={!isNew}
            onSubmit={async (values: IStudent) => {
                if (isNew) {
                   return dispatch(createStudent({student: values, avatar: avatar}));
                } else {
                  return dispatch(updateStudent({student: values, avatar: avatar}));
                }
            }}
            cancelRoute='/student'
        >
            <FormStep
                label={t("person:step")}
                validationSchema={_validationSchema}
                operationKind={isNew ? "CREATE": "UPDATE"}
                onSubmit={async (values: IStudent) => {
                    if (undefined !== id) {
                       return dispatch(partialUpdateStudent({id, student: values, avatar: avatar}))
                    }
                }}
            >
                <PersonalStep
                    isNew={isNew}
                    person={_entity}
                    setFileInput={setAvatar}
                />
            </FormStep>
            <FormStep
                label={t("title.step")}
                validationSchema={yup.object().shape({
                    universityYear: yup.number().required(i18n.t("error:form.required"))
                        .integer(i18n.t("error:form.number")).min(1, i18n.t("error:form.min", {min: 1})),
                    classRoom: yup.string().required(i18n.t("error:form.required")),
                    residence: yup.string().required(i18n.t("error:form.required")),
                    studyCenterId: yup.string().required(i18n.t("error:form.required"))
                })}
                >
                <Box className={classes.form_group}>
                    <Box className={classes.input}>
                        <Field component={TextField} variant="outlined" fullWidth InputLabelProps={{shrink: true}}
                               name="residence" label={t('residence')}/>
                    </Box>
                    <Box className={classes.input}>
                        <Field component={TextField} variant="outlined" fullWidth InputLabelProps={{shrink: true}}
                               name="classRoom" label={t('classRoom')}/>
                    </Box>
                    <Box className={classes.input}>
                        <Field component={TextField} variant="outlined" fullWidth InputLabelProps={{shrink: true}}
                             type="number"  name="universityYear" label={t('universityYear')}/>
                    </Box>
                </Box>
                <Box className={classes.form_group}>
                    <Box className={classes.input}>
                        <Field
                            select
                            fullWidth
                            name="kindId"
                            variant="outlined"
                            component={TextField}
                            SelectProps={MenuProps}
                            label={t('kind')}
                            InputLabelProps={{shrink: true}}
                        >
                            <MenuItem value=""><em>-- {t('common:empty')} --</em></MenuItem>
                            {kinds.map((option, index) => (
                                <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                            ))}
                        </Field>
                    </Box>
                    <Box className={classes.input}>
                        <Field
                            select
                            fullWidth
                            name="studyCenterId"
                            variant="outlined"
                            component={TextField}
                            SelectProps={MenuProps}
                            label={t('studyCenter')}
                            InputLabelProps={{shrink: true}}
                        >
                            <MenuItem value=""><em>-- {t('common:empty')} --</em></MenuItem>
                            {studyCenters.map((option, index) => (
                                <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                            ))}
                        </Field>
                    </Box>
                </Box>
            </FormStep>
        </FormStepper>
      </Widget>
};

export default StudentManage;