import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import User from './user/User';
import Admin from './admin/Admin'
import Explore from './admin/landing/explore/Explore';
import ImageUpload from './ImageUpload/ImageUpload';
import ResultDetail from './admin/results/ResultDetails';
import MyPosts from './user/landing/my-posts/MyPosts';
import Search from './admin/landing/search/Search';
import Update from './user/update/Update';
import SignUp from './user/signup/SignUp'
import Landing from './user/landing/Landing';
import { withTranslation } from 'react-i18next';
import Manage from './admin/manage/Manage';
import LandingPage from './user/landing/LandingPage';




import Fab from '@material-ui/core/Fab';


class App extends Component {
  constructor() {
    super()
    this.state = {
      loginPopupState: false,
      english: true,
      userLogin:{ phone: "", isLoggedIn: false },
    }
  }  

  changeLanguage = () => {
    const { t, i18n } = this.props
    if (this.state.english) {
      i18n.changeLanguage('es', (() => this.setState({ english: false })))
    } else { i18n.changeLanguage('en', (() => this.setState({ english: true }))) }
  }

  loginPopup = () => {
    this.setState({
      loginPopupState: !this.state.loginPopupState
    })
  }


  login = phone => {
    let userLogin = { phone: phone, isLoggedIn: true };
    this.setState({ userLogin: userLogin });
    localStorage.userLogin = JSON.stringify(userLogin);
    this.setState({ loginPopup: false });
  };

  logout = () => {
    let userLogin = { username: "", isLoggedIn: false };
    localStorage.userLogin = JSON.stringify(userLogin)
    this.setState({ userLogin: userLogin });
  };
  
  render() {
    return (
      <Router>
        <div id="backgroundimg"> </div>
        <div id="appcont">

        <Fab id="lanbutt" variant="extended" aria-label="language" onClick={this.changeLanguage}>
        {this.state.english ? "Español" : "English"}
       </Fab>

          <Route path="/" exact render={() => <LandingPage />} />
          
          {/* ==== User routes below ==== */}
          <Route path="/user" render={() => <User 
          userLogin={this.state.userLogin} 
          login={this.login} 
          logout={this.logout} 
          changeLanguage={this.changeLanguage} 
          english={this.state.english} 
          loginPopup={this.loginPopup} 
          loginPopupState={this.state.loginPopupState} />} />
          <Route path="/user/myposts" exact render={() => <MyPosts />} />
          <Route path="/user/signUp" exact render={() => <SignUp />} />
          <Route path='/user/updateinfo' exact render={() => <Update logout={this.logout}/>} />
          <Route path='/user/home' exact render={() => <Landing loginPopup={this.loginPopup} />} />


          {/* ==== Admin routes below ==== */}
          <Route path="/admin" exact render={() => <Admin changeLanguage={this.changeLanguage} english={this.state.english} loginPopup={this.loginPopup} loginPopupState={this.state.loginPopupState} />} />
          <Route path="/admin/explore" exact render={() => <Explore />} />
          <Route path="/admin/search" exact render={() => <Search />} />
          <Route path="/admin/manage" exact render={() => <Manage />} />
          <Route path="/admin/resultdetails/:id" exact render={({ match }) => <ResultDetail match={match} />} />
          <Route path="/imageUpload" exact render={() => <ImageUpload />} />
        </div>
      </Router>
    );
  }
}
export default withTranslation('translation')(App);