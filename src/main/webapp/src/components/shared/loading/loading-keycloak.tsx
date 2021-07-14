import { Backdrop, CircularProgress } from '@material-ui/core';
import { KCLoadingStyles } from './style';

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
