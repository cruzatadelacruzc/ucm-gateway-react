import React from 'react';
import {
    Autocomplete,
    AutocompleteInputChangeReason,
    AutocompleteProps,
    AutocompleteRenderInputParams,
    CircularProgress,
    TextField,
    TextFieldProps
} from "@mui/material";
import {FieldProps} from "formik";
import {fieldToTextField} from "formik-mui";
import {useTranslation} from "react-i18next";

export interface IUCMAutocompleteProps<V extends any = any, FormValues extends any = any>
    extends FieldProps<V, FormValues>,
        AutocompleteProps<V, undefined, undefined, undefined> {
    textFieldProps: TextFieldProps
}

const AnyAutocomplete = Autocomplete as any;
const noOp = () => {
};

const UCMAutocomplete = <V extends any = any, FormValues extends any = any>({
                                                                                loading,
                                                                                textFieldProps,
                                                                                ...props
                                                                            }: IUCMAutocompleteProps<V, FormValues>) => {
    const {
        form: {setTouched, setFieldValue, touched},
    } = props;
    const {error, helperText, ...field} = fieldToTextField(props as any);
    const {name} = field;
    const {t} = useTranslation(['common']);
    const onInputChangeDefault = props.onInputChange ?? noOp;
    const onInputChange = !props.freeSolo
        ? props.onInputChange
        : (event: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
            setFieldValue(name!, value);
            onInputChangeDefault(event, value, reason);
        };

    return (
        <AnyAutocomplete
            {...props}
            {...field}
            filterOptions={(x) => x}
            loading={loading}
            loadingText={t('loading')}
            noOptionsText={t('no_option')}
            onChange={(_, value) => setFieldValue(name!, value)}
            onInputChange={onInputChange}
            onBlur={() => setTouched({...touched, [name!]: true})}
            renderInput={(props: AutocompleteRenderInputParams) =>
                <TextField
                    {...props}
                    {...textFieldProps}
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    helperText={helperText} error={error}
                    InputProps={{
                        ...props.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ?
                                    <CircularProgress color="inherit" size={20}/> : null}
                                {props.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />}
        />
    );
};

export default UCMAutocomplete;
