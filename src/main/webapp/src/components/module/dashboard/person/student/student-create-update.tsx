import React from 'react';
import * as yup from "yup";
import {Field} from "formik";
import {useTranslation} from "react-i18next";
import {TextField} from "formik-mui";
import i18n from "../../../../../config/i18n";
import {Box} from "@mui/material";
import Widget from "../../../../shared/layout/widget";
import {IRootState} from "../../../../shared/reducer";
import {useNavigate, useParams} from "react-router-dom";
import {formUpdateStyles} from "../../style";
import PersonalStep, {_validationSchema} from "../index";
import {useDispatch, useSelector} from "react-redux";
import {createStudent, getStudent, partialUpdateStudent, reset, updateStudent} from "./student.reducer";
import {defaultValue, IStudent} from "../../../../shared/models/student.model";
import FormStepper, {FormStep} from "../../../../shared/components/form-stepper";
import {
    getFilteredKinds,
    getFilteredStudyCenters,
    getKinds,
    getStudyCenters,
    reset as nomenclatureReset
} from "../../nomenclature/nomenclature.reducer";
import throttle from "lodash/throttle";
import UCMAutocomplete from "../../../../shared/components/autocomplete";
import {INomenclature} from "../../../../shared/models/nomenclature.model";

const StudentManage = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = formUpdateStyles();
    let {id} = useParams<{ id: string }>();
    const [isNew] = React.useState(!id);
    const {t} = useTranslation(['student']);
    const [avatar, setAvatar] = React.useState<File>();
    const _entity = useSelector((states: IRootState) => states.student.entity);
    const kinds = useSelector((states: IRootState) => states.nomenclature.kinds);
    const studyCenters = useSelector((states: IRootState) => states.nomenclature.studyCenters);
    const isUpdateSuccess = useSelector((states: IRootState) => states.student.updateSuccess);

    const [openKind, setOpenKind] = React.useState(false);
    const [inputValueKind, setInputValueKind] = React.useState('');
    const loadingKinds = useSelector((states: IRootState) => states.nomenclature.loadingKinds);

    const [openStudyCenter, setOpenStudyCenter] = React.useState(false);
    const [inputValueStudyCenter, setInputValueStudyCenter] = React.useState('');
    const loadingStudyCenters = useSelector((states: IRootState) => states.nomenclature.loadingStudyCenters);

    React.useEffect(() => {
        dispatch(nomenclatureReset())
        if (undefined === id) {
            dispatch(reset())
        } else {
            dispatch(getStudent(id))
        }
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

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
        if (inputValueKind === '' && openKind) {
            dispatch(getKinds('name,ASC'))
        }
        if (inputValueKind !== '' && openKind) {
            fetch(inputValueKind, (inputValue) => {
                dispatch(getFilteredKinds(`name.contains=${inputValue}`, 'name,ASC', 'OR'))
            })
        }
        if (inputValueStudyCenter === '' && openStudyCenter) {
            dispatch(getStudyCenters('name,ASC'))
        }
        if (inputValueStudyCenter !== '' && openStudyCenter) {
            fetch(inputValueStudyCenter, (inputValue) => {
                dispatch(getFilteredStudyCenters(`name.contains=${inputValue}`, 'name,ASC', 'OR'))
            })
        }
    }, [inputValueKind, openKind, openStudyCenter, inputValueStudyCenter]) // eslint-disable-line react-hooks/exhaustive-deps

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
                const transformedValues: IStudent = {
                    ...values,
                    kindId: values.kind?.id,
                    studyCenterId: values.studyCenter?.id
                }
                if (isNew) {
                    return dispatch(createStudent({student: transformedValues, avatar: avatar}));
                } else {
                    return dispatch(updateStudent({student: transformedValues, avatar: avatar}));
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
                        <Field name='kind'
                               open={openKind}
                               options={kinds}
                               component={UCMAutocomplete}
                               loading={loadingKinds}
                               onOpen={() => setOpenKind(true)}
                               onClose={() => setOpenKind(false)}
                               getOptionLabel={(option: INomenclature) => option.name || ''}
                               textFieldProps={{label: t('kind')}}
                               onInputChange={(event: React.SyntheticEvent, newInputValue) => {
                                   setInputValueKind(newInputValue);
                               }}
                               isOptionEqualToValue={(option: INomenclature, value: INomenclature) => option.id === value.id}
                        />
                    </Box>
                    <Box className={classes.input}>
                        <Field name='studyCenter'
                               open={openStudyCenter}
                               options={studyCenters}
                               component={UCMAutocomplete}
                               loading={loadingStudyCenters}
                               onOpen={() => setOpenStudyCenter(true)}
                               onClose={() => setOpenStudyCenter(false)}
                               getOptionLabel={(option: INomenclature) => option.name || ''}
                               textFieldProps={{label: t('studyCenter')}}
                               onInputChange={(event: React.SyntheticEvent, newInputValue) => {
                                   setInputValueStudyCenter(newInputValue);
                               }}
                               isOptionEqualToValue={(option: INomenclature, value: INomenclature) => option.id === value.id}
                        />
                    </Box>
                </Box>
            </FormStep>
        </FormStepper>
      </Widget>
};

export default StudentManage;