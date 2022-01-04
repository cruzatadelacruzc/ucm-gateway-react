import React from "react";
import {createStyles, makeStyles, Theme, useScrollTrigger, useTheme, Zoom} from "@material-ui/core";

export type IScrollTopProps = {
  children: React.ReactElement;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

export default function ScrollTop(props: IScrollTopProps) {
  const { children } = props;
  const theme = useTheme<Theme>();
  const classes = useStyles(theme);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}
