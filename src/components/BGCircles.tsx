/** @jsxImportSource theme-ui **/

import { ThemeUIStyleObject } from 'theme-ui'

type BGCirclesProps = {
  dark?: boolean
  light?: boolean
}

const circleProps: ThemeUIStyleObject = {
  display: 'block',
  position: 'absolute',
  width: '1000px',
  height: '1000px',
  opacity: '0.2',
  filter: 'blur(284px)',
  pointerEvents: 'none',
}
const BGCircles = ({ dark, light }: BGCirclesProps) => {
  return (
    <>
      <div
        sx={{
          ...circleProps,
          top: 0,
          left: 0,
          transform: 'translate(-40%, -40%)',
          width: '1000px',
          height: '1000px',
          background:
            'linear-gradient(270.27deg, #1B5FED 0.46%, #1B5FED 39.12%, #1B87ED 72.6%, #1B87ED 99.55%)',
        }}
      />
      <div
        sx={{
          ...circleProps,
          bottom: 0,
          right: 0,
          transform: 'translate(75%, 70%)',
          background:
            'linear-gradient(90deg, #FFC272 0%, #FFC272 34.41%, #FFE272 76.97%, #FFE272 99.99%)',
        }}
      />
    </>
  )
}

export default BGCircles
