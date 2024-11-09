import { useState } from 'react';
import styled from '@emotion/styled';
import AudioControlButton from './AudioControlButton';
import useSound from 'use-sound';
import Box from '@mui/material/Box/Box';
import Stack from '@mui/material/Stack/Stack';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Slider from '@mui/material/Slider/Slider';

// アイコン群
import { FaPlay } from "react-icons/fa";
import { FaTurnUp } from "react-icons/fa6";
import { FaTurnDown } from "react-icons/fa6";
import { IoStopSharp } from "react-icons/io5";
import { delay } from '../utilFunction/delay';
import { VOLUME_DECREMENT_SEC, VOLUME_INCREMENT_SEC } from '../common';
import { checkVol } from '../utilFunction/checkVol';

type Props = {
  sounds: string[],
  // isSe: boolean,
  defVol: number;
}

/**
 * 汎用の音声再生パネル 1再生1パネルで使用する
 * 音源は1個以上N個以下受け取れる
 * 1曲目が終了したら2曲目を流す、それをクロスフェード……できる？
 */
const StandardAudioPlayerPanel = ({ sounds, defVol }: Props) => {
  // パネル全体のスタイル
  const StandardAudioPlayerPanelWrap = styled.div`
    width: calc(100% -2em);
    padding: 1em;
    margin: 0.5em 0 0.5em 0;
    display: flex;
    flex-direction: column;
    background-color: thistle;
  `

  // ボタン横配置部分のスタイル
  const AudioControlButtonWrap = styled.div`
    padding: 1em 0 0 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `
  // ------音量コントロール-----------------------------------------------------
  const [volume, setVolume] = useState((() => defVol));
  // 手動変更時
  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    // eventは必ず要るっぽい
    console.log('change');
    setVolume(newValue as number);
  };

  // フェードアウト
  const handleFadeOut = async (nowVolume: number) => {
    // 【!】停止状態なら何もしない
    if (!isPlaying) return;
    // 現在のボリュームを10%ずつ下げる（最初の減り具合が大きい）
    const volumeDecrementStep = nowVolume / 10;
    // ボリューム減算
    const decVolume = nowVolume - volumeDecrementStep;
    console.log(decVolume);
    setVolume(decVolume);
    if (decVolume >= 0.01) {
      // もしボリュームが閾値以上なら一定遅延後に再帰
      await delay(VOLUME_DECREMENT_SEC);
      handleFadeOut(decVolume);
    } else {
      // もしボリュームが閾値未満ならボリューム0・停止・停止状態
      stop();
      setVolume(0);
      setIsPlaying(false);
    }
  }

  // フェードイン
  const fadeIn = (beforeVolume: number, volumeGoal: number): number => {
    // 目標値と現在値の差の10%を埋めていく
    console.log(`beforeVolume ${beforeVolume}`);
    console.log(`volumeGoal ${volumeGoal}`);

    const incVolume = beforeVolume + ((volumeGoal - beforeVolume) / 10);
    console.log(`incVolume ${incVolume}`);
    setVolume(incVolume);
    return incVolume;
  }
  const handleFadeIn = async (nowVolume: number) => {
    // 【!】再生状態なら何もしない
    if (isPlaying) return;
    // 最初、（ボリュームを0に設定）・再生・再生状態
    setIsPlaying(true);
    play();

    // let cnt = 0;
    // let res: boolean;
    // do {
    //   res = checkVol(volume, 0)
    //   await delay(100);
    //   cnt++;
    //   console.log(cnt);
    // } while (!res && cnt < 100)
    console.log(`nowVol ${nowVolume}`);


    // フェードイン１回
    const adjVol = fadeIn(volume, 0.2);
    do{
      fadeIn(adjVol, 0.2);
      await delay(VOLUME_INCREMENT_SEC);
    }while(volume < 0.2 * 0.95)
    // 目標値の95%未満なら遅延後にフェードイン継続
      // fadeIn(adjVol, defVol);

      // 目標値の95%以上ならボリュームを目標値に設定する

  }

  // ------音声コントロール------------------------------------------------------------
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound(sounds[0], { volume }); // volumeはショートハンドな書き方してるだけ

  const handlePlaying = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stop();
    } else {
      setIsPlaying(true);
      play();
    }
  }
  // -----------------------------------------------------------------------------

  return (
    <>
      <StandardAudioPlayerPanelWrap>
        <p>タイトル</p>

        {/* <Box sx={{ width: '100%' }}>
          <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
            <VolumeDown />
            <Slider
              aria-label="Volume"
              value={volume}
              getAriaValueText={((volume: number) => String(volume))}
              onChange={handleVolumeChange}
              step={0.05}
              marks min={0} max={1} />
            <VolumeUp />
          </Stack>
        </Box> */}
        <p>
          {volume}
        </p>

        <AudioControlButtonWrap>
          <AudioControlButton
            icon={isPlaying ? <IoStopSharp /> : <FaPlay />}
            onClick={handlePlaying}
          />
          <AudioControlButton
            icon={isPlaying ? <FaTurnDown /> : <FaTurnUp />}
            onClick=
            {isPlaying
              ? (() => handleFadeOut(volume))
              : (() => handleFadeIn(volume))
            }
          />
        </AudioControlButtonWrap>
      </StandardAudioPlayerPanelWrap>
    </>
  )
}

export default StandardAudioPlayerPanel
