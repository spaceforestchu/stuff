import React, { Component } from 'react'

export default class ShowZipCode extends Component {

  handleSelectZipCode = (zipCode,event) => {
    event.preventDefault();
    this.props.handleSelectZipCode(zipCode)
  }


  render() {

    return (
      <div className="card" style={{width: '18rem'}}>
       <div className="card-body">
          <p onClick={this.handleSelectZipCode.bind(this, this.props.zipCode)} className="card-text text-center">{this.props.zipCode}</p>
       </div>
     </div>
    )
  }
}
