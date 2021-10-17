import React from "react";
import {Link} from "react-router-dom";
import {formStepperStyles} from "./style";
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import {FormikHelpers} from "formik/dist/types";
import {Form, Formik, FormikConfig, FormikValues} from "formik";
import {Box, CircularProgress, Step, StepLabel, Stepper} from "@material-ui/core";


interface IFormStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    label: string,
    onSubmit?: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<any>;
}

export const FormStep = ({children}: IFormStepProps) => <>{children}</>

interface IFormStepperProps extends FormikConfig<FormikValues> {
    cancelRoute: string
}

const FormStepper = ({children, ...props}: IFormStepperProps) => {
    const classes = formStepperStyles();
    const {t} = useTranslation(['common']);
    const [step, setStep] = React.useState(0);
    const childrenArray = React.Children.toArray(children) as Array<React.ReactElement<IFormStepProps>>;
    const currentChild = childrenArray[step];
    const isLastStep = step === childrenArray.length - 1;
    const [completed, setCompleted] = React.useState(false);
    return <Formik
        {...props}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values, action) => {
            if (currentChild.props.onSubmit && !isLastStep) {
                await currentChild.props.onSubmit(values, action)
            }
            if (isLastStep) {
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
        {({isSubmitting}) => (
            <Form autoComplete="off" noValidate={true}>
                    <Stepper activeStep={step}>
                        {childrenArray.map((child, index) => (
                            <Step key={child.props.label} completed={step > index || completed}>
                                <StepLabel>{child.props.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                {currentChild}

                <Box className={classes.buttons}>
                    {<Button className={classes.button} component={Link} to={props.cancelRoute}
                             disabled={isSubmitting} color="default" variant="contained">
                        {t('cancel')}
                    </Button>}

                    {step > 0 && <Button className={classes.button} color="secondary" variant="contained"
                                         onClick={() => setStep(prevStep => prevStep - 1)} disabled={isSubmitting}>
                        {t('back')}
                    </Button>}
                    {<Button className={classes.button} type="submit" disabled={isSubmitting}
                             endIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                             color="primary" variant="contained">
                        {isLastStep ? t('submit') : t('forward')}
                    </Button>}
                </Box>
            </Form>
        )}
    </Formik>
}

export default FormStepper