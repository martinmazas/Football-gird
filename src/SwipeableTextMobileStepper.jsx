import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CancelIcon from '@mui/icons-material/Cancel';
import MobileStepperComponent from './MobileStepperComponent';
// import { LogService } from './Utils/functions';
const images = require('./Utils/introImages.json')

const SwipeableTextMobileStepper = (props) => {
    const styles = {
        imgBox: {
            height: { xs: '9rem', sm: '11.5rem', md: '17.75rem' },
            display: 'block',
            maxWidth: { xs: '12.5rem', sm: '18.75rem', md: '25rem' },
            overflow: 'hidden',
            objectFit: 'contain',
        },
        divBox: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pb: '1rem',
            pt: '1rem'
        },
        openModalBox: {
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            padding: 0,
            minWidth: 'auto',
        },
        cancelIcon: {
            color: 'error.main',
            fontSize: 'large',
            width: '2.5rem',
            height: '2.5rem'
        },
        boxCard: {
            width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
            mt: '1rem',
            boxShadow: 3,
            borderRadius: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '11rem', // Fixed height for uniformity
        }
    }

    const sliderRef = useRef(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;
    const { setOpenModal, handleSetEndGame } = { ...props }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setActiveStep(next),
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
        // LogService('Next button clicked')
    };

    const handleBack = () => {
        sliderRef.current.slickPrev();
        // LogService('Back button clicked')
    };

    return (
        <Box sx={{ maxWidth: '100%', flexGrow: 1, p: '1rem' }}>
            <Button
                sx={styles.openModalBox}
                onClick={() => setOpenModal(false)}
            >
                <CancelIcon
                    sx={styles.cancelIcon}
                    onClick={() => handleSetEndGame()}
                />
            </Button>
            <Slider ref={sliderRef} {...settings}>
                {images.map((step) => (
                    <div key={step.label}>
                        <Box
                            component="div"
                            sx={styles.divBox}
                        >
                            <Box
                                component="img"
                                sx={styles.imgBox}
                                src={require(`${step.imgPath}`)}
                                alt={step.label}
                            />
                            <Card sx={styles.boxCard}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {step.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" component="div" dangerouslySetInnerHTML={{ __html: step.text }} />
                                </CardContent>
                            </Card>
                        </Box>
                    </div>
                ))}
            </Slider>

            <MobileStepperComponent maxSteps={maxSteps} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
        </Box>
    );
}

export default SwipeableTextMobileStepper;
