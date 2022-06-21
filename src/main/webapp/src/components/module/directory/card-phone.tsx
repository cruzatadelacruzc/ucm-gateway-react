import Paper from '@mui/material/Paper';
import {Card, CardActionArea, CardMedia, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import React from "react";
import {ISearchResultPhoneHit} from "../../shared/models/search-result-phone.model";
import {buildAvatarURL} from "../../shared/util/function-utils";
import {CONFIG} from "../../../config/constants";
import {useTheme} from "@mui/styles";
import Grid from "@mui/material/Grid";

const cardPhone = React.forwardRef<HTMLDivElement, ISearchResultPhoneHit>((props, ref) => {
    const theme = useTheme();
    const {t} = useTranslation(['phone']);

    const getAvatarUrl = (): string => {
        const avatar = props._source.employee?.avatarUrl || props._source.workPlace?.avatarUrl
        if (avatar) {
            return buildAvatarURL(avatar)
        }
        return `${CONFIG.DEFAULT_PATH}/phone.jpg`
    }
    return (
        <Paper elevation={8} sx={{p: 2, borderTop: `5px solid ${theme.palette.primary.main}`, flexGrow: 1}} ref={ref}>
            <Grid container spacing={{xs: 2, sm: 0}}>
                <Grid item xs={12} sm={4} md={3}>
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
                <Grid container item xs={12} sm={8} md={9} rowSpacing={{xs: 1, md: 0}}>
                    <Grid item xs={12} md={6}>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('number')}</Typography>
                        <Typography
                            variant="h5">{props._source.number}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('owner')}</Typography>
                        <Typography
                            variant="h5">{props._source.employee?.name || props._source.workPlace?.name}</Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <Typography component="div" color="text.secondary" variant="h4">{t('description')}</Typography>
                        <Typography variant="body2" paragraph>{props._source.description}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
});

export default cardPhone;
