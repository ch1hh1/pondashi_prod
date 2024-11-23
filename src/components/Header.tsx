import styled from '@emotion/styled';
import HeaderTimer from './HeaderTimer';

/**
 * メモと時計を持つヘッダー
 */
const Header = () => {

  const HeaderWrap = styled.div`
    background-color: #dedbda;
    display: flex;
    flex-direction: row;
  `;

  const HeaderArea = styled.div`
    width: 50%;
    padding: 1em;
    color: #303030;
    font-size: 0.8em;
    display: flex;
    flex-direction: column;
  `;

  return (
    <>
      <HeaderWrap>
        <HeaderArea>
          <p>停止→再生すると曲頭に戻る。フェードインは必ず0から始まる。曲変えは次のイン→現在をアウト の順に操作する。緊急ボタンは音量を0にするだけで再生を止めない。赤枠は再生中。</p>
        </HeaderArea>
        <HeaderArea>
          <HeaderTimer />
        </HeaderArea>
      </HeaderWrap>
    </>
  )
}

export default Header
