import styled from '@emotion/styled';
import StandardAudioPlayerPanel from './StandardAudioPlayerPanel';
//-----音声import---------
import sound1 from '../assets/ceuxQuiMarchentDeboutDontStandByMe_SStrongRemix_mstr_1103.mp3';
//-----------------------


/**
 * 音声コンテンツをまとめる最上位
 */
const MainContents = () => {
  // 音声コンテンツ全体のスタイル
  const MainContentsWrap = styled.div`
    display: flex;
    flex-direction: row;
  `

  // 音声コンテンツの各エリア（BGM・SE各エリア）を分けるスタイル
  const MainContentArea = styled.div`
    border: solid 1px #aaaa00;
    width:50%;
    height: 85vh;
    padding: 1em 2.5em 0 1em;
    overflow-x: scroll;
    display: flex;
    flex-direction: column;
    &::-webkit-scrollbar {
      width: 10px;
      }
  `

  // 指定の音源を1〜n個渡す
  // 音源の表示名を渡す

  return (
    <>
      <MainContentsWrap>
        <MainContentArea>
          <StandardAudioPlayerPanel sounds={[sound1]}/>
          {[...Array(100)].map(i =>
            <p>{i = 'bgm'}</p>
          )}
        </MainContentArea>
        <MainContentArea>
          {[...Array(100)].map(i =>
            <p>{i = 'se'}</p>
          )}
        </MainContentArea>
      </MainContentsWrap>
    </>
  )
}

export default MainContents
