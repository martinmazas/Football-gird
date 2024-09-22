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
import TournamentTab from "./TournamentTab"

const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue)
  const incrementCount = () => setCount((count) => count + 1)
  const resetCounter = () => setCount(0)

  return { count, incrementCount, resetCounter }
}

const INITIAL_GAME_PARAMS = {
  rows: 0,
  columns: 0,
  countries: [],
  teams: [],
  nonPlayers: []
}

function App() {
  const [startPlay, setStartPlay] = useState(false)
  const [score, setScore] = useState(0)
  const [gameParams, setGameParams] = useState(INITIAL_GAME_PARAMS)
  const [finalResult, setFinalResult] = useState(null)
  const [endGame, setEndGame] = useState(false)
  const [isError, setIsError] = useState(false)
  const [openModal, setOpenModal] = useState(true)
  const { count, incrementCount, resetCounter } = useCounter(0)
  const [isPending, startTransition] = useTransition()
  const [tournament, setTournament] = useState("CHAMPIONS LEAGUE")

  const startGame = () => {
    setScore(0)
    resetCounter()
    setGameParams(INITIAL_GAME_PARAMS)
    setEndGame(false)
    setIsError(false)
  }

  const handleSetEndGame = () => setEndGame(false)

  const handleClick = () => setStartPlay((prev) => !prev)

  useEffect(() => {
    startGame()
    getPlayParams(tournament).then((data) => {
      startTransition(() => {
        const { rows, columns, randomTeams, randomCountries, playerNumbers, noPossiblePlayers } = data

        setGameParams({
          rows,
          columns,
          countries: randomCountries,
          teams: randomTeams,
          nonPlayers: noPossiblePlayers[0]?.map((player) => player.join("-")) || []
        })
        setFinalResult(playerNumbers)
      })
    })
  }, [startPlay, tournament])

  useEffect(() => {
    if (score === finalResult) setEndGame(true)
  }, [score, finalResult])

  useEffect(() => {
    if (!openModal) resetCounter()
  }, [openModal])

  return (
    isPending ? <CircularIndeterminate /> : (
      <Container className="App-container">
        <GameInstructions openModal={openModal} setOpenModal={setOpenModal} handleSetEndGame={handleSetEndGame} />
        {gameParams.rows > 0 && (
          <>
            <TournamentTab tournament={tournament} setTournament={setTournament} handleClick={handleClick} />
            <GridTable
              rows={gameParams.rows}
              columns={gameParams.columns}
              countries={gameParams.countries}
              teams={gameParams.teams}
              nonPlayers={gameParams.nonPlayers}
              endGame={endGame}
              count={count}
              incrementCount={incrementCount}
              openModal={openModal}
            />
            <GameOptions
              handleScore={() => setScore(score + 1)}
              countries={gameParams.countries}
              teams={gameParams.teams}
              isError={isError}
              setIsError={setIsError}
              handleClick={handleClick}
            />
          </>
        )}
        {isError && <div id="error-message"><p>{isError}</p></div>}
        {endGame && <Confetti />}
        <WinnerDialog endGame={endGame} handleSetEndGame={handleSetEndGame} handleClick={handleClick} count={count} />
      </Container>
    )
  )
}

export default App