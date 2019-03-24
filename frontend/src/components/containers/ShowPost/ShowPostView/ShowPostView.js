import React from 'react'

export default function ShowPostView(props) {
  return (
    <div className="card">
   
    <div className="card-body">
      <img  className="rounded img-thumbnail" src={props.image} alt="" style={{width: 250, height: 250}}/>
      <p>{props.post}</p>
      <span>{props.timestamp}</span>
    </div>
</div>
  )
}
