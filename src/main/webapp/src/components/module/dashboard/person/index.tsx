import React, {useEffect} from "react";
import i18n from '../../../../config/i18n'
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../shared/reducer";
import {Field} from 'formik';
import {getDistricts, getSpecialties} from "../nomenclature/nomenclature.reducer";
import {DatePicker} from "formik-material-ui-pickers";
import {TextField} from 'formik-material-ui';
import {Box, MenuItem} from "@material-ui/core";
import {formUpdateStyles, MenuProps} from "../style";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import * as yup from "yup";

export const PERSON_GENDER = {
    FEMALE: "Femenino",
    MALE: "Masculino"
}

export const _validationSchema = yup.object().shape({
    email: yup.string().email(),
    ci: yup.string().required(i18n.t("error:form.required")),
    name: yup.string().required(i18n.t("error:form.required")),
    race: yup.string().required(i18n.t("error:form.required")),
    gender: yup.string().required(i18n.t("error:form.required")),
    districtId: yup.string().required(i18n.t("error:form.required")),
    birthdate: yup.string().required(i18n.t("error:form.required")),
})

interface IPersonStep {
    isNew: boolean,
    districtId?: string
    specialtyId?: string
    gender?: string
}

const PersonalStep = React.memo((props: IPersonStep) => {
    const dispatch = useDispatch();
    const classes = formUpdateStyles();
    const {t} = useTranslation(["person"]);
    const districts = useSelector((states: IRootState) => states.nomenclature.districts);
    const specialties = useSelector((states: IRootState) => states.nomenclature.specialties);

    useEffect(() => {
        dispatch(getDistricts())
        dispatch(getSpecialties())
    }, [dispatch])

    return (
        <>
            <MuiPickersUtilsProvider utils={DayjsUtils}>
                <Box className={classes.form_group}>
                    <Box className={classes.inputSM}>
                        <Field name="ci" label={t('ci')} variant="outlined" fullWidth InputLabelProps={{shrink: true}}
                               component={TextField}/>
                    </Box>
                    <Box className={classes.input}>
                        <Field name="email" label={t('email')} variant="outlined" fullWidth
                               InputLabelProps={{shrink: true}}
                               component={TextField}/>
                    </Box>
                    <Box className={classes.input}>
                        <Field name="address" label={t('address')} variant="outlined" fullWidth
                               InputLabelProps={{shrink: true}}
                               component={TextField}/>
                    </Box>
                </Box>
                <Box className={classes.form_group}>
                    <Box className={classes.input}>
                        <Field name="name" label={t('name')} variant="outlined" fullWidth
                               InputLabelProps={{shrink: true}}
                               component={TextField}/>
                    </Box>
                    <Box className={classes.input}>
                        <Field name="firstLastName" label={t('firstLastName')} fullWidth variant="outlined"
                               InputLabelProps={{shrink: true}} component={TextField}/>
                    </Box>
                    <Box className={classes.input}>
                        <Field name="secondLastName" label={t('secondLastName')} fullWidth variant="outlined"
                               InputLabelProps={{shrink: true}} component={TextField}/>
                    </Box>
                </Box>
                <Box className={classes.form_group}>
                    <Box className={classes.input}>
                        <Field
                            select
                            fullWidth
                            name="gender"
                            variant="outlined"
                            component={TextField}
                            SelectProps={MenuProps}
                            label={t('gender.label')}
                            InputLabelProps={{shrink: true}}
                        >
                            <MenuItem value=""><em>-- {t('common:empty')} --</em></MenuItem>
                            <MenuItem value={PERSON_GENDER.FEMALE}
                                      selected={!props.isNew && props.gender !== undefined && props.gender === PERSON_GENDER.FEMALE}>
                                {t("gender.female")}
                            </MenuItem>
                            <MenuItem value={PERSON_GENDER.MALE}
                                      selected={!props.isNew && props.gender !== undefined && props.gender === PERSON_GENDER.MALE}>
                                {t("gender.male")}
                            </MenuItem>
                        </Field>
                    </Box>
                    <Box className={classes.input}>
                        <Field name="age" type="number" label={t('age')} InputLabelProps={{shrink: true}}
                               variant="outlined" component={TextField}/>
                    </Box>
                    <Box className={classes.input}>
                        <Field name="race" label={t('race')} fullWidth InputLabelProps={{shrink: true}}
                               variant="outlined" component={TextField}/>
                    </Box>
                </Box>
                <Box className={classes.form_group}>
                    <Box className={classes.input}>
                        <Field
                            select
                            fullWidth
                            name="districtId"
                            variant="outlined"
                            component={TextField}
                            SelectProps={MenuProps}
                            label={t('district')}
                            InputLabelProps={{shrink: true}}
                        >
                            <MenuItem value=""><em>-- {t('common:empty')} --</em></MenuItem>
                            {districts.map((option, index) => (
                                <MenuItem key={index} value={option.id}
                                          selected={!props.isNew && props.districtId !== undefined && props.districtId === option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Field>
                    </Box>
                    <Box className={classes.input}>
                        <Field
                            select
                            fullWidth
                            name="specialtyId"
                            variant="outlined"
                            component={TextField}
                            SelectProps={MenuProps}
                            label={t('specialty')}
                            InputLabelProps={{shrink: true}}
                        >
                            <MenuItem value=""><em>-- {t('common:empty')} --</em></MenuItem>
                            {specialties.map((option, index) => (
                                <MenuItem key={index} value={option.id}
                                          selected={!props.isNew && props.specialtyId !== undefined && props.specialtyId === option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Field>
                    </Box>
                    <Box className={classes.input}>
                        <Field
                            autoOk
                            fullWidth
                            inputVariant="outlined"
                            name={"birthdate"}
                            component={DatePicker}
                            label={t('birthdate')}
                            InputLabelProps={{shrink: true}}
                            format={t("common:date_format")}
                        />
                    </Box>
                </Box>
            </MuiPickersUtilsProvider>
        </>
    )
})

export default PersonalStep
