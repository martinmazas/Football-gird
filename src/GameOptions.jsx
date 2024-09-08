import { Button, Container } from "@mui/material";
import SimpleDialogDemo from "./SimpleDialogDemo";
import RestartAltIcon from '@mui/icons-material/RestartAlt';


export default function GameOptions(props) {
    const { setScore, countries, teams, isError, setIsError, handleClick } = { ...props }
    return (
        <Container maxWidth='sm' id="play-game">
            <SimpleDialogDemo setScore={setScore} countries={countries} teams={teams} isError={isError} setIsError={setIsError} />
            <Button size="small" id="restart-button" onClick={handleClick} variant="contained">
                <RestartAltIcon sx={{ color: '#fff' }} />
            </Button>
        </Container>
    )
}