import React from "react";
import * as yup from 'yup';
import {Autocomplete, TextField} from 'formik-mui'
import {Field, Form, Formik} from "formik";
import {useTranslation} from "react-i18next";
import {IRootState} from "../../../shared/reducer";
import Widget from "../../../shared/layout/widget";
import {useDispatch, useSelector} from "react-redux";
import {AutocompleteRenderInputParams, Button, CircularProgress, TextField as MUITextField} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import {defaultValue, DISCRIMINATOR, INomenclature} from "../../../shared/models/nomenclature.model";
import {createNomenclature, getNomenclature, reset, updateNomenclature} from "./nomenclature.reducer";
import Grid from "@mui/material/Grid";

const NomenclatureManage = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let {id} = useParams<{ id: string }>();
    const [isNew] = React.useState(!id);
    const {t} = useTranslation(['nomenclature']);
    const entity = useSelector((states: IRootState) => states.nomenclature.entity);
    const updating = useSelector((states: IRootState) => states.nomenclature.updating);
    const updateSuccess = useSelector((states: IRootState) => states.nomenclature.updateSuccess);

    const discriminators = [
        DISCRIMINATOR.CHARGE,
        DISCRIMINATOR.CATEGORY,
        DISCRIMINATOR.TEACHING_CATEGORY,
        DISCRIMINATOR.DISTRICT,
        DISCRIMINATOR.STUDY_CENTER,
        DISCRIMINATOR.SPECIALTY,
        DISCRIMINATOR.SCIENTIFIC_DEGREE,
        DISCRIMINATOR.PROFESSION,
        DISCRIMINATOR.KIND
    ]

    React.useEffect(() => {
        if (undefined === id) { // id undefined, then action is Create, otherwise Update
            dispatch(reset())
        } else {
            dispatch(getNomenclature(id))
        }
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (updateSuccess) {
            navigate(-1); // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [updateSuccess]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Widget title={t('title.manage')} disableWidgetMenu>
            <Formik
                initialValues={isNew ? defaultValue : entity}
                enableReinitialize={!isNew}
                onSubmit={async (values: INomenclature, {setFieldValue}) => {
                    if (isNew) {
                        return dispatch(createNomenclature(values))
                    } else {
                        setFieldValue("discriminator", entity.discriminator)
                        return dispatch(updateNomenclature(values))
                    }
                }}
                validationSchema={yup.object().shape({
                    name: yup.string().required(t("error:form.required")),
                    description: yup.string().max(255, t("error:form.maxlength", {max: 255}))
                })}
            >
                {({submitForm, errors, touched}) => (
                    <Form autoComplete="off" noValidate={true}>
                        <Grid container spacing={2}>
                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        InputLabelProps={{shrink: true}}
                                        component={TextField}
                                        fullWidth
                                        variant="outlined"
                                        name={"name"}
                                        label={t("name")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        fullWidth
                                        disabled={!isNew}
                                        disableClearable
                                        name="discriminator"
                                        options={discriminators}
                                        component={Autocomplete}
                                        isOptionEqualToValue={(option, value) => option === value}
                                        renderInput={(params: AutocompleteRenderInputParams) => (
                                            <MUITextField
                                                {...params}
                                                variant="outlined"
                                                name="discriminator"
                                                label={t('discriminator')}
                                                InputLabelProps={{shrink: true}}
                                                helperText={errors['discriminator']}
                                                error={touched['discriminator'] && !!errors['discriminator']}
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
                                        to='/dashboard/nomenclature'
                                        disabled={updating}
                                        startIcon={<CancelIcon/>}
                                    >
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
    )
}

export default NomenclatureManage;