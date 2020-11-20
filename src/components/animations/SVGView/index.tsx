import React from "react"
import logo from '../../../assets/svg/logo.svg'

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SVGView({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    logo
  )
}

export default SVGView
