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
import { calculateStepToGoal } from '../utilFunction/calculateStepToGoal';

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
  const handleFadeIn = async (nowVolume: number, volumeGoal: number) => {
    // 0できたとして
    setVolume(0);
    play();
    setIsPlaying(true);
    // 目標値までの差分を10%ずつうめる
    const volumeIncrementStep = (volumeGoal - nowVolume) / 20
    // 現在値に差分10%を加算した値を新たにボリュームに設定
    const incVolume = nowVolume + volumeIncrementStep;
    console.log(incVolume);
    setVolume(incVolume);
    if (incVolume < volumeGoal * 0.95) {
      // もし閾値未満なら再帰
      await delay(VOLUME_INCREMENT_SEC);
      handleFadeIn(incVolume, volumeGoal);
    } else {
      // 閾値以上ならボリュームをゴールに設定
      setVolume(volumeGoal);
    }
  }

  // ------音声コントロール------------------------------------------------------------
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop, sound }] = useSound(sounds[0], { volume }); // volumeはショートハンドな書き方してるだけ

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

        <Box sx={{ width: '100%' }}>
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
        </Box>
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
              : (() => {
                handleFadeIn(volume, 0.2)
              })
            }
          />
        </AudioControlButtonWrap>
      </StandardAudioPlayerPanelWrap>
    </>
  )
}

export default StandardAudioPlayerPanel
