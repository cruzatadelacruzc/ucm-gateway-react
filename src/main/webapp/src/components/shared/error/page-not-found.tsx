import React from 'react'
import {useTranslation} from "react-i18next";
import {Typography} from "@material-ui/core";

export default function PageNotFound() {
    const {t} = useTranslation(['common']);
        return (
          <div>
              <Typography variant="h6">{t("notfound_page")}</Typography>
              <Typography variant="subtitle2">{t("notfound_exp_page")}</Typography>
          </div>
        );      
}
