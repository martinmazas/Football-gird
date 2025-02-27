import { useState } from "react";

export const useEndGame = () => {
    const [endGame, setEndGame] = useState(false)
    const handleSetEndGame = () => setEndGame(false)

    return { endGame, handleSetEndGame, setEndGame }
}