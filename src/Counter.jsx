import React, { useEffect } from 'react';
import './index.css';

const Counter = (props) => {
    const { endGame, count, setCount } = { ...props }

    // useEffect to handle the automatic increment every second
    useEffect(() => {
        if (!endGame) {
            const intervalId = setInterval(() => {
                setCount((prevCount) => prevCount + 1);
            }, 1000);

            // Cleanup interval on component unmount to prevent memory leaks
            return () => clearInterval(intervalId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endGame]);

    return (
        <div className='counter-container'>
            <div className='counter'>{count}</div>
        </div>
    );
};

export default Counter