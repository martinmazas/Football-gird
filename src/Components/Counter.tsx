import { useEffect } from "react";
import "../Styles/index.css";
import { CounterProps } from "../Types/types";

const Counter = ({ endGame, count, incrementCount }: CounterProps) => {
  // useEffect to handle the automatic increment every second
  useEffect(() => {
    if (!endGame) {
      const intervalId = setInterval(() => {
        incrementCount();
      }, 1000);

      // Cleanup interval on component unmount to prevent memory leaks
      return () => clearInterval(intervalId);
    }
  }, [endGame, incrementCount]);

  return <div className="counter">{count}</div>;
};

export default Counter;
