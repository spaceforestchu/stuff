import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import { Nav, Signup, Signin, CreatePost } from './components/containers';
import NotFound from './components/containers/NotFound/NotFound'

class App extends Component {

  render() {

    return (

        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Layout} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/Signup" component={Signup} />
            <Route exact path="/createpost" component={CreatePost} />
            <Route component={NotFound} />
          </Switch>
        </div>

    );
  }
}

export default App;
