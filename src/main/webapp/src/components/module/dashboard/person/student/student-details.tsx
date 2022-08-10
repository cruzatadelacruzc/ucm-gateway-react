import React from 'react';
import {useTranslation} from "react-i18next";
import {deleteStudent, getStudent} from './student.reducer'
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../../shared/reducer";
import {Link, useNavigate, useParams} from "react-router-dom";
import Widget from "../../../../shared/layout/widget";
import {Box, Button, Chip, CircularProgress, Divider, FormControl, FormLabel, Grid} from "@mui/material";
import PersonDetails from "../person-details";
import DialogDelete from "../../../../shared/components/dialog-delete";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";

const ChipStyled = styled(Chip)(() => ({
    order: 2,
    flex: '1 1 auto'
}))

const Divider1Styled = styled(Divider)(() => ({
    order: 1,
    flex: '1 1 auto'
}))

const Divider2Styled = styled(Divider)(() => ({
    order: 3,
    flex: '1 1 auto'
}))
const StudentDetails = () => {
    const theme = useTheme();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let {id} = useParams<{ id: string }>();
    const {t} = useTranslation(['student']);
    const [modalOpen, setModalOpen] = React.useState(false);
    const _entity = useSelector((states: IRootState) => states.student.entity);
    const updating = useSelector((states: IRootState) => states.student.updating);
    const isUpdateSuccess = useSelector((states: IRootState) => states.student.updateSuccess);

    React.useEffect(() => {
        if (undefined !== id){
            dispatch(getStudent(id))
        } else {
            navigate(-1); // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (isUpdateSuccess) {
            navigate(-1) // Pass the delta to go in the history stack, equivalent to hitting the back button.
        }
    }, [isUpdateSuccess]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Widget disableWidgetMenu>
            <Box sx={{
                width: '100%',
                ...theme.typography.body2,
                '& > :not(style) + :not(style)': {
                    marginTop: 2,
                    marginBottom: 2,
                }
            }}>
                <Box sx={{display: 'flex'}}>
                    <Divider1Styled/><ChipStyled variant='outlined' label={t("person:step")}/><Divider2Styled/>
                </Box>

                <PersonDetails {..._entity} />

                <Box sx={{display: 'flex'}}>
                    <Divider1Styled/><ChipStyled variant='outlined' label={t("title.step")}/><Divider2Styled/>
                </Box>
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
                        <Grid item container xs={12} spacing={{xs: 2, sm: 0}}>
                            <Grid item xs={12} sm={2}>
                            <Button
                                fullWidth
                                color="secondary"
                                component={Link}
                                variant="contained"
                                to={'/dashboard/student'}
                                startIcon={<CancelIcon/>}>
                                {t('common:close')}
                            </Button>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                            <Button
                                fullWidth
                                component={Link}
                                color="secondary"
                                variant="contained"
                                startIcon={<EditIcon/>}
                                to={`/dashboard/student/edit/${id}`}>
                                {t('common:edit')}
                            </Button>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => setModalOpen(true)}
                                disabled={updating}
                                startIcon={updating ? <CircularProgress size="1rem"/> : <DeleteIcon/>}
                            >
                                {t('common:delete')}
                            </Button>
                            </Grid>
                        </Grid>
                    </Grid>
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