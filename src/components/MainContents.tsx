import styled from "@emotion/styled";
import StandardAudioPlayerPanel from "./StandardAudioPlayerPanel";

//-----音声import---------
// import sound1 from '../assets/TOTEMO_HEN_NA_OTO.mp3';
import bgm0 from "../assets/bgm/1_1000miles_L_1127.mp3";
import bgm3 from "../assets/bgm/2_Funkeriffic_L_1127_.mp3";
import bgm4 from "../assets/bgm/3_Swing_Man_1112.mp3";
import bgm5 from "../assets/bgm/4_ceux_beatloop_1112.mp3";
import bgm6 from "../assets/bgm/5_Compy_2loop_1112.mp3";
import bgm7 from "../assets/bgm/6_JackHarmon_1112.mp3";
import bgm8 from "../assets/bgm/6_SwingSt_L_1127.mp3";
import bgm10 from "../assets/bgm/7_FESTA_1112.mp3";

import se0 from "../assets/se/se_EnterBell.mp3";
import se1 from "../assets/se/se_EnterBellAndNoise.mp3";
// import se2 from "../assets/se/se_cafeNoise.mp3";
import se3 from "../assets/se/se_cafeSound.mp3";
import se4 from "../assets/se/se_chimeTwice.mp3";
import se5 from "../assets/se/se_click.mp3";
import se6 from "../assets/se/se_slowDownClick.mp3";
import se7 from "../assets/se/se_soto1127.mp3";
import se9 from "../assets/se/se_windWindow1127.mp3";
//-----------------------
/**
 * 音声コンテンツをまとめる最上位
 */
const MainContents = () => {
  // 音声コンテンツ全体のスタイル
  const MainContentsWrap = styled.div`
    display: flex;
    flex-direction: row;
  `;

  // 音声コンテンツの各エリア（BGM・SE各エリア）を分けるスタイル
  const MainContentBGMArea = styled.div`
    border: solid 0.5px #321e06;
    width: 28%;
    height: 85vh;
    padding: 1em;
    overflow-x: scroll;
    display: flex;
    flex-direction: column;
    scrollbar-width: none;
  `;
  const MainContentSEArea = styled.div`
    border: solid 0.5px #321e06;
    width: 22%;
    height: 85vh;
    padding: 1em;
    overflow-x: scroll;
    display: flex;
    flex-direction: column;
    scrollbar-width: none;
  `;

  // BGMのライン
  const bgms = (
    <>
      <StandardAudioPlayerPanel
        sounds={[bgm0]}
        defVol={0.2}
        dispName={"通常店内_1000miles"}
        bgColor={"case1"}
      />
      <StandardAudioPlayerPanel
        sounds={[bgm3]}
        defVol={0.2}
        dispName={"ジャズ2_Funkeriffic"}
        bgColor={"case2"}
      />
      <StandardAudioPlayerPanel
        sounds={[bgm4]}
        defVol={0.1}
        dispName={"ジャズ3_Swing_Man（寅山）"}
        bgColor={"case3"}
      />
      <StandardAudioPlayerPanel
        sounds={[bgm5]}
        defVol={0.1}
        dispName={"ジャズ4_ceux（占い）"}
        bgColor={"case4"}
      />
      <StandardAudioPlayerPanel
        sounds={[bgm6]}
        defVol={0.15}
        dispName={"ジャズ5_Compy（後藤）"}
        bgColor={"case5"}
      />
      <StandardAudioPlayerPanel
        sounds={[bgm7]}
        defVol={0.2}
        dispName={"ジャズ6A_JackHamon旅立ち"}
        bgColor={"case6"}
      />
      <StandardAudioPlayerPanel
        sounds={[bgm8]}
        defVol={0.1}
        dispName={"ジャズ6B_SwingSt仲よし"}
        bgColor={"case6"}
      />
      <StandardAudioPlayerPanel
        sounds={[bgm10]}
        defVol={1.0}
        dispName={"7_FESTA_カーテンコール"}
        bgColor={"case7"}
      />
    </>
  );

  const ses = (
    <>
      <StandardAudioPlayerPanel
        sounds={[se5]}
        defVol={0.8}
        dispName={"カチコチ"}
        bgColor={"casese"}
      />
      <StandardAudioPlayerPanel
        sounds={[se9]}
        defVol={0.4}
        dispName={"風の音"}
        bgColor={"casese"}
      />
      <StandardAudioPlayerPanel
        sounds={[se4]}
        defVol={0.8}
        dispName={"時報２回"}
        bgColor={"casese"}
      />
      <StandardAudioPlayerPanel
        sounds={[se6]}
        defVol={0.8}
        dispName={"カチコチテンポ下がる"}
        bgColor={"casese"}
      />
      <StandardAudioPlayerPanel
        sounds={[se0]}
        defVol={0.2}
        dispName={"チリン"}
        bgColor={"casese"}
      />
      <StandardAudioPlayerPanel
        sounds={[se7]}
        defVol={0.1}
        dispName={"外の音"}
        bgColor={"casese"}
      />
      <StandardAudioPlayerPanel
        sounds={[se3]}
        defVol={0.1}
        dispName={"カフェ雑音"}
        bgColor={"casese"}
      />
      <StandardAudioPlayerPanel
        sounds={[se5]}
        defVol={0.3}
        dispName={"カチコチ小さく"}
        bgColor={"casese"}
      />
      <StandardAudioPlayerPanel
        sounds={[se1]}
        defVol={0.2}
        dispName={"チリン（雑踏あり）"}
        bgColor={"casese"}
      />
    </>
  );

  return (
    <>
      <MainContentsWrap>
        <MainContentBGMArea>
          {/* bgm1 */}
          {bgms}
        </MainContentBGMArea>

        <MainContentBGMArea>
          {/* bgm2 */}
          {bgms}
        </MainContentBGMArea>

        <MainContentSEArea>
          {/* se */}
          {ses}
        </MainContentSEArea>

        <MainContentSEArea>
          {/* se */}
          {ses}
        </MainContentSEArea>
      </MainContentsWrap>
    </>
  );
};

export default MainContents;
