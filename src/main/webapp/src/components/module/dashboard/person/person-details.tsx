import React from 'react'
import dayjs from "dayjs";
import {useTranslation} from "react-i18next";
import {IPerson} from "../../../shared/models/person.model";
import {Box, Card, CardActionArea, CardMedia, FormControl, FormLabel, Grid} from "@mui/material";
import {buildAvatarURL} from "../../../shared/util/function-utils";
import {CONFIG} from "../../../../config/constants";

export default function PersonDetails(_entity: IPerson) {
    const {t} = useTranslation(['person']);
    const getAvatarUrl = (): string => {
        if (_entity.avatarUrl) {
            return buildAvatarURL(_entity.avatarUrl)
        } else {
            return `${CONFIG.DEFAULT_PATH}/user.svg`
        }
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={{xs: 2, md: 1}}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{maxWidth: 255, maxHeight: 255}}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                sx={{ p:'5px', height: '250px' }}
                                image={getAvatarUrl()}
                                alt={`${_entity.name} ${_entity.firstLastName} ${_entity.secondLastName}`}
                            />
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid container item xs={12} sm={4} spacing={1}>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("ci")}</FormLabel>
                            {_entity.ci}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("email")}</FormLabel>
                            {_entity.email}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("specialty")}</FormLabel>
                            {_entity.specialtyName}
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={4} spacing={1}>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("name")}</FormLabel>
                            {_entity.name}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("firstLastName")}</FormLabel>
                            {_entity.firstLastName}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t("secondLastName")}</FormLabel>
                            {_entity.secondLastName}
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{`${t("race")} & ${t("gender.label")}`}</FormLabel>
                        {`${_entity.race} | ${_entity.gender}`}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{t("birthdate")}</FormLabel>
                        {`${dayjs(_entity.birthdate).format(t('common:date_format'))} | 
                           ${dayjs().diff(_entity.birthdate, "year")} ${t("age")}`}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{t("district")}</FormLabel>
                        {_entity.districtName}
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{t("address")}</FormLabel>
                        {_entity.address}
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    )
}