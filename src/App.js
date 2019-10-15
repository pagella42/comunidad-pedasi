import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import User from './user/User';
import Admin from './admin/Admin'
import Explore from './admin/landing/explore/Explore'
import Search from './admin/landing/search/Search'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/user">User</Link>
          <Link to="/admin">Admin</Link>
          
          {/* ==== User routes below ==== */}
          <Route path="/user" exact render={() => <User />} />

          {/* ==== Admin routes below ==== */}
          <Route path="/admin" exact render={() => <Admin />}/>
          <Route path="/admin/landing/explore" exact render={() => <Explore />} />
          <Route path="/admin/landing/search" exact render={() => <Search />} />
        </div>
      </Router>
    );
  }
}

export default App;
