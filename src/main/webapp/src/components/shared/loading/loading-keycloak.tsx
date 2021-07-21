import { Backdrop, CircularProgress } from '@material-ui/core';
import { KCLoadingStyles } from './style';
import React from "react";

export const LoadingKeycloak = (open: boolean) => {
  const classes = KCLoadingStyles();
  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color='primary' />
      </Backdrop>
    </>
  );
};
