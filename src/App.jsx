import React, { useEffect, useState, useTransition } from "react"
import GridTable from "./gridTable"
import { getPlayParams } from "./Utils/functions"
import CircularIndeterminate from "./CircularIndeterminate"
import './index.css'
import Container from '@mui/material/Container'
import Confetti from 'react-confetti'
import WinnerDialog from "./WinnerDialog"
import GameOptions from "./GameOptions"
import GameInstructions from "./GameInstructions"

function App() {
  const [startPlay, setStartPlay] = useState(false)
  const [score, setScore] = useState(0)
  const [gameParams, setGameParams] = useState({
    rows: 0,
    columns: 0,
    countries: [],
    teams: [],
    nonPlayers: []
  })
  const [finalResult, setFinalResult] = useState(null)
  const [endGame, setEndGame] = useState(false)
  const [isError, setIsError] = useState(false)
  const [openModal, setOpenModal] = useState(true)
  const [count, setCount] = useState(0)
  const [isPending, startTransition] = useTransition()
  const [tournament, setTournament] = useState('CHAMPIONS LEAGUE')

  // Reset game parameters
  const startGame = () => {
    setScore(0)
    setCount(0)
    setGameParams({ rows: 0, columns: 0, countries: [], teams: [], nonPlayers: [] })
    setEndGame(false)
    setIsError(false)
    setTournament('CHAMPIONS LEAGUE') // Temporary
  }

  const handleClick = () => setStartPlay(prev => !prev)

  // Fetch game parameters
  useEffect(() => {
    startGame()
    getPlayParams(tournament).then(data => {
      startTransition(() => {
        const { rows, columns, randomTeams, randomCountries, playerNumbers, noPossiblePlayers } = data

        setGameParams({
          rows,
          columns,
          countries: randomCountries,
          teams: randomTeams,
          nonPlayers: noPossiblePlayers[0]?.map(player => player.join('-')) || []
        })
        setFinalResult(playerNumbers)
      })
    })
  }, [startPlay, tournament])

  // End game when score reaches final result
  useEffect(() => {
    if (score === finalResult) setEndGame(true)
    //eslint-disable-next-line
  }, [score])

  // Reset count when modal closes
  useEffect(() => {
    if (!openModal) setCount(0)
  }, [openModal])

  return (
    isPending ? <CircularIndeterminate /> : (
      <Container maxWidth='sm' className="App">
        <GameInstructions openModal={openModal} setOpenModal={setOpenModal} setEndGame={setEndGame} />
        {gameParams.rows > 0 &&
          <>
            <GridTable
              rows={gameParams.rows}
              columns={gameParams.columns}
              countries={gameParams.countries}
              teams={gameParams.teams}
              nonPlayers={gameParams.nonPlayers}
              endGame={endGame}
              count={count}
              setCount={setCount}
              openModal={openModal}
            />
            <GameOptions
              setScore={setScore}
              countries={gameParams.countries}
              teams={gameParams.teams}
              isError={isError}
              setIsError={setIsError}
              handleClick={handleClick}
            />
          </>
        }
        {isError && <div id="error-message"><p>{isError}</p></div>}
        {endGame && <Confetti />}
        <WinnerDialog endGame={endGame} setEndGame={setEndGame} setStartPlay={setStartPlay} count={count} />
      </Container>
    )
  )
}

export default App
