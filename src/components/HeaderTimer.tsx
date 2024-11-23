import { useState, useEffect } from "react";
import styled from '@emotion/styled';

const HeaderTimer = () => {

  const TimerArea = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;

  const [time, setTime] = useState<number>(0); // 経過時間（秒）
  const [isRunning, setIsRunning] = useState<boolean>(false); // タイマーの実行状態

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer); // クリーンアップ
    };
  }, [isRunning]);

  const handleStart = (): void => {
    setIsRunning(true);
  };

  const handlePause = (): void => {
    setIsRunning(false);
  };

  const handleReset = (): void => {
    setIsRunning(false);
    setTime(0);
  };

  let h = Math.floor(time / 60 / 60);
  let m = Math.floor(time / 60 - (h * 60));
  let s = time % (60 * 60) - (m * 60);


  return (
    <>
      <TimerArea>
        <p style={{ fontSize: "2rem"}}>{h}:{m}:{s}</p>

        <button style={{ fontSize: "1rem", padding:'3%'}} onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button style={{ fontSize: "1rem", padding:'3%'}} onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>
        <button style={{ fontSize: "1rem", padding:'3%'}} onClick={handleReset}>Reset</button>

      </TimerArea>
    </>
  );
};

export default HeaderTimer;
