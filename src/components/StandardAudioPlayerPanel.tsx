import { useState } from 'react';
import styled from '@emotion/styled';
import AudioControlButton from './AudioControlButton';
import useSound from 'use-sound';
// import Box from '@mui/material/Box/Box';
// import Stack from '@mui/material/Stack/Stack';
// import VolumeDown from '@mui/icons-material/VolumeDown';
// import VolumeUp from '@mui/icons-material/VolumeUp';
// import Slider from '@mui/material/Slider/Slider';
import { delay } from '../utilFunction/delay';
// import { VOLUME_DECREMENT_SEC, VOLUME_INCREMENT_SEC } from '../common';
// import { checkVol } from '../utilFunction/checkVol';
// import { calculateStepToGoal } from '../utilFunction/calculateStepToGoal';

// アイコン群
import { FaPlay } from "react-icons/fa";
import { FaTurnUp } from "react-icons/fa6";
import { FaTurnDown } from "react-icons/fa6";
import { IoStopSharp } from "react-icons/io5";

export type AudioProps = {
  sounds: string[],
  defVol: number;
  dispName: string;
  bgColor: 'case1' | 'case2' | 'case3' | 'case4' | 'case5' | 'case6' | 'se',
}

/**
 * 汎用の音声再生パネル 1再生1パネルで使用する
 * 音源は1個以上N個以下受け取れる
 * 1曲目が終了したら2曲目を流す、それをクロスフェード……できる？
 */
const StandardAudioPlayerPanel = ({ sounds, defVol, dispName, bgColor }: AudioProps) => {
  // パネル背景色
  const bgColors = {
    case1: '#9dc2e3',
    case2: '#fae4d6',
    case3: '#e2efda',
    case4: '#d4d8f9',
    case5: '#d0cece',
    case6: '#e8cfcb',
    se: '#beb5c9',
  }
  const bgChoseColor = bgColors[bgColor];

  // パネル全体のスタイル
  const StandardAudioPlayerPanelWrap = styled.div`
    width: calc(100% -2em);
    padding: 1em;
    margin: 0.5em 0 0.5em 0;
    display: flex;
    flex-direction: column;
  `

  // ボタン横配置部分のスタイル
  const AudioControlButtonWrap = styled.div`
    padding: 1em 0 0 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `

  // 文字情報スタイル
  const DispInfomationWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `

  // ------音声コントロール------------------------------------------------------------
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop, sound, duration }] = useSound(sounds[0]); // volumeはショートハンドな書き方してるだけ

  const handlePlaying = () => {
    if (isPlaying) {
      // 停止
      sound.volume(0);
      setIsPlaying(false);
      stop();
    } else {
      // 再生
      sound.volume(defVol);
      setIsPlaying(true);
      play();
    }
  }
  // ------音量コントロール-----------------------------------------------------
  // const [volume, setVolume] = useState((() => defVol));
  // // 手動変更時
  // const handleVolumeChange = (event: Event, newValue: number | number[]) => {
  //   // eventは必ず要るっぽい
  //   console.log('change');
  //   setVolume(newValue as number);
  // };

  // -------曲長の表示-------------------------------------------------------------
  const dispDurationMin = duration ? Math.floor(duration / 1000 / 60) : '';
  const dispDurationSec = duration ? Math.round(duration % (1000 * 60) / 1000) : '';
  // -------フェード中に操作させない------------------------------------------
  const [isFading, setIsFading] = useState(false);
  // -----------------------------------------------------------------------------

  return (
    <>
      <StandardAudioPlayerPanelWrap style={{ backgroundColor: bgChoseColor }}>
        <DispInfomationWrap>
          <p>{dispName}</p>
          <p>{dispDurationMin}:{dispDurationSec}</p>
        </DispInfomationWrap>
        {/* 
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
        </Box> */}
        <p>音量初期値:{defVol}</p>

        <AudioControlButtonWrap>
          <AudioControlButton
            icon={isPlaying ? <IoStopSharp /> : <FaPlay />}
            isFading={isFading}
            onClick={handlePlaying}
          />
          <AudioControlButton
            icon={isPlaying ? <FaTurnDown /> : <FaTurnUp />}
            isFading={isFading}
            onClick=
            {isPlaying
              ? (async () => {
                // フェードアウト停止
                setIsFading(true);
                sound.fade(0.2, 0, 5000);
                await delay(5000);
                setIsFading(false);
                // もしフェードアウト中に別で停止状態になったらフェードアウト処理をリセットしないといけない
                // howlerjsだけで行った方がよかったんでない？
                if (isPlaying) {
                  handlePlaying() //  再生状態の時のみ停止操作
                };
              })
              : (async () => {
                handlePlaying(); // 音量が初期値で再生されるけど速攻でフェード処理入る（ひでぇ）
                setIsFading(true);
                sound.fade(0, 0.2, 7000);
                await delay(7000);
                setIsFading(false);
              })
            }
          />
        </AudioControlButtonWrap>
      </StandardAudioPlayerPanelWrap>
    </>
  )
}

export default StandardAudioPlayerPanel
