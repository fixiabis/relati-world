import React, { useState } from 'react';
import Lottie, { EventListener } from 'react-lottie';
// import * as animationData01 from './38740-rangoli-loader.json'

import {animationDataOk,animationDataOn} from '../lottie'
/* tslint:disable-next-line:max-line-length */
const userImgs=[

  {
    id: 0,
    lottie: "animationDataOk",
    Player:'nan' ,
    RelatiStatus:'Player1',
  },
  {
    id: 1,
    lottie: "animationDataOn",
    Player:'Player2' ,
    RelatiStatus:'nan',
  },
]
const lottieFile=[
  animationDataOk,animationDataOn
]


const LottieUser = ({
  ...props
}) => {
let img =userImgs.filter(index=>index.Player==props.Player)[0]
console.log(img)
  return <Lottie
  options={{
    loop:true,
    autoplay:true,
    animationData:lottieFile[0],
  }}
  style={{margin: '0 0 0'}}
/>;
};




export default LottieUser;

