import React, { Component } from 'react'

import { signup, handleJWTExpirationApiAndLogin } from '../../redux/action/authUserAction';

import { connect } from 'react-redux';

import './Signup.css'

class Signup extends Component {

  state = {
    email: '',
    password: '',
    zipCode: '',
    error: null,
    errorMessage: '',
    successFullySignedup: null
  }

  componentDidMount() {
    this.props.handleJWTExpirationApiAndLogin(this.props.history)
  }

  handleSignupInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSignupSubmit = (event) => {
      event.preventDefault();
      //button that triggers signup action in authUserAction
      console.log(1)
      this.props.signup(this.state)

      this.form.reset();  
  }

  redirectToSignin = () => {
   setTimeout(() => {
    this.props.history.push('/signin')
   }, 2000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('--------')
    console.log(prevProps)
    console.log(prevState)
  }

  render() {

    let signupStatus;
    const { message } = this.props.authUser;
    const { errorMessage } = this.props.error;
    if (!message) {
      signupStatus = (
        <form onSubmit={this.handleSignupSubmit} className="form-signin text-center signupStyle" ref={(node) => this.form = node}>
          {errorMessage ? <div>{errorMessage}</div> : ''}
          <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input 
            type="text" 
            id="inputEmail" 
            className="form-control" 
            placeholder="Email address" 
            required 
            autoFocus 
            name="email"
            onChange={this.handleSignupInput}
            />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input 
            type="text" 
            id="inputPassword" 
            className="form-control" 
            placeholder="Password" 
            required 
            name="password"
            onChange={this.handleSignupInput}
            />
          <label htmlFor="zipCode" className="sr-only">zip code</label>
          <input 
            type="text" 
            id="zipCode" 
            className="form-control" 
            placeholder="zipcode" 
            required 
            name="zipCode"
            onChange={this.handleSignupInput}
            />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
          <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
      </form>
      )
    } else {
      console.log(4, '---')
      console.log(this.props)
      signupStatus = (
        <div>{message} {this.redirectToSignin()}</div>
      )
    }

    return (
      <React.Fragment>
        {signupStatus}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    authUser: store.authUser,
    error: store.error
  }
}


export default connect(mapStateToProps, { signup, handleJWTExpirationApiAndLogin })(Signup);
