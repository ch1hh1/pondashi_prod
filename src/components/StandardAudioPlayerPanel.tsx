import styled from '@emotion/styled';
import AudioControlButton from './AudioControlButton';

// アイコン群
import { FaPlay } from "react-icons/fa";
import { FaTurnUp } from "react-icons/fa6";
import { FaTurnDown } from "react-icons/fa6";
import { IoStopSharp } from "react-icons/io5";

type Props = {
  sounds: string[],
  // isSe: boolean,
}


/**
 * 汎用の音声再生パネル 1再生1パネルで使用する
 * 音源は1個以上N個以下受け取れる
 * 1曲目が終了したら2曲目を流す、それをクロスフェード……できる？
 */
const StandardAudioPlayerPanel = ({ sounds }: Props) => {
  // パネル全体のスタイル
  const StandardAudioPlayerPanelWrap = styled.div`
    width: 100%;
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

  return (
    <>
      <StandardAudioPlayerPanelWrap>
        <p>タイトル</p>
        <p>ボリューム</p>
        <AudioControlButtonWrap>
          <AudioControlButton icon={<FaPlay />} onClick={(() => console.log('click!!'))} />
          <AudioControlButton icon={<FaTurnUp />} onClick={(() => console.log('click!!'))} />
          <AudioControlButton icon={<FaTurnDown />} onClick={(() => console.log('click!!'))} />
          <AudioControlButton icon={<IoStopSharp />} onClick={(() => console.log('click!!'))} />
        </AudioControlButtonWrap>
      </StandardAudioPlayerPanelWrap>
    </>
  )
}

export default StandardAudioPlayerPanel
