import styled from '@emotion/styled';

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
  `;

  return (
    <>
      <HeaderWrap>
        <HeaderArea>
          <p>メモ</p>
          <p>停止→再生すると曲頭に戻ります</p>
          <p>フェードインは0から始まるから安心しな</p>
        </HeaderArea>
        <HeaderArea>
          <h2>タイマー</h2>
        </HeaderArea>
      </HeaderWrap>
    </>
  )
}

export default Header
