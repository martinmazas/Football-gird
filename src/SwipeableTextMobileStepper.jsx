import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import CancelIcon from '@mui/icons-material/Cancel';
import MobileStepperComponent from './MobileStepperComponent';
const images = require('./Utils/introImages.json')

const SwipeableTextMobileStepper = ({ setOpenModal, handleSetEndGame }) => {
    const sliderRef = useRef(null);
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setActiveStep(next),
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    const handleBack = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <Box sx={{ maxWidth: '100%', flexGrow: 1, p: '2rem', position: 'relative' }}>
            <Slider ref={sliderRef} {...settings}>
                {images.map((step) => (
                    <div key={step.label}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pb: 2 }}>
                            <Box
                                component="img"
                                sx={{
                                    height: { xs: '9rem', sm: '11.5rem', md: '17.75rem' },
                                    display: 'block',
                                    maxWidth: { xs: '12.5rem', sm: '18.75rem', md: '25rem' },
                                    overflow: 'hidden',
                                    objectFit: 'contain',
                                }}
                                src={require(`${step.imgPath}`)}
                                alt={step.label}
                            />
                            <Card sx={{ boxShadow: 3, mt: 2, borderRadius: 3, p: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
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
};

export default SwipeableTextMobileStepper;