import React, { useEffect } from 'react';
import './Styles/index.css';

const Counter = (props) => {
    const { endGame, count, incrementCount } = { ...props }

    // useEffect to handle the automatic increment every second
    useEffect(() => {
        if (!endGame) {
            const intervalId = setInterval(() => {
                incrementCount()
            }, 1000);

            // Cleanup interval on component unmount to prevent memory leaks
            return () => clearInterval(intervalId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endGame]);

    return (
        <div className='counter'>{count}</div>
    );
};

export default Counter
