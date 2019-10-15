import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import User from './user/User';
import Admin from './admin/Admin'
import UserLogin from './user/UserLogin';
import UserLanding from './user/landing/UserLanding'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* ==== User routes below ==== */}
          <Route path="/user" exact render={() => <User />} />
          <Route path="/user/login" exact render={() => <UserLogin />} />
          <Route path="/user/landing" exact render={() => <UserLanding />} />

          {/* ==== Admin routes below ==== */}
          <Route path="/admin" exact render={() => <Admin />}/>
        </div>
      </Router>
    );
  }
}

export default App;
