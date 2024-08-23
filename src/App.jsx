import React, { useEffect, useState } from "react";
import GridTable from "./gridTable";
import Button from '@mui/material/Button';
import { getPlayParams } from "./Utils/functions";
import CircularIndeterminate from "./CircularIndeterminate";
import SimpleDialogDemo from "./SimpleDialogDemo";
import './index.css';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Container from '@mui/material/Container';
import Confetti from 'react-confetti';
import WinnerDialog from "./WinnerDialog";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const styles = {
  playGame: {
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: '1rem',
    maxWidth: '26rem'
  },
  errorMessage: {
    color: 'white',
    marginTop: '1rem',
    textAlign: 'center',
  },
  howToPlay: {
    margin: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    borderRadius: '3rem',
  }
};

function App() {
  const [startPlay, setStartPlay] = useState(0);
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [countryNames, setCountryNames] = useState([]);
  const [teamNames, setTeamNames] = useState([]);
  const [finalResult, setFinalResult] = useState(null);
  const [nonPlayers, setNonPlayers] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [isError, setIsError] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [count, setCount] = useState(0)

  const startGame = () => {
    setScore(0);
    setRows(0);
    setColumns(0);
    setCount(0)
    setCountryNames([]);
    setTeamNames([]);
    setFinalResult(null);
    setNonPlayers([]);
    setEndGame(false);
    setIsError(false);
  };

  const handleClick = () => {
    setStartPlay(startPlay => startPlay + 1);
  };

  // When application starts
  useEffect(() => {
    startGame();

    getPlayParams()
      .then(data => {
        const { gridRows, gridColumns, teams, countries, playerNumber, noPossiblePlayerList } = { ...data };

        // Set columns, rows and the total players to guess
        setRows(gridRows);
        setColumns(gridColumns);
        setFinalResult(playerNumber);

        // Set the country-team combination where there is no option
        if (noPossiblePlayerList.length) {
          noPossiblePlayerList[0].map(player =>
            setNonPlayers(nonPlayers => [...nonPlayers, player.join('-')])
          );
        }

        // Set teams and countries
        teams[0].map(team => setTeamNames(teamNames => [...teamNames, team]));
        countries[0].map(country => setCountryNames(countryNames => [...countryNames, country]));
      });
  }, [startPlay]);

  useEffect(() => {
    if (score === finalResult) setEndGame(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  return (
    // Wait until finalResult and nonPlayers is ready
    (finalResult && nonPlayers) ?
      <Container maxWidth='sm' className="App">
        <GridTable rows={rows} columns={columns} countryNames={countryNames} teamNames={teamNames} nonPlayers={nonPlayers} endGame={endGame} count={count} setCount={setCount} />
        <Container maxWidth='sm' className="play-game" style={styles.playGame}>
          <SimpleDialogDemo setScore={setScore} countryNames={countryNames} teamNames={teamNames} isError={isError} setIsError={setIsError} />
          <Button size="small" id="restart-button" onClick={handleClick} variant="contained"><RestartAltIcon sx={{ color: '#fff' }} /></Button>
        </Container>
        {isError && <div style={styles.errorMessage}><p>{isError}</p></div>}
        {endGame && <Confetti />}
        <Dialog
          className="how-to-play-title"
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="how-to-play-title"
          maxWidth="sm"
          fullWidth
          PaperProps={{ style: styles.howToPlay }}
        >
          <DialogContent>
            <SwipeableTextMobileStepper setOpenModal={setOpenModal} setEndGame={setEndGame} />
          </DialogContent>
        </Dialog>
        <WinnerDialog endGame={endGame} setEndGame={setEndGame} setStartPlay={setStartPlay} />
      </Container>
      : <CircularIndeterminate />
  );
}

export default App;
