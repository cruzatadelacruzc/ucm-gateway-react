import Paper from '@mui/material/Paper';
import {AvatarGroup, Card, CardActionArea, CardMedia, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import React from "react";
import {ISearchResultWorkPlaceHit} from "../../shared/models/search-result-workplace.model";
import {buildAvatarURL} from "../../shared/util/function-utils";
import {CONFIG} from "../../../config/constants";
import {useTheme} from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Grid from "@mui/material/Grid";

export default function CardWorkPlace(props: ISearchResultWorkPlaceHit) {
    const {t} = useTranslation(['workplace']);
    const theme = useTheme();

    const getAvatarUrl = (): string => {
        if (props._source.avatarUrl) {
            return buildAvatarURL(props._source.avatarUrl)
        }
        return `${CONFIG.DEFAULT_PATH}/workplace.svg`
    }
    const getEmployeeAvatarUrl = (avatar: string | null): string => {
        if (avatar) {
            return buildAvatarURL(avatar)
        }
        return 'broken.jpg';
    }
    return (
        <Paper elevation={8} sx={{p: 2, borderTop: `3px solid ${theme.palette.primary.main}`, flexGrow: 1}}>
            <Grid container spacing={{xs: 2, sm: 0}}>
                <Grid item>
                    <Card sx={{maxWidth: 255, maxHeight: 255}}>
                        <CardActionArea>
                            <CardMedia
                                style={{padding: 5, height: 250, width: 250}}
                                component="img"
                                image={getAvatarUrl()}
                            />
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid container item md={9} xs={12} sm rowSpacing={{xs: 1, md: 0}}>
                    <Grid item container md={6}>
                        <Grid item xs={12}>
                            <Typography component="div" color="text.secondary"
                                        variant="h4">{t('name', {count: props._source.name.split(' ').length})}</Typography>
                            <Typography
                                variant="h5">{props._source.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color="text.secondary"
                                        variant="h4">{t('email')}</Typography>
                            <Typography variant="h5">{props._source.email}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container md={6}>
                        <Grid item xs={12} mb={{xs: 1, md: 0}}>
                            <Typography color="text.secondary"
                                        variant="h4">{t('members')}</Typography>
                            <AvatarGroup max={10} sx={{justifyContent: 'flex-end'}}>
                                {props._source.employees?.map((employee) => (
                                    <Avatar key={employee.id}
                                            alt={`${employee.name} ${employee.firstLastName} ${employee.secondLastName}`}
                                            src={getEmployeeAvatarUrl(employee.avatarUrl)}
                                    />
                                ))}
                            </AvatarGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color="text.secondary"
                                        variant="h4">{t('phones')}</Typography>
                            {props._source.phones?.map((phone, index) => (
                                <Chip variant="outlined" color="info" size="small" icon={<LocalPhoneIcon/>}
                                      label={phone.number}/>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid xs={12} item>
                        <Typography component="div" color="text.secondary" variant="h4">{t('description')}</Typography>
                        <Typography variant="body2" paragraph>{props._source.description}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
