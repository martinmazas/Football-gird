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
  const [rows, setRows] = useState(0)
  const [columns, setColumns] = useState(0)
  const [countries, setCountries] = useState([])
  const [teams, setTeams] = useState([])
  const [finalResult, setFinalResult] = useState(null)
  const [nonPlayers, setNonPlayers] = useState([])
  const [endGame, setEndGame] = useState(false)
  const [isError, setIsError] = useState(false)
  const [openModal, setOpenModal] = useState(true)
  const [count, setCount] = useState(0)
  const [isPending, startTransition] = useTransition()
  const [contentLoaded, setContentLoaded] = useState(false)

  // Reset all the variables to prepare for a new game
  const startGame = () => {
    setScore(0)
    setCount(0)
    setNonPlayers([])
    setEndGame(false)
    setIsError(false)
    setContentLoaded(false)
  }

  const handleClick = () => setStartPlay(startPlay => startPlay + 1)

  // When application starts
  useEffect(() => {
    // Reset the game
    startGame()

    // Request new parameters from server
    getPlayParams().then(data => {
      // Wrap the state updates in startTransition for smooth updates
      startTransition(() => {
        const { rows, columns, randomTeams, randomCountries, playerNumbers, noPossiblePlayers } = data

        setRows(rows)
        setColumns(columns)
        setFinalResult(playerNumbers)

        if (noPossiblePlayers.length) {
          noPossiblePlayers[0].map(player =>
            setNonPlayers(prevNonPlayers => [...prevNonPlayers, player.join('-')])
          )
        }

        setTeams([...randomTeams])
        setCountries([...randomCountries])
        setContentLoaded(true)
      })
    })
  }, [startPlay])

  useEffect(() => {
    if (score === finalResult) setEndGame(true)
  }, [score, finalResult])

  useEffect(() => {
    if (!openModal) setCount(0)
  }, [openModal])

  useEffect(() => {
    console.log(isPending)
  }, [isPending])

  return (
    // Show loading spinner while in transition
    isPending ? <CircularIndeterminate /> : (
      <Container maxWidth='sm' className="App">
        <GameInstructions openModal={openModal} setOpenModal={setOpenModal} setEndGame={setEndGame} />
        {contentLoaded &&
          <>
            <GridTable rows={rows} columns={columns} countries={countries} teams={teams} nonPlayers={nonPlayers} endGame={endGame} count={count} setCount={setCount} openModal={openModal} />
            <GameOptions setScore={setScore} countries={countries} teams={teams} isError={isError} setIsError={setIsError} handleClick={handleClick} />
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
