import * as yup from "yup";
import React, {useEffect} from "react";
import i18n from '../../../../config/i18n'
import {useTranslation} from "react-i18next";
import {batch, useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../shared/reducer";
import {Field} from 'formik';
import {getDistricts, getSpecialties} from "../nomenclature/nomenclature.reducer";
import {DatePicker} from 'formik-mui-lab';
import {TextField} from 'formik-mui';
import {Box, Grid, MenuItem} from "@mui/material";
import {formUpdateStyles, MenuProps} from "../style";
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import {LocalizationProvider} from "@mui/lab";
import {IEmployee} from "../../../shared/models/employee.model";
import {IStudent} from "../../../shared/models/student.model";
import {deleteAvatar as deleteEmployeeAvatar} from "./employee/employee.reducer";
import {deleteAvatar as deleteStudentAvatar} from "./student/student.reducer";
import UCMAvatar from "../../../shared/components/avatar";

export const PERSON_GENDER = {
    FEMALE: "Femenino",
    MALE: "Masculino"
}

export const _validationSchema = yup.object().shape({
    email: yup.string().email(i18n.t("error:form.email")),
    ci: yup.string().required(i18n.t("error:form.required")),
    name: yup.string().required(i18n.t("error:form.required")),
    race: yup.string().required(i18n.t("error:form.required")),
    gender: yup.string().required(i18n.t("error:form.required")),
    address: yup.string().required(i18n.t("error:form.required")),
    districtId: yup.string().required(i18n.t("error:form.required")),
    birthdate: yup.string().required(i18n.t("error:form.required")),
})

interface IPersonStep {
    isNew: boolean,
    person: IEmployee | IStudent,
    setFileInput: React.Dispatch<React.SetStateAction<File | undefined>>
}

const PersonalStep = React.memo(({isNew, person, setFileInput}: IPersonStep) => {
    const dispatch = useDispatch();
    const classes = formUpdateStyles();
    const {t} = useTranslation(["person"]);
    const districts = useSelector((states: IRootState) => states.nomenclature.districts);
    const specialties = useSelector((states: IRootState) => states.nomenclature.specialties);

    useEffect(() => {
        batch(() => {
            dispatch(getDistricts())
            dispatch(getSpecialties())
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const isEmployee = (person): person is IEmployee  => {
        return (person as IEmployee).registerNumber !== undefined
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container>
                <Grid container item md={4} sm={12} xs={12} lg={4} justifyContent="center">
                        <UCMAvatar
                            height={250}
                            width={250}
                            avatarUrl={person.avatarUrl}
                            setResultAvatar={setFileInput}
                            deleteAvatar={() => {
                                if (isEmployee(person)) {
                                    dispatch(deleteEmployeeAvatar(person.id))
                                } else {
                                    dispatch(deleteStudentAvatar(person.id))
                                }
                            }}
                        />
                </Grid>
                <Grid container item md={8} sm={12} xs={12} lg={8}>
                    <Grid item md={6} sm={6} xs={12} lg={6}>
                        <Box className={classes.input}>
                            <Field name="ci" label={t('ci')} variant="outlined" fullWidth
                                   InputLabelProps={{shrink: true}}
                                   component={TextField}/>
                        </Box>
                    </Grid>
                    <Grid item md={12} sm={6} xs={12} lg={12}>
                        <Box className={classes.input}>
                            <Field name="email" label={t('email')} variant="outlined" fullWidth
                                   InputLabelProps={{shrink: true}}
                                   component={TextField}/>
                        </Box>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} lg={12}>
                        <Box className={classes.input}>
                            <Field name="address" label={t('address')}
                                   variant="outlined"
                                   fullWidth
                                   multiline
                                   inputProps={{maxLength: "255"}}
                                   InputLabelProps={{shrink: true}}
                                   component={TextField}
                            />
                        </Box>
                    </Grid>
                </Grid>
            <Grid item container md={12} sm={12} xs={12} lg={12}>
                <Box className={classes.input}>
                    <Field name="name" label={t('name')}
                           variant="outlined"
                           fullWidth
                           multiline
                           InputLabelProps={{shrink: true}}
                           inputProps={{maxLength: "255"}}
                           component={TextField}/>
                </Box>

                <Box className={classes.input}>
                    <Field name="firstLastName" label={t('firstLastName')}
                           fullWidth
                           multiline
                           variant="outlined"
                           component={TextField}
                           InputLabelProps={{shrink: true}}
                           inputProps={{maxLength: "255"}}
                    />
                </Box>

                <Box className={classes.input}>
                    <Field name="secondLastName" label={t('secondLastName')}
                           fullWidth
                           variant="outlined"
                           component={TextField}
                           InputLabelProps={{shrink: true}}
                           inputProps={{maxLength: "255"}}
                    />
                </Box>
            </Grid>
                {!isNew && <Grid item container md={12} sm={12} xs={12} lg={12}>
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
                                  selected={!isNew && person.gender !== undefined && person.gender === PERSON_GENDER.FEMALE}>
                            {t("gender.female")}
                        </MenuItem>
                        <MenuItem value={PERSON_GENDER.MALE}
                                  selected={!isNew && person.gender !== undefined && person.gender === PERSON_GENDER.MALE}>
                            {t("gender.male")}
                        </MenuItem>
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
            </Grid> }
            <Grid item container>
                <Box className={classes.input}>
                    <Field name="race" label={t('race')} fullWidth InputLabelProps={{shrink: true}}
                           variant="outlined" component={TextField}/>
                </Box>

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
                                      selected={!isNew && person.districtId !== undefined && person.districtId === option.id}>
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
                                      selected={!isNew && person.specialtyId !== undefined && person.specialtyId === option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Field>
                </Box>
            </Grid>
            </Grid>
        </LocalizationProvider>
    )
})

export default PersonalStep
