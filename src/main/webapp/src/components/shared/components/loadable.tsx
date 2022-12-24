import React, {Suspense} from 'react';

import {styled} from "@mui/material/styles";
import {LinearProgress} from "@mui/material";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const LoadWrapper = styled('div')({
    top: 0,
    left: 0,
    zIndex: 1301,
    width: '100%',
    position: 'fixed'
})
const Loadable = Component => props =>
    (
        <Suspense fallback={<LoadWrapper><LinearProgress color='primary' /></LoadWrapper>}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;