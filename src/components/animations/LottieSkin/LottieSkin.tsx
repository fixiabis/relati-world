import React, { useState } from 'react';
import Lottie, { EventListener } from 'react-lottie';
// import * as animationData01 from './38740-rangoli-loader.json'

import chessmanSkin from '../chessmanSkin'
/* tslint:disable-next-line:max-line-length */
// const [isStopped, setStopped] = useState(false);


const LottieSkin = ({
  ...props
}) => {

  return <Lottie
  options={{
    loop:props.loop,
    autoplay:true,
    animationData:chessmanSkin.chessmanSkin[props.id].lottie,
  }}
  style={{margin: '0 0 0'}}
/>;
};



export default LottieSkin;
