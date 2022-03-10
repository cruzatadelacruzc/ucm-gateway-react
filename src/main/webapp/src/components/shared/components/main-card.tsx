import React from 'react';
import {SxProps} from '@mui/system';
import {Card, CardContent, CardHeader, CardProps, Divider, Theme, useTheme} from "@mui/material";

interface IMainCard extends  React.PropsWithChildren<CardProps>{
    border?,
    boxShadow?,
    children: React.ReactNode,
    content?,
    shadow?: string,
    contentClass?: string,
    _title?:  string| React.ReactNode| {},
    _secondary?:  string| React.ReactNode| {},
    sx?: SxProps<Theme>,
    contentSX?: SxProps<Theme>
}

const MainCard = React.forwardRef<HTMLDivElement,IMainCard>( ({
                                                                  border,
                                                                  children,
                                                                  sx,
                                                                  _title,
                                                                  _secondary,
                                                                  content,
                                                                  boxShadow,
                                                                  shadow,
                                                                  contentClass,
                                                                  contentSX,
                                                                  ...props
                                                              }, ref)=> {
    const theme = useTheme();
    return (
        <Card
            {...props}
        ref={ref}
            sx={{
            border: border ? '1px solid' : 'none',
            borderColor: theme.palette.primary[200] + 75,
            ':hover': {
              boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
            },
            ...sx
        }}>
            {/* card header and action */}
            {_title && <CardHeader sx={{'& .MuiCardHeader-action': { mr: 0 }}} title={_title} action={_secondary}/>}

            {/* content & header divider */}
            {_title && <Divider />}

            {/* card content */}
            {content && <CardContent sx={contentSX} className={contentClass}>{children}</CardContent>}
            {!content && children}
        </Card>
    );
});

export default MainCard;