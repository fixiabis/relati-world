import {animationDataCheck, animationDataErr, animationDataEye, animationDataFr, animationDataOk, animationDataOn, animationDataTest} from './lottie/index'

export const chessmanSkin  = [
  {
    id: 0,
    lottie: animationDataTest,
    Player:'nan' ,
    RelatiStatus:'nan',
  },
  {
    id: 1,
    lottie: animationDataOk,
    Player:'Player1' ,
    RelatiStatus:'df',
  },
  {
    id: 2,
    lottie: animationDataCheck,
    Player:'Player1' ,
    RelatiStatus:'50%',
  },
  {
    id: 3,
    lottie: animationDataFr,
    Player:'Player1' ,
    RelatiStatus:'did',
  },
  {
    id: 4,
    lottie: animationDataOn,
    Player:'Player2' ,
    RelatiStatus:'df',
  },
  {
    id: 5,
    lottie: animationDataErr,
    Player:'Player2' ,
    RelatiStatus:'50%',
  },
  {
    id: 6,
    lottie: animationDataEye,
    Player:'Player2' ,
    RelatiStatus:'did',
  },
]

export default {
    chessmanSkin,
}
