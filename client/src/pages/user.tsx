import * as React from 'react'

export default (props: any) => {
  return (
    <div>
      <p>This is the users page id: {props.match.params.id} </p>
    </div>
  )
}
