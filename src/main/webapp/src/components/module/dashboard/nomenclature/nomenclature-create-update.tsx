import React from "react";
import * as yup from 'yup';
import {formUpdateStyles, MenuProps} from "../style";
import {TextField} from 'formik-material-ui'
import {Field, Form, Formik} from "formik";
import {useTranslation} from "react-i18next";
import {IRootState} from "../../../shared/reducer";
import Widget from "../../../shared/layout/widget";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, MenuItem} from "@material-ui/core";
import {Link, RouteComponentProps} from 'react-router-dom'
import {defaultValue, DISCRIMINATOR, INomenclature} from "../../../shared/models/nomenclature.model";
import {createNomenclature, getDistricts, getNomenclature, updateNomenclature} from "./nomenclature.reducer";


export interface INomenclatureManageProps extends RouteComponentProps<{ id: string }> {
}

const NomenclatureManage = (props: INomenclatureManageProps) => {
    const dispatch = useDispatch();
    const classes = formUpdateStyles();
    const {t} = useTranslation(['nomenclature']);
    const [open, setOpen] = React.useState(false);
    const [isNew] = React.useState(!props.match.params || !props.match.params.id);
    const [visibleParentDistrict, setVisibleParentDistrict] = React.useState(false);
    const {updating, entity, districts, updateSuccess, loading} = useSelector((states: IRootState) => states.nomenclature);

    const handleSelect = React.useCallback((handleChange) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === DISCRIMINATOR.DISTRICT) {
            setVisibleParentDistrict(true)
        } else {
            setVisibleParentDistrict(false)
        }
        handleChange(event);
    }, [])

    React.useEffect(() => {
        if (isNew) {
            setVisibleParentDistrict(false)
        } else {
            setVisibleParentDistrict(true)
            setOpen(true)
            dispatch(getNomenclature(props.match.params.id))
        }
    }, [dispatch, isNew, props.match.params.id])

    React.useEffect(() => {
        if (updateSuccess) {
            props.history.push('/nomenclature');
        }
    }, [updateSuccess, props.history])


    React.useEffect(() => {
        if (open){
            dispatch(getDistricts())
        }
    }, [open,dispatch])


    return (
        <Widget title={t('title.manage')} disableWidgetMenu>
            <Formik
                initialValues={isNew ? defaultValue : entity}
                enableReinitialize={!isNew}
                onSubmit={(values: INomenclature) => {
                    if (isNew) {
                        dispatch(createNomenclature(values))
                    } else {
                        dispatch(updateNomenclature(values))
                    }
                }}
                validationSchema={yup.object().shape({
                    name: yup.string().required(t("error:form.required")),
                    description: yup.string().max(255, t("error:form.maxlength", {max: 255}))
                })}
            >
                {({
                      submitForm, handleChange}) => (
                    <Form>
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
                                    select
                                    onChange={handleSelect(handleChange)}
                                    variant="outlined"
                                    name="discriminator"
                                    SelectProps={MenuProps}
                                    label={t('discriminator')}
                                >
                                    <MenuItem value={DISCRIMINATOR.CHARGE}>{t("charge")}</MenuItem>
                                    <MenuItem value={DISCRIMINATOR.CATEGORY}>{t("category")}</MenuItem>
                                    <MenuItem value={DISCRIMINATOR.TEACHING_CATEGORY}>{t("teaching_category")}</MenuItem>
                                    <MenuItem value={DISCRIMINATOR.STUDY_CENTER}>{t("study_center")}</MenuItem>
                                    <MenuItem value={DISCRIMINATOR.DISTRICT}>{t("district")}</MenuItem>
                                    <MenuItem value={DISCRIMINATOR.SPECIALTY}>{t("specialty")}</MenuItem>
                                    <MenuItem
                                        value={DISCRIMINATOR.SCIENTIFIC_DEGREE}>{t("scientific_degree")}</MenuItem>
                                    <MenuItem value={DISCRIMINATOR.PROFESSION}>{t("profession")}</MenuItem>
                                    <MenuItem value={DISCRIMINATOR.KIND}>{t("kind")}</MenuItem>
                                </Field>
                            </Box>
                            <Box className={classes.input} style={{display: visibleParentDistrict ? '' : 'none'}}>
                                <Field
                                    select
                                    fullWidth
                                    variant="outlined"
                                    component={TextField}
                                    name="parentDistrictId"
                                    SelectProps={{...MenuProps, onOpen: () => setOpen(true)}}
                                    label={t('parentDistrict')}
                                    InputLabelProps={{shrink: true}}
                                    disabled={!visibleParentDistrict}
                                >
                                    <MenuItem value=""><em>-- {loading ? t('common:loading'): t('common:empty')} --</em></MenuItem>
                                    {districts.map((option, index) => <MenuItem
                                            selected={!isNew && entity.parentDistrictId === option.id}
                                            key={index} value={option.id}>{option.name}</MenuItem>
                                    )}
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
                                color="primary"
                                variant="contained"
                                disabled={updating}
                                onClick={submitForm}>
                                {t('common:submit')}
                            </Button>
                            <Button
                                className={classes.button}
                                color="secondary"
                                variant="contained"
                                component={Link}
                                to='/nomenclature'
                                disabled={updating}>
                                {t('common:cancel')}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Widget>
    )
}

export default NomenclatureManage;