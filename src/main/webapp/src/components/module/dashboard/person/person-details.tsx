import React from 'react'
import dayjs from "dayjs";
import {detailsStyles} from "../style";
import {useTranslation} from "react-i18next";
import {IPerson} from "../../../shared/models/person.model";
import {Box, Card, CardActionArea, CardMedia, FormControl, FormLabel} from "@material-ui/core";
import {buildAvatarURL} from "../../../shared/util/function-utils";

export default function PersonDetails(_entity: IPerson) {
    const {t} = useTranslation(['person']);
    const classes = detailsStyles();
    const getAvatarUrl = (): string => {
        if (_entity.avatarUrl) {
            return buildAvatarURL(_entity.avatarUrl)
        } else {
        return  "../../user.svg"
        }
    }

    return (
        <>
            <Box className={classes.data_row}>
                <Box className={classes.data_column}>
                    <Box className={classes.data_cell}>
                        <Card className={classes.cover}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    style={{padding:5, height: 250}}
                                    image={getAvatarUrl()}
                                    alt={`${_entity.name} ${_entity.firstLastName} ${_entity.secondLastName}`}
                                 />
                            </CardActionArea>
                        </Card>
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
                <Box className={classes.data_cell}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{`${t("race")} & ${t("gender.label")}`}</FormLabel>
                        {`${_entity.race} | ${_entity.gender}`}
                    </FormControl>
                </Box>
                <Box className={classes.data_cell}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{t("birthdate")}</FormLabel>
                        {`${dayjs(_entity.birthdate).format(t('common:date_format'))} | 
                           ${dayjs().diff(_entity.birthdate,"year")} ${t("age")}`}
                    </FormControl>
                </Box>
                <Box className={classes.data_cell}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{t("district")}</FormLabel>
                        {_entity.districtName}
                    </FormControl>
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