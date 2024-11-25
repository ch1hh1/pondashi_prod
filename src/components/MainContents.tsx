import styled from "@emotion/styled";
import StandardAudioPlayerPanel from "./StandardAudioPlayerPanel";

//-----音声import---------
// import sound1 from '../assets/TOTEMO_HEN_NA_OTO.mp3';
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
    </>
  );

  const ses = (
    <>
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
