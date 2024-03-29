import * as yup from "yup";
import React from "react";
import i18n from '../../../../config/i18n'
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../shared/reducer";
import {Field, useFormikContext} from 'formik';
import {
    getDistricts,
    getFilteredDistricts,
    getFilteredSpecialties,
    getSpecialties
} from "../nomenclature/nomenclature.reducer";
import {DatePicker} from 'formik-mui-lab';
import {Autocomplete, TextField} from 'formik-mui';
import {AutocompleteRenderInputParams, Grid, TextField as MUITextField} from "@mui/material";
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import {LocalizationProvider} from "@mui/lab";
import {IEmployee} from "../../../shared/models/employee.model";
import {IStudent} from "../../../shared/models/student.model";
import {deleteAvatar as deleteEmployeeAvatar} from "./employee/employee.reducer";
import {deleteAvatar as deleteStudentAvatar} from "./student/student.reducer";
import UCMAvatar from "../../../shared/components/avatar";
import {INomenclature} from "../../../shared/models/nomenclature.model";
import throttle from "lodash/throttle";
import UCMAutocomplete from "../../../shared/components/autocomplete";

export const PERSON_GENDER = {
    FEMALE: "Femenino",
    MALE: "Masculino"
}

export const _validationSchema = yup.object().shape({
    email: yup.string().email(i18n.t("error:form.email")),
    ci: yup.string().required(i18n.t("error:form.required")),
    name: yup.string().required(i18n.t("error:form.required")),
    race: yup.string().required(i18n.t("error:form.required")),
    address: yup.string().required(i18n.t("error:form.required")),
    district: yup.object().nullable().required(i18n.t("error:form.required"))
})

interface IPersonStep {
    isNew: boolean,
    person: IEmployee | IStudent,
    setFileInput: React.Dispatch<React.SetStateAction<File | undefined>>
}

const PersonalStep = React.memo(({isNew, person, setFileInput}: IPersonStep) => {
    const dispatch = useDispatch();
    const {t} = useTranslation(["person"]);
    const {errors, touched} = useFormikContext();
    const districts = useSelector((states: IRootState) => states.nomenclature.districts);
    const specialties = useSelector((states: IRootState) => states.nomenclature.specialties);

    const filter = `name.contains=inputValue&description.contains=inputValue`

    const [openDistrict, setOpenDistrict] = React.useState(false);
    const [inputValueDistrict, setInputValueDistrict] = React.useState('');
    const loadingDistricts = useSelector((states: IRootState) => states.nomenclature.loadingDistricts);

    const [openSpecialty, setOpenSpecialty] = React.useState(false);
    const [inputValueSpecialty, setInputValueSpecialty] = React.useState('');
    const loadingSpecialties = useSelector((states: IRootState) => states.nomenclature.loadingSpecialties);

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
        if (inputValueDistrict === '' && openDistrict) {
            dispatch(getDistricts('name,ASC'))
        }
        if (inputValueSpecialty === '' && openSpecialty) {
            dispatch(getSpecialties('name,ASC'))
        }
        if (inputValueDistrict !== '' && openDistrict) {
            fetch(inputValueDistrict, (inputValueDistrict) => {
                dispatch(getFilteredDistricts(filter.replaceAll('inputValue', inputValueDistrict), 'name,ASC', 'OR'))
            })
        }
        if (inputValueSpecialty !== '' && openSpecialty) {
            fetch(inputValueSpecialty, (inputValueSpecialty) => {
                dispatch(getFilteredSpecialties(filter.replaceAll('inputValue', inputValueSpecialty), 'name,ASC', 'OR'))
            })
        }
    }, [openDistrict, openSpecialty, inputValueDistrict, inputValueSpecialty]) // eslint-disable-line react-hooks/exhaustive-deps

    const isEmployee = (person): person is IEmployee => {
        return (person as IEmployee).registerNumber !== undefined
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2}>
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
                <Grid container item md={8} sm={12} xs={12} lg={8} spacing={2}>
                    <Grid item xs={12} sm={6} md={12}>
                        <Field name="ci" label={t('ci')} variant="outlined" fullWidth
                               InputLabelProps={{shrink: true}}
                               component={TextField}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12}>
                        <Field name="email" label={t('email')} variant="outlined" fullWidth
                               InputLabelProps={{shrink: true}}
                               component={TextField}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field name="address" label={t('address')}
                               variant="outlined"
                               fullWidth
                               multiline
                               inputProps={{maxLength: "255"}}
                               InputLabelProps={{shrink: true}}
                               component={TextField}
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Field name="name" label={t('name')}
                               variant="outlined"
                               fullWidth
                               multiline
                               InputLabelProps={{shrink: true}}
                               inputProps={{maxLength: "255"}}
                               component={TextField}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Field name="firstLastName" label={t('firstLastName')}
                               fullWidth
                               multiline
                               variant="outlined"
                               component={TextField}
                               InputLabelProps={{shrink: true}}
                               inputProps={{maxLength: "255"}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Field name="secondLastName" label={t('secondLastName')}
                               fullWidth
                               variant="outlined"
                               component={TextField}
                               InputLabelProps={{shrink: true}}
                               inputProps={{maxLength: "255"}}
                        />
                    </Grid>
                </Grid>
                {!isNew && <Grid item container xs={12} spacing={2}>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Field
                            fullWidth
                            disableClearable
                            name="gender"
                            options={[PERSON_GENDER.FEMALE, PERSON_GENDER.MALE]}
                            component={Autocomplete}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderInput={(params: AutocompleteRenderInputParams) => (
                                <MUITextField
                                    {...params}
                                    variant="outlined"
                                    name="gender"
                                    label={t('gender.label')}
                                    InputLabelProps={{shrink: true}}
                                    helperText={errors['gender']}
                                    error={touched['gender'] && !!errors['gender']}
                                />
                            )}
                        />
                    </Grid>
                </Grid>}
                <Grid item container xs={12} spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Field name="race" label={t('race')} fullWidth InputLabelProps={{shrink: true}}
                               variant="outlined" component={TextField}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Field name='district'
                               open={openDistrict}
                               options={districts}
                               component={UCMAutocomplete}
                               loading={loadingDistricts}
                               onOpen={() => setOpenDistrict(true)}
                               onClose={() => setOpenDistrict(false)}
                               getOptionLabel={(option: INomenclature) => option.name || ''}
                               textFieldProps={{label: t('district')}}
                               onInputChange={(event: React.SyntheticEvent, newInputValue) => {
                                   setInputValueDistrict(newInputValue);
                               }}
                               isOptionEqualToValue={(option: INomenclature, value: INomenclature) => option.id === value.id}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Field name='specialty'
                               open={openSpecialty}
                               options={specialties}
                               component={UCMAutocomplete}
                               loading={loadingSpecialties}
                               onOpen={() => setOpenSpecialty(true)}
                               onClose={() => setOpenSpecialty(false)}
                               getOptionLabel={(option: INomenclature) => option.name || ''}
                               textFieldProps={{label: t('specialty')}}
                               onInputChange={(event: React.SyntheticEvent, newInputValue) => {
                                   setInputValueSpecialty(newInputValue);
                               }}
                               isOptionEqualToValue={(option: INomenclature, value: INomenclature) => option.id === value.id}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </LocalizationProvider>
    )
})

export default PersonalStep
