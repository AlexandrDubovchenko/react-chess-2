import React, { useContext, useEffect, useRef, useState } from 'react';
import { gameContext } from '../provider/gameProvider';

const gameTime = 10 * 60 * 1000;

export const Timer = ({ team }) => {
  const { activeTeam, winner, setWinner } = useContext(gameContext);
  const [time, setTime] = useState(gameTime);
  const isCurrentTeam = activeTeam === team;
  const minutesLeft = Math.trunc(time / 1000 / 60);
  const secondsLeft = Math.ceil(((time / 1000 / 60) % 1) * 60);

  useEffect(() => {
    if (winner) {
      return;
    }
    const start = Date.now();
    let timer;
    if (isCurrentTeam) {
      timer = setInterval(() => {
        const timeLeft = time - (Date.now() - start);
        setTime(timeLeft);
        if (timeLeft <= 0) {
          setWinner(team === 'white' ? 'black' : 'white');
        }
      }, 1000);
      console.log(timer);
    }
    return () => clearInterval(timer);
  }, [isCurrentTeam, winner]);

  return (
    <p className={`timer ${isCurrentTeam && 'timer-active'}`}>
      {minutesLeft}:{secondsLeft}
    </p>
  );
};
