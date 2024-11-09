import styled from '@emotion/styled';

/**
 * メモと時計を持つヘッダー
 */
const Header = () => {

  const HeaderWrap = styled.div`
    background-color: #f0b59a;
    display: flex;
    flex-direction: row;
  `;

  const HeaderArea = styled.div`
    width: 50%;
    padding: 1em;
  `;

  return (
    <>
      <HeaderWrap>
        <HeaderArea>
          <p>aaa</p>
          <p>aaa</p>
        </HeaderArea>
        <HeaderArea>
          <h2>タイマー</h2>
        </HeaderArea>
      </HeaderWrap>
    </>
  )
}

export default Header
