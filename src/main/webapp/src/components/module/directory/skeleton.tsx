import React from 'react';
import {Grid, Skeleton, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/styles";

const DisplaySkeleton = () => {
    const theme = useTheme();
    const isFullScreen = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <Grid xs={12} item container spacing={1}>
            <Grid item xs={12} sm={3}>
                <Skeleton variant="rectangular" animation="wave" height={230}
                          sx={{bgcolor: "grey.300"}}/>
            </Grid>
            <Grid item xs={12} sm={9} container alignItems="center">
                <Grid item xs={12} container spacing={2} direction={{xs: "column", sm: "row"}}>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" height={25} variant="rectangular" sx={{bgcolor: "grey.300"}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" height={25} variant="rectangular" sx={{bgcolor: "grey.300"}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" height={25} variant="rectangular" sx={{bgcolor: "grey.300"}}/>
                    </Grid>
                </Grid>
                {isFullScreen && <Grid item xs={12} container spacing={2}>
                    <Grid item xs={3}>
                        <Skeleton variant="rectangular" height={25} animation="wave"
                                  sx={{bgcolor: "grey.300"}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="rectangular" animation="wave" height={25}
                                  sx={{bgcolor: "grey.300"}}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton variant="rectangular" animation="wave" height={25}
                                  sx={{bgcolor: "grey.300"}}/>
                    </Grid>
                </Grid>}
                {isFullScreen && <Grid item xs={12} container spacing={1}>
                    <Grid item xs={3}>
                        <Skeleton variant="rectangular" animation="wave" height={25} sx={{bgcolor: "grey.300"}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton animation="wave" variant="rectangular" height={25} sx={{bgcolor: "grey.300"}}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton animation="wave" variant="rectangular" height={25} sx={{bgcolor: "grey.300"}}/>
                    </Grid>
                </Grid>}
            </Grid>
        </Grid>
    );
};

export default DisplaySkeleton;