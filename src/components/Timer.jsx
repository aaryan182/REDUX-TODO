import React, { useEffect, useState } from 'react';

const Timer = () => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {

        const updateClock = () => {
            const formatter = new Intl.DateTimeFormat('en-IN', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZone: 'Asia/Kolkata',
                hour12: true,
            });
            setCurrentTime(formatter.format(new Date()));
        };


        updateClock(); 
        const intervalId = setInterval(() => {
            updateClock();
            const now = new Date();
            if (now.getMinutes() === 0 && now.getSeconds() === 0) {
                alert('Drink water! One hour completed.');
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <div>{currentTime}</div>;
};

export default Timer;
