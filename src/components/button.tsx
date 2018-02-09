import * as React from 'react'

export interface IButtonProps {
  onClick: any,
  children: string
}

export default (props: IButtonProps) =>
  <a href="#" onClick={ (e) => {
    e.preventDefault()
    props.onClick()
  }}>
  {props.children}
  </a>
