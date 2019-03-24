import React, { Component } from 'react'
import ShowZipCode  from './ShowZipCode/ShowZipCode';
//import { HandleGetZipCodeAPI, handleQueryByZipCodeAPI } from '../API/zipCodeAPI';

import { connect } from 'react-redux'

import { HandleGetZipCodeAPI, handleQueryByZipCodeAPI } from '../../redux/action/zipCodeAction';

class ZipCode extends Component {

  state = {
    zipCodes: [],
    error: null,
    errorMessage: ''
  }

  componentDidMount() {

  
    this.props.HandleGetZipCodeAPI()

  }

  handleSelectZipCode = (zipCode) => {
    
    this.props.handleQueryByZipCodeAPI(zipCode)
  }

  render() {

    let zipCodesList = this.props.zipCode.zipCodes.map((element) => (
      <ShowZipCode 
        zipCode={element.zipCode} 
        key={element._id} 
        handleSelectZipCode={this.handleSelectZipCode}
        />
    ))

    return (
      <div>
        { this.state.error ? <div>{this.state.errorMessage}</div> : ''}
        {zipCodesList}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    zipCode: state.zipCode
  }
}

export default connect(mapStateToProps, { HandleGetZipCodeAPI, handleQueryByZipCodeAPI})(ZipCode)
