import styled from '@emotion/styled';
import Header from './components/Header';
import MainContents from './components/MainContents';

/**
 * React実装のルート
 */
function App() {
  const Wrapeer = styled.div`
    display: flex;
    flex-direction: column;
  `

  return (
    <>
      <Wrapeer>
        <Header />
        <MainContents />
      </Wrapeer>
    </>
  )
}

export default App