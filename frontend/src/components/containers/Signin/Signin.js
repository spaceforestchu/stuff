import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Signin.css'

import { handleSigninServerAPI, handleJWTExpirationApiAndLogin } from '../../redux/action/authUserAction';

class Signin extends Component {

  state = {
    email: '',
    password: '',
    error: null,
    errorMessage: ''
  }

  componentDidMount() {
   this.props.handleJWTExpirationApiAndLogin(this.props.history)
  }

  handleSigninInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSigninSubmit = (event) => {
      event.preventDefault();
      this.props.handleSigninServerAPI(this.state, this.props.history);

      this.form.reset();  
  }

  render() {

    console.log(this.props)

    return (
      <form onSubmit={this.handleSigninSubmit} className="form-signin text-center signinStyle" ref={(node) => this.form = node}>
        {this.props.error ? <div>{this.props.error.message}</div> : ''}
        <h1 className="h3 mb-3 font-weight-normal">Please Sign In</h1>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input 
          type="text" 
          id="inputEmail" 
          className="form-control" 
          placeholder="Email address" 
          required 
          autoFocus 
          name="email"
          onChange={this.handleSigninInput}
          />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input 
          type="text" 
          id="inputPassword" 
          className="form-control" 
          placeholder="Password" 
          required 
          name="password"
          onChange={this.handleSigninInput}
          />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
        <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
      </form>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    error: store.error
  }
}

export default connect(mapStateToProps, { handleSigninServerAPI, handleJWTExpirationApiAndLogin })(Signin);