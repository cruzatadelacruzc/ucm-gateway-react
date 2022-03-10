import React from 'react';
import {detailsStyles} from "../../style";
import {useTranslation} from "react-i18next";
import {deleteStudent} from './student.reducer'
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../../shared/reducer";
import {Link, useParams} from "react-router-dom";
import Widget from "../../../../shared/layout/widget";
import {Box, Button, Chip, CircularProgress, Divider, FormControl, FormLabel, Grid} from "@mui/material";
import PersonDetails from "../person-details";
import DialogDelete from "../../../../shared/components/dialog-delete";

const StudentDetails = () => {
    // let history = useHistory();
    const dispatch = useDispatch();
    const classes = detailsStyles();
    let {id} = useParams<{ id: string }>();
    const {t} = useTranslation(['student']);
    const [modalOpen, setModalOpen] = React.useState(false);
    const _entity = useSelector((states: IRootState) => states.student.entity);
    const updating = useSelector((states: IRootState) => states.student.updating);
    const isUpdateSuccess = useSelector((states: IRootState) => states.student.updateSuccess);

    // React.useEffect(() => {
    //     dispatch(getStudent(id))
    // }, [id]) // eslint-disable-line react-hooks/exhaustive-deps
    //
    // React.useEffect(() => {
    //     if (isUpdateSuccess) {
    //         history.push('/student');
    //     }
    // }, [isUpdateSuccess, history])

    return (
        <Widget disableWidgetMenu>
            <Box className={classes.root}>
                <Box className={classes.wrapDivider}>
                    <Divider className={classes.order1}/>
                    <Chip variant='outlined' label={t("person:step")} className={classes.order2}/>
                    <Divider className={classes.order3}/>
                </Box>

                <PersonDetails {..._entity} />

                <Box className={classes.wrapDivider}>
                    <Divider className={classes.order1}/>
                    <Chip variant='outlined' label={t("title.step")} className={classes.order2}/>
                    <Divider className={classes.order3}/>
                </Box>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={{xs: 2, md: 1}}>
                        <Grid item container xs={12}>
                            <Grid item xs={12} sm={4}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("universityYear")}</FormLabel>
                                    {_entity.universityYear}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("residence")}</FormLabel>
                                    {_entity.residence}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("studyCenter")}</FormLabel>
                                    {_entity.studyCenterName}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={12} sm={4}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("kind")}</FormLabel>
                                    {_entity.kindName}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{t("classRoom")}</FormLabel>
                                    {_entity.classRoom}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                component={Link}
                                variant="contained"
                                to={'/student'}
                                className={classes.button}>
                                {t('common:close')}
                            </Button>
                            <Button
                                component={Link}
                                color="success"
                                variant="contained"
                                className={classes.button}
                                to={`/student/edit/${id}`}>
                                {t('common:edit')}
                            </Button>
                            <Button
                                color="error"
                                variant="contained"
                                className={classes.button}
                                onClick={() => setModalOpen(true)}
                                disabled={updating}
                                endIcon={updating ? <CircularProgress size="1rem"/> : null}
                            >
                                {t('common:delete')}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <DialogDelete
                    open={modalOpen}
                    setOpen={setModalOpen}
                    title={t("delete.title")}
                    deleteItem={() => dispatch(deleteStudent(id))}
                    content={t("delete.question", {param: _entity.name})}
                />
            </Box>
        </Widget>
    );
};

export default StudentDetails;