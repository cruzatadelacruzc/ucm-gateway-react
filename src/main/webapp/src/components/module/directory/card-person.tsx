import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import {
    Badge,
    Box,
    Card,
    CardActionArea,
    CardMedia,
    Collapse,
    IconButton,
    IconButtonProps,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import {ISearchResultPersonHit} from '../../shared/models/search-result-person.model';
import {useTranslation} from 'react-i18next';
import {buildAvatarURL} from "../../shared/util/function-utils";
import React from "react";
import {CONFIG} from "../../../config/constants";
import {useTheme} from "@mui/styles";
import {styled} from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Item = styled("div")(({theme}) => ({
    marginBottom: theme.spacing(2)
}))

const StyledBox = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}))

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...others} = props;
    return <IconButton {...others} />
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
    })
}))


const cardPerson = React.forwardRef<HTMLDivElement, ISearchResultPersonHit>((props, ref) => {
    const theme = useTheme();
    const {t} = useTranslation(['person']);
    const isFullScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const [expanded, setExpanded] = React.useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }
    const getAvatarUrl = (): string => {
        if (props._source.avatarUrl) {
            return buildAvatarURL(props._source.avatarUrl)
        } else {
            return `${CONFIG.DEFAULT_PATH}/user.svg`
        }
    }

    const PersonExpansion = () => {
        return (<>
                <StyledBox>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('gender.label')}</Typography>
                        <Typography variant="h5">{props._source.gender}</Typography>
                    </Item>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('race')}</Typography>
                        <Typography variant="h5">{props._source.race}</Typography>
                    </Item>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('birthdate')}</Typography>
                        <Typography
                            variant="h5">{dayjs(props._source.birthdate).format(t('card:date_format'))}</Typography>
                    </Item>
                </StyledBox>
                <StyledBox>
                    {isFullScreen && <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('email')}</Typography>
                        <Typography variant="h5">{props._source.email}</Typography>
                    </Item>}
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('specialty')}</Typography>
                        <Typography variant="h5">{props._source.specialty}</Typography>
                    </Item>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('district')}</Typography>
                        <Typography variant="h5">{props._source.district}</Typography>
                    </Item>
                </StyledBox>
            </>
        )
    }

    const EmployeeExpansion = () => {
        return (
            <Stack direction={{xs: "column", sm: "row"}} justifyContent="space-evenly" spacing={{xs: 2, sm: 0}}>
                <StyledBox>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('employee:profession')}</Typography>
                        <Typography variant="h5">{props._source.profession}</Typography>
                    </Item>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('employee:charge')}</Typography>
                        <Typography
                            variant="h5">{props._source.charge}</Typography>
                    </Item>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('employee:category')}</Typography>
                        <Typography variant="h5">{props._source.category}</Typography>
                    </Item>
                </StyledBox>
                <StyledBox>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('employee:professionalNumber')}</Typography>
                        <Typography
                            variant="h5">{props._source.professionalNumber}</Typography>
                    </Item>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('employee:registerNumber')}</Typography>
                        <Typography variant="h5">{props._source.registerNumber}</Typography>
                    </Item>
                </StyledBox>
                <StyledBox>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('employee:workPlace')}</Typography>
                        <Typography variant="h5">{props._source.workPlace?.name}</Typography>
                    </Item>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('employee:bossWorkPlace')}</Typography>
                        <Typography variant="h5">{props._source.bossWorkPlace ? t("positive") : "NO"}</Typography>
                    </Item>
                </StyledBox>
            </Stack>
        )
    }

    const StudentExpansion = () => {
        return (
            <Stack direction={{xs: "column", sm: "row"}} justifyContent="space-evenly" spacing={{xs: 2, sm: 0}}>
                <StyledBox>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('student:classRoom')}</Typography>
                        <Typography variant="h5">{props._source.classRoom}</Typography>
                    </Item>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('student:residence')}</Typography>
                        <Typography variant="h5">{props._source.residence}</Typography>
                    </Item>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('student:universityYear')}</Typography>
                        <Typography
                            variant="h5">{props._source.universityYear}</Typography>
                    </Item>
                </StyledBox>
            </Stack>
        )
    }

    return (
        <Paper elevation={8} sx={{p: 2, borderTop: `5px solid ${theme.palette.primary.main}`}} ref={ref}>
            <Stack direction={{xs: "column", sm: "row"}} justifyContent="space-between" spacing={{xs: 2, sm: 0}}>
                <Box>
                    {props._type ? (
                        <Badge badgeContent={t(`card:${props._type}`)} color='secondary'>
                            <Card sx={{maxWidth: 255, maxHeight: 255}}>
                                <CardActionArea>
                                    <CardMedia
                                        style={{padding: 5, height: 250, width: 250}}
                                        component="img"
                                        image={getAvatarUrl()}
                                    />
                                </CardActionArea>
                            </Card>
                        </Badge>
                    ) : (
                        <img
                            alt={`${props._source.name} ${props._source.firstLastName} ${props._source.secondLastName}`}
                            src={getAvatarUrl()} style={{padding: 5, height: 250, width: 250}}/>
                    )}
                </Box>
                <StyledBox>
                    <Item>
                        <Typography component="div" color="text.secondary" variant="h4">{t('ci')}</Typography>
                        <Typography variant="h5">{props._source.ci}</Typography>
                    </Item>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('name', {count: props._source.name.split(' ').length})}</Typography>
                        <Typography variant="h5">{props._source.name}</Typography>
                    </Item>
                    <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('surname', {count: props._source.secondLastName.length > 0 ? 2 : 1})}</Typography>
                        <Typography
                            variant="h5">{`${props._source.firstLastName} ${props._source.secondLastName}`}</Typography>
                    </Item>
                    {!isFullScreen && <Item>
                        <Typography component="div" color="text.secondary"
                                    variant="h4">{t('email')}</Typography>
                        <Typography variant="h5">{props._source.email}</Typography>
                    </Item>}
                </StyledBox>
                {isFullScreen && <PersonExpansion/>}
            </Stack>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon fontSize="large" color="info"/>
                </ExpandMore>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {!isFullScreen && <PersonExpansion/>}
                {props._type === 'employees' ? <EmployeeExpansion/> : <StudentExpansion/>}
            </Collapse>
        </Paper>
    );
})

export default cardPerson
