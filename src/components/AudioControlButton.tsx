import styled from '@emotion/styled';
import { IconContext } from 'react-icons'


type Props = {
  icon:JSX.Element;
  onClick: () => void;
}

/**
 * 音声再生をコントロールする汎用ボタン
 */
const AudioControlButton = ({ icon, onClick }: Props) => {

  const ControlButton = styled.button`
    width: 22%;
    padding: 0.5em 0 0.5em 0;
  `

  const iconContainer = (
    <IconContext.Provider value={{size:'1.5em',color:'#202030'}}>
      {icon}
    </IconContext.Provider>
  )

  return (
    <>
      <ControlButton onClick={onClick}>
        {iconContainer}
      </ControlButton>

    </>
  )
}

export default AudioControlButton
