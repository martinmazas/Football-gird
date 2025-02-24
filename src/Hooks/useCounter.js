import { useCallback, useState } from "react";

export const useCounter = (initialValue = 0) => {
    const [count, setCount] = useState(initialValue);
    const incrementCount = useCallback(() => setCount((count) => count + 1), []);
    const resetCounter = useCallback(() => setCount(0), []);

    return { count, incrementCount, resetCounter }
}