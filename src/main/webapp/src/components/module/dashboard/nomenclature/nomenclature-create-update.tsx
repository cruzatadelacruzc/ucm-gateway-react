import React from "react";
import * as yup from 'yup';
import {formUpdateStyles, MenuProps} from "../style";
import {TextField} from 'formik-material-ui'
import {Field, Form, Formik} from "formik";
import {useTranslation} from "react-i18next";
import {IRootState} from "../../../shared/reducer";
import Widget from "../../../shared/layout/widget";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, CircularProgress, MenuItem} from "@material-ui/core";
import {Link, useHistory, useParams} from 'react-router-dom'
import {defaultValue, DISCRIMINATOR, INomenclature} from "../../../shared/models/nomenclature.model";
import {createNomenclature, getNomenclature, updateNomenclature} from "./nomenclature.reducer";

const NomenclatureManage = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const classes = formUpdateStyles();
    let {id} = useParams<{id: string}>();
    const [isNew] = React.useState(!id);
    const {t} = useTranslation(['nomenclature']);
    const entity = useSelector((states: IRootState) => states.nomenclature.entity);
    const updating = useSelector((states: IRootState) => states.nomenclature.updating);
    const updateSuccess = useSelector((states: IRootState) => states.nomenclature.updateSuccess);

    React.useEffect(() => {
        if (!isNew) {
            dispatch(getNomenclature(id))
        }
    }, [isNew, id]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (updateSuccess) {
            history.push('/nomenclature');
        }
    }, [updateSuccess]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Widget title={t('title.manage')} disableWidgetMenu>
            <Formik
                initialValues={isNew ? defaultValue : entity}
                enableReinitialize={!isNew}
                onSubmit={(values: INomenclature, {setSubmitting, setFieldValue}) => {
                    if (isNew) {
                        dispatch(createNomenclature(values))
                    } else {
                        dispatch(updateNomenclature(values))
                    }
                    if (!updating && !updateSuccess) {
                        setSubmitting(false);
                        setFieldValue("name", "");
                    }
                }}
                validationSchema={yup.object().shape({
                    name: yup.string().required(t("error:form.required")),
                    description: yup.string().max(255, t("error:form.maxlength", {max: 255}))
                })}
            >
                {({submitForm, handleChange}) => (
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
                            {isNew && <Box className={classes.input}>
                                <Field
                                    select
                                    fullWidth
                                    variant="outlined"
                                    name="discriminator"
                                    component={TextField}
                                    SelectProps={MenuProps}
                                    InputLabelProps={{shrink: true}}
                                    label={t('discriminator')}
                                >
                                    <MenuItem value={DISCRIMINATOR.CHARGE}>{t("charge")}</MenuItem>
                                    <MenuItem value={DISCRIMINATOR.CATEGORY}>{t("category")}</MenuItem>
                                    <MenuItem
                                        value={DISCRIMINATOR.TEACHING_CATEGORY}>{t("teaching_category")}</MenuItem>
                                    <MenuItem value={DISCRIMINATOR.STUDY_CENTER}>{t("study_center")}</MenuItem>
                                    <MenuItem value={DISCRIMINATOR.DISTRICT}>{t("district")}</MenuItem>
                                    <MenuItem value={DISCRIMINATOR.SPECIALTY}>{t("specialty")}</MenuItem>
                                    <MenuItem
                                        value={DISCRIMINATOR.SCIENTIFIC_DEGREE}>{t("scientific_degree")}</MenuItem>
                                    <MenuItem value={DISCRIMINATOR.PROFESSION}>{t("profession")}</MenuItem>
                                    <MenuItem value={DISCRIMINATOR.KIND}>{t("kind")}</MenuItem>
                                </Field>
                              </Box>
                            }
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
                                color="secondary"
                                variant="contained"
                                component={Link}
                                to='/nomenclature'
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
    )
}

export default NomenclatureManage;