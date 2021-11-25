import React from 'react';
import {detailsStyles} from "../../style";
import {useTranslation} from "react-i18next";
import {deleteStudent, getStudent} from './student.reducer'
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../../shared/reducer";
import {Link, useHistory, useParams} from "react-router-dom";
import Widget from "../../../../shared/layout/widget";
import {Box, Button, Chip, CircularProgress, Divider, FormControl, FormLabel} from "@material-ui/core";
import PersonDetails from "../person-details";

const StudentDetails = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const classes = detailsStyles();
    let {id} = useParams<{ id: string }>();
    const {t} = useTranslation(['student']);
    const _entity = useSelector((states: IRootState) => states.student.entity);
    const updating = useSelector((states: IRootState) => states.student.updating);
    const isUpdateSuccess = useSelector((states: IRootState) => states.student.updateSuccess);

    React.useEffect(() => {
        dispatch(getStudent(id))
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
            history.push('/student');
        }
    }, [isUpdateSuccess, history])

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

                <Box className={classes.data_row}>
                    <Box className={classes.data_column}>
                        <Box className={classes.data_cell}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">{t("residence")}</FormLabel>
                                {_entity.residence}
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className={classes.data_column}>
                        <Box className={classes.data_cell}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">{t("classRoom")}</FormLabel>
                                {_entity.classRoom}
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className={classes.data_column}>
                        <Box className={classes.data_cell}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">{t("universityYear")}</FormLabel>
                                {_entity.universityYear}
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.data_row}>
                    <Box className={classes.data_column}>
                        <Box className={classes.data_cell}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">{t("kind")}</FormLabel>
                                {_entity.kindName}
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className={classes.data_column}>
                        <Box className={classes.data_cell}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">{t("studyCenter")}</FormLabel>
                                {_entity.studyCenterName}
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.buttons}>
                    <Button
                        component={Link}
                        color="default"
                        variant="contained"
                        to={'/student'}
                        className={classes.button}>
                        {t('common:cancel')}
                    </Button>
                    <Button
                        component={Link}
                        color="secondary"
                        variant="contained"
                        className={classes.button}
                        to={`/student/edit/${id}`}>
                        {t('common:edit')}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        className={classes.button}
                        onClick={() => dispatch(deleteStudent(id))}
                        disabled={updating}
                        endIcon={updating ? <CircularProgress size="1rem"/> : null}
                    >
                        {t('common:delete')}
                    </Button>
                </Box>
            </Box>
        </Widget>
    );
};

export default StudentDetails;