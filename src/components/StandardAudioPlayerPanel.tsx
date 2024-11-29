import { useState } from "react";
import styled from "@emotion/styled";
import AudioControlButton from "./AudioControlButton";
import useSound from "use-sound";
import { delay } from "../utilFunction/delay";

// アイコン群
import { FaPlay } from "react-icons/fa";
import { FaTurnUp } from "react-icons/fa6";
import { FaTurnDown } from "react-icons/fa6";
import { IoStopSharp } from "react-icons/io5";
import { RiAlertFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { FaAnglesDown } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";

export type AudioProps = {
  sounds: string[];
  defVol: number;
  dispName: string;
  bgColor:
    | "case1"
    | "case2"
    | "case3"
    | "case4"
    | "case5"
    | "case6"
    | "case7"
    | "casese";
};

/**
 * 汎用の音声再生パネル 1再生1パネルで使用する
 * 音源は1個以上N個以下受け取れる
 * 1曲目が終了したら2曲目を流す、それをクロスフェード……できる？
 */
const StandardAudioPlayerPanel = ({
  sounds,
  defVol,
  dispName,
  bgColor,
}: AudioProps) => {
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
  };

  // -------曲長の表示-------------------------------------------------------------
  const dispDurationMin = duration ? Math.floor(duration / 1000 / 60) : "";
  const dispDurationSec = duration
    ? Math.round((duration % (1000 * 60)) / 1000)
    : "";
  // -------フェード中に操作させない------------------------------------------
  const [isFading, setIsFading] = useState(false);
  // -----------------------------------------------------------------------------

  // パネル背景色
  const bgColors = {
    case1: "#9dc2e3",
    case2: "#fae4d6",
    case3: "#e2efda",
    case4: "#d4d8f9",
    case5: "#d0cece",
    case6: "#e8cfcb",
    case7: "#dc8a8a",
    casese: "#eedaf9",
  };
  const bgChoseColor = bgColors[bgColor];

  // パネル全体のスタイル
  const transparency = isPlaying ? 1 : 0;
  const StandardAudioPlayerPanelWrap = styled.div`
    width: calc(100% -2em);
    padding: 1em;
    margin: 0.5em 0 0.5em 0;
    display: flex;
    flex-direction: column;
    border: solid 0.3em rgb(255 60 60 / ${transparency});
  `;

  // ボタン横配置部分のスタイル
  const AudioControlButtonWrap = styled.div`
    padding: 1em 0 0 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;

  // 文字情報スタイル
  const DispInfomationWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;

  // 緊急音量ゼロボタン
  const EmergencyVolZeroBtn = styled.button`
    padding: 0.5em 0 0.5em 0;
  `;

  return (
    <>
      <StandardAudioPlayerPanelWrap style={{ backgroundColor: bgChoseColor }}>
        <DispInfomationWrap>
          <p>{dispName}</p>
          <p>
            {dispDurationMin}:{dispDurationSec}
          </p>
        </DispInfomationWrap>

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
            onClick={
              isPlaying
                ? async () => {
                    // フェードアウト停止
                    setIsFading(true);
                    sound.fade(defVol, 0, 1000 * 30);
                    await delay(1000 * 30);
                    setIsFading(false);
                    // もしフェードアウト中に別で停止状態になったらフェードアウト処理をリセットしないといけない
                    // howlerjsだけで行った方がよかったんでない？
                    if (isPlaying) {
                      handlePlaying(); //  再生状態の時のみ停止操作
                    }
                  }
                : async () => {
                    // フェードイン
                    handlePlaying(); // 音量が初期値で再生されるけど速攻でフェード処理入る（ひでぇ）
                    setIsFading(true);
                    sound.fade(0, defVol, 1000 * 25);
                    await delay(1000 * 25);
                    setIsFading(false);
                  }
            }
          />
          <AudioControlButton
            icon={isPlaying ? <FaAnglesDown /> : <FaAnglesUp />}
            isFading={isFading}
            onClick={
              isPlaying
                ? async () => {
                    // フェードアウト停止（短スパン）
                    setIsFading(true);
                    sound.fade(defVol, 0, 1000 * 5);
                    await delay(1000 * 5);
                    setIsFading(false);
                    // もしフェードアウト中に別で停止状態になったらフェードアウト処理をリセットしないといけない
                    // howlerjsだけで行った方がよかったんでない？
                    if (isPlaying) {
                      handlePlaying(); //  再生状態の時のみ停止操作
                    }
                  }
                : async () => {
                    // フェードイン（短スパン）
                    handlePlaying(); // 音量が初期値で再生されるけど速攻でフェード処理入る（ひでぇ）
                    setIsFading(true);
                    sound.fade(0, defVol, 1000 * 5);
                    await delay(1000 * 5);
                    setIsFading(false);
                  }
            }
          />
          <EmergencyVolZeroBtn onClick={() => sound.volume(0)}>
            <IconContext.Provider value={{ size: "1.2em", color: "#f05050" }}>
              <RiAlertFill />
            </IconContext.Provider>
          </EmergencyVolZeroBtn>
        </AudioControlButtonWrap>
      </StandardAudioPlayerPanelWrap>
    </>
  );
};

export default StandardAudioPlayerPanel;
