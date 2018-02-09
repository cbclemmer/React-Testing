import * as React from 'react'
import Down from '../containers/down'
import Up from '../containers/up'

export interface IHelloProps {
  counter: number
}

export default(props: IHelloProps) => <h1>{props.counter} <Up>Up</Up> <Down>Down</Down></h1>
