import { useEffect } from "react";
import { useGameContext } from "../Context/GameContext";

const Counter = () => {
  const { endGame, surrendered, count, incrementCount } = useGameContext();

  // useEffect to handle the automatic increment every second
  useEffect(() => {
    if (!endGame && !surrendered) {
      const intervalId = setInterval(() => {
        incrementCount();
      }, 1000);

      // Cleanup interval on component unmount to prevent memory leaks
      return () => clearInterval(intervalId);
    }
  }, [endGame, surrendered, incrementCount]);

  return <div className="counter">{count}</div>;
};

export default Counter;
