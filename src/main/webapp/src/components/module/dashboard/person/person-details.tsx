import React from 'react'
import dayjs from "dayjs";
import {detailsStyles} from "../style";
import {useTranslation} from "react-i18next";
import {IPerson} from "../../../shared/models/person.model";
import {Box, FormControl, FormLabel, Paper} from "@material-ui/core";

export default function PersonDetails(_entity: IPerson) {
    const {t} = useTranslation(['person']);
    const classes = detailsStyles();
    return (
        <>
            <Box className={classes.data_row}>
                <Box className={classes.data_column} style={{flex: '0.2 0.2 auto'}}>
                    <Box className={classes.data_cell} style={{alignSelf: 'center'}}>
                        <Paper className={classes.cover}>
                            <img alt={`${_entity.name} ${_entity.firstLastName} ${_entity.secondLastName}`}
                                 src={_entity.avatarUrl || "../../user.svg"} style={{width: 200}}/>
                        </Paper>
                    </Box>
                </Box>
                <Box className={classes.data_column}>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("ci")}</FormLabel>
                            {_entity.ci}
                        </FormControl>
                    </Box>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("email")}</FormLabel>
                            {_entity.email}
                        </FormControl>
                    </Box>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("specialty")}</FormLabel>
                            {_entity.specialtyName}
                        </FormControl>
                    </Box>
                </Box>
                <Box className={classes.data_column}>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("name")}</FormLabel>
                            {_entity.name}
                        </FormControl>
                    </Box>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("firstLastName")}</FormLabel>
                            {_entity.firstLastName}
                        </FormControl>
                    </Box>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("secondLastName")}</FormLabel>
                            {_entity.secondLastName}
                        </FormControl>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.data_row}>
                <Box className={classes.data_column}>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("gender.label")}</FormLabel>
                            {_entity.gender}
                        </FormControl>
                    </Box>
                </Box>
                <Box className={classes.data_column}>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("birthdate")}</FormLabel>
                            {`${dayjs(_entity.birthdate).format(t('common:date_format'))} | ${_entity.age} ${t("age")}`}
                        </FormControl>
                    </Box>
                </Box>
                <Box className={classes.data_column}>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("district")}</FormLabel>
                            {_entity.districtName}
                        </FormControl>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.data_row}>
                <Box className={classes.data_column}>
                    <Box className={classes.data_cell}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("address")}</FormLabel>
                            {_entity.address}
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </>
    )
}