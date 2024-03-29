import React from 'react';
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';

const SvgUser = (props : SvgIconProps) => {
return (
        <SvgIcon {...props} >
            <path  d="M 32.03,28.86 C 30.18,26.46 23.75,23.75 18.74,23.75 13.74,23.75 7.31,26.46 5.46,28.86 4.32,30.35
                    5.41,32.50 7.28,32.50 7.28,32.50 30.21,32.50 30.21,32.50 32.09,32.50 33.18,30.35 32.03,28.86 Z M
                    26.25,11.25 C 26.25,7.11 22.89,3.75 18.75,3.75 14.61,3.75 11.25,7.11 11.25,11.25 11.25,11.46
                    11.25,12.29 11.25,12.50 11.25,16.64 14.61,20.00 18.75,20.00 22.89,20.00 26.25,16.64 26.25,12.50
                    26.25,12.29 26.25,11.46 26.25,11.25 Z"
            />
        </SvgIcon>
    );
};

export const getDataURISchema = (): string => {
    const sgvPath = `M 32.03,28.86
           C 30.18,26.46 23.75,23.75 18.74,23.75
             13.74,23.75 7.31,26.46 5.46,28.86
             4.32,30.35 5.41,32.50 7.28,32.50
             7.28,32.50 30.21,32.50 30.21,32.50
             32.09,32.50 33.18,30.35 32.03,28.86 Z
           M 26.25,11.25
           C 26.25,7.11 22.89,3.75 18.75,3.75
             14.61,3.75 11.25,7.11 11.25,11.25
             11.25,11.46 11.25,12.29 11.25,12.50
             11.25,16.64 14.61,20.00 18.75,20.00
             22.89,20.00 26.25,16.64 26.25,12.50
             26.25,12.29 26.25,11.46 26.25,11.25 Z`
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" width="1em" height="1em"><path fill="rgb(0 100 176)" d="${encodeURIComponent(sgvPath)}"></path></svg>`;
}

export default SvgUser;