import React from 'react';
import {styled} from "@mui/material/styles";
import {LinearProgress} from "@mui/material";

const LoadWrapper = styled('div')({
    top: 0,
    left: 0,
    zIndex: 1301,
    width: '100%',
    position: 'fixed'
})
const Loader = () => {
    return (
        <LoadWrapper>
            <LinearProgress color='primary' />
        </LoadWrapper>
    );
};

export default Loader;