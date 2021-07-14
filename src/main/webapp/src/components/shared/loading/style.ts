import { Theme, makeStyles, createStyles } from '@material-ui/core';

export const KCLoadingStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);
