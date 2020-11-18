import React, { useState } from 'react';
import Lottie, { EventListener } from 'react-lottie';
// import * as animationData01 from './38740-rangoli-loader.json'
import {animationDataTest} from '../lottie/index';

/* tslint:disable-next-line:max-line-length */

const LottieView = () => (
  <Lottie
    options={{
      loop:true,
      autoplay:true,
      animationData:animationDataTest,
    }}
    style={{margin: '0 0 0'}}
  />
);

// const LottieViewStyled = () => (
//   <Lottie
//     options={{
//       animationData
//     }}
//     style={{margin: '0 0 30px'}}
//   />
// );

// const LoadIndicatorOnce = () => {
//   const [isComplete, setIsComplete] = React.useState(false);
//   const eventListeners = React.useMemo((): ReadonlyArray<EventListener> => [{
//     eventName: 'complete',
//     callback: (): void => setIsComplete(true)
//   }], []);
//   return isComplete ? null : <Lottie
//     options={{
//       animationData
//     }}
//     eventListeners={eventListeners}
//   />;
// };

export default LottieView;
// const [isStopped, setStopped] = useState(false);
// const [isPaused, setPaused] = useState(false);

// const LottieView = () => {
//   return (
//     <div className="overlay">
//       <div className="tutorial-dialog">
//         <div className="tutorial-dialog.description">
//           <div className="tutorial-dialog.description-text"></div>
//           asasas
//         </div>
//         <div className="tutorial-dialog.character"></div>
//       </div>
//     </div>
//   );
// };

// export default LottieView;
