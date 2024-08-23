import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CancelIcon from '@mui/icons-material/Cancel';

const images = [
    {
        label: 'start-game',
        imgPath: require('./images/Intro/start-game.jpeg'),
        text: 'Based on <a href="https://futbol-11.com/futbol-gridFootball">Football Grid</a>. You have a 3x3 football grid featuring countries at the top and clubs on the columns.',
        title: 'How to play'
    },
    {
        label: 'one-player',
        imgPath: require('./images/Intro/one-player.jpeg'),
        text: 'You need to fill the grid with players who are currently playing for the same club and country in a specific position of the grid',
        title: 'Guess a player'
    },
    {
        label: 'see-team',
        imgPath: require('./images/Intro/see-team.jpeg'),
        text: 'You can check which player could be a good match by clicking the team shield (redirect to transfermarkt web)',
        title: 'Help'
    },
    {
        label: 'two-player',
        imgPath: require('./images/Intro/two-player.jpeg'),
        text: 'The game will continue until you successfully add all the possible players to the grid',
        title: 'Game flow'
    },
    {
        label: 'restart',
        imgPath: require('./images/Intro/restart.jpeg'),
        text: 'You can restart the grid whenever you want, the teams and countries will be restarted and the play will start again',
        title: 'Restart the game'
    }
];

function SwipeableTextMobileStepper(props) {
    const sliderRef = useRef(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;
    const { setOpenModal, setEndGame } = { ...props }

    const settings = {
        infinite: true,
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
        <Box sx={{ maxWidth: '100%', flexGrow: 1, p: '1rem' }}>
            <Button
                sx={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: 0,  
                    minWidth: 'auto',
                }}
                onClick={() => setOpenModal(false)}
            >
                <CancelIcon
                    sx={{
                        color: 'error.main',
                        fontSize: 'large',
                        width: '2.5rem', 
                        height: '2.5rem'
                    }}
                    onClick={() => setEndGame(false)}
                />
            </Button>
            <Slider ref={sliderRef} {...settings}>
                {images.map((step) => (
                    <div key={step.label}>
                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                pb: '1rem',
                                pt: '1rem'
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    height: { xs: '9rem', sm: '11.5rem', md: '17.75rem' },
                                    display: 'block',
                                    maxWidth: { xs: '12.5rem', sm: '18.75rem', md: '25rem' },
                                    overflow: 'hidden',
                                    objectFit: 'contain',
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                            <Card
                                sx={{
                                    width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
                                    // maxWidth: { xs: '12.5rem', sm: '18.75rem', md: '25rem' },
                                    mt: '1rem',
                                    boxShadow: 3,
                                    borderRadius: '2.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    height: '11rem', // Fixed height for uniformity
                                }}
                            >
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
        </Box>
    );
}

export default SwipeableTextMobileStepper;
