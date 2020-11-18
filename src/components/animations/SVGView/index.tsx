// import * as React { Component } from "react"
// import logo from '../../../assets/svg/logo.svg'
// import { ReactComponent as Logo } from '../../../assets/svg/logo.svg'
// import './index.css'
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <img src={logo} className="App-logo" alt="logo" />
//         <Logo className="App-logo" alt="logo" stroke="#DB7290" strokeWidth="1rem"/>
//       </div>
//     );
//   }
// }
// export default App;

import React from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgComponent({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      width={48}
      height={1}
      viewBox="0 0 48 1"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title === undefined ? (
        <title id={titleId}>{"Rectangle 5"}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path d="M0 0h48v1H0z" fill="#063855" fillRule="evenodd" />
    </svg>
  )
}

export default SvgComponent
