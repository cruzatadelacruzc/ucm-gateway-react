import React from "react";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";
import {FormikHelpers} from "formik/dist/types";
import {Form, Formik, FormikConfig, FormikValues} from "formik";
import {Box, CircularProgress, Step, StepLabel, Stepper} from "@mui/material";
import isEmpty from "lodash/isEmpty"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useTheme from "@mui/material/styles/useTheme";

interface IFormStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    label: string,
    operationKind?: "CREATE" | "UPDATE" | "DELETE"
    onSubmit?: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => Promise<any>;
}

export const FormStep = ({children}: IFormStepProps) => <>{children}</>

interface IFormStepperProps extends FormikConfig<FormikValues> {
    cancelRoute: string
}

const FormStepper = ({children, ...props}: IFormStepperProps) => {
    const theme = useTheme();
    const {t} = useTranslation(['common']);
    const [step, setStep] = React.useState(0);
    const childrenArray = React.Children.toArray(children) as Array<React.ReactElement<IFormStepProps>>;
    const currentChild = childrenArray[step];
    const isLastStep = step === childrenArray.length - 1;
    const [completed, setCompleted] = React.useState(false);
    const StyleButton = {
        marginRight: 3,
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            marginRight: theme.spacing(0),
            marginBottom: theme.spacing(1)
        }
    }
    const buttonSubmitName = () => {
        if (currentChild.props.operationKind && currentChild.props.operationKind === "UPDATE") {
            return t("save_finished")
        }
        if (currentChild.props.operationKind && currentChild.props.operationKind === "DELETE") {
            return t("delete")
        }
        return "No name";
    }

    const getTouchedFieldsFromObjectError = (errors: any) => {
        if (Array.isArray(errors)) {
            const touched: any = []
            errors.forEach((val: any) => {
                touched.push(getTouchedFieldsFromObjectError(val))
            })
            return touched
        }
        const touched: any = {}
        Object.keys(errors).forEach(key => {
            if (Array.isArray(errors[key])) {
                errors[key].forEach((val: any, index: any) => {
                    if (index === 0) touched[key] = []
                    const ret = getTouchedFieldsFromObjectError(val)
                    touched[key].push(ret)
                })
            } else if (typeof errors[key] !== 'string') {
                touched[key] = getTouchedFieldsFromObjectError(errors[key])
            } else {
                touched[key] = true
            }
        })
        return touched
    }
    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, action) => {
                if (currentChild.props.onSubmit && !isLastStep) {
                    await currentChild.props.onSubmit(values, action).then(() => setStep(prevStep => prevStep + 1))
                } else if (isLastStep) {
                    setCompleted(true)
                    return props.onSubmit(values, action)
                } else {
                    // The next line: action.setTouched({})
                    // If you have multiple fields on the same step
                    //  we will see they show the validation error all at the same time after the first step!
                    //
                    // If you want to keep that behaviour, then, comment the next line :)
                    // If you want the second/third/fourth/etc steps with the same behaviour
                    //    as the first step regarding validation errors, then the next line is for you! =)
                    action.setTouched({})

                    setStep(prevStep => prevStep + 1)
                }
            }}
        >
            {({isSubmitting, validateForm, setTouched, touched}) => (
                <Form autoComplete="off" noValidate={true}>
                    <Stepper activeStep={step} sx={{mb: 2}}>
                        {childrenArray.map((child, index) => (
                            <Step key={child.props.label} completed={step > index || completed}>
                                <StepLabel>{child.props.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {currentChild}

                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-start",
                        marginTop: 1,
                        marginBottom: 3,
                        [theme.breakpoints.down('sm')]: {
                            flexDirection: "column",
                        }
                    }}>
                        {<Button
                            sx={StyleButton}
                            component={Link}
                            to={`/dashboard${props.cancelRoute}`}
                            disabled={isSubmitting}
                            variant="contained"
                            color="secondary"
                            startIcon={<CancelIcon/>}
                        >
                            {currentChild.props.operationKind && currentChild.props.operationKind === "CREATE"
                                ? t('cancel') : t('close')}
                        </Button>}

                        {step > 0 &&
                        <Button
                            sx={{
                                marginRight: 3,
                                [theme.breakpoints.down('sm')]: {
                                    width: "100%",
                                    marginRight: theme.spacing(0),
                                    marginBottom: theme.spacing(1)
                                }
                            }}
                            color="secondary" variant="contained" startIcon={<KeyboardReturnIcon/>}
                            onClick={() => setStep(prevStep => prevStep - 1)} disabled={isSubmitting}>
                            {t('back')}
                        </Button>}
                        {(currentChild.props.operationKind && currentChild.props.operationKind === "CREATE" && !isLastStep) ||
                        <Button
                            sx={StyleButton}
                            type="submit" disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size="1rem"/> : isLastStep ? <SendIcon/> :
                                <SaveIcon/>}
                            color={isLastStep ? "primary" : "secondary"} variant="contained">
                            {isLastStep ? t('finish') : buttonSubmitName()}
                        </Button>}
                        {!isLastStep && currentChild.props.operationKind &&
                        <Button
                            sx={StyleButton}
                            color="primary"
                            variant="contained"
                            disabled={isSubmitting}
                            startIcon={<ArrowForwardIosIcon/>}
                            onClick={() => validateForm().then((errors) => {
                                if (isEmpty(errors)) {
                                    setStep(prevStep => prevStep + 1)
                                } else {
                                    setTouched(getTouchedFieldsFromObjectError(errors))
                                }
                            })}
                        >
                            {t('continue')}
                        </Button>}
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

export default FormStepper