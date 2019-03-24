import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import { connect } from 'react-redux';

import { logoutUser } from '../../redux/action/authUserAction';

const isActiveFunc = (match, location) => {
  return match;
}

class Nav extends Component {
  

  render(){
    const { user } = this.props.authUser;
    let nav;
    if(user) {
      nav = (
        <React.Fragment>
         <li className="nav-item active">
            <span className="nav-link"><NavLink exact activeClassName="active" isActive={isActiveFunc} to='/'>Home</NavLink></span>
          </li>
          <li className="nav-item active">
            <span className="nav-link"><NavLink exact activeClassName="active" isActive={isActiveFunc} to='/editprofile'>Edit profile</NavLink></span>
          </li>
          <li className="nav-item active">
            <span className="nav-link"><NavLink exact activeClassName="active" isActive={isActiveFunc} to='/createpost'>Create Post</NavLink></span>
          </li>
          <li className="nav-item active">   
            <span className="nav-link"><a onClick={this.props.logoutUser}  href='/signin'>Log out</a></span>
          </li>
     </React.Fragment>
      )
    } else {
      nav = (
        <React.Fragment>
            <li className="nav-item active">
              <span className="nav-link"><NavLink exact activeClassName="active" isActive={isActiveFunc} to='/'>Home</NavLink></span>
            </li>
           <li className="nav-item active">
              <span className="nav-link"><NavLink exact activeClassName="active" isActive={isActiveFunc} to='/signup'>Sign Up</NavLink></span>
           </li>
          <li className="nav-item active">   
            <span className="nav-link"><NavLink exact activeClassName="active" isActive={isActiveFunc} to='/signin'>Sign In</NavLink></span>
          </li>
        </React.Fragment>
      )
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {nav}
        </ul>
      </div>
    </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser
  }
}

export default connect(mapStateToProps, { logoutUser })(Nav);