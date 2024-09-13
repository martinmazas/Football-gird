import { Button } from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper"
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


export default function MobileStepperComponent(props) {
    const { maxSteps, activeStep, handleNext, handleBack } = { ...props }
    return (
        <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
                <Button onClick={handleNext}>
                    <ArrowCircleRightIcon fontSize='large' />
                </Button>
            }
            backButton={
                <Button onClick={handleBack}>
                    <ArrowCircleLeftIcon fontSize='large' />
                </Button>
            }
        />
    )
}