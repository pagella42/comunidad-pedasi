import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import User from './user/User';
import Admin from './admin/Admin'
import CreatePost from './user/landing/create-post/CreatePost';
import Explore from './admin/landing/explore/Explore';
import ImageUpload from './ImageUpload/ImageUpload';
import ResultDetail from './admin/results/ResultDetails';
import MyPosts from './user/landing/my-posts/MyPosts';
import Search from './admin/landing/search/Search';
import Update from './user/update/Update';

import SignUp from './user/signup/SignUp'
// import Update from './user/landing/Update';
import { withTranslation } from 'react-i18next';
// import SignUp from './user/SignUp'

import Landing from './user/landing/Landing';


class App extends Component {
constructor(){
  super()
  this.state={
    loginPopupState: false,
    english: true
  }
}

changeLanguage = () => {
  const {t,i18n} = this.props
  if(this.state.english){
    i18n.changeLanguage('es',(()=>this.setState({english:false})))
  }else{i18n.changeLanguage('en',(()=>this.setState({english:true})))}
}

loginPopup = () => {
  this.setState({
    loginPopupState: !this.state.loginPopupState
  })
}


 render() {
   return (
     <Router>
       <div>
         
         {/* ==== User routes below ==== */}
         <Route path="/user"  render={() => <User changeLanguage={this.changeLanguage} english={this.state.english} loginPopup={this.loginPopup} loginPopupState={this.state.loginPopupState}/>} />
         <Route path="/user/myposts" exact render={() => <MyPosts/>} />
         <Route path="/user/signUp" exact render={() => <SignUp/>} /> 
        <Route path='/user/updateinfo' exact render ={() => <Update /> } />
        <Route path='/user/home' exact render ={() =>  <Landing loginPopup={this.loginPopup}/>} />
      

         {/* ==== Admin routes below ==== */}
         <Route path="/admin" exact render={() => <Admin changeLanguage={this.changeLanguage} english={this.state.english} loginPopup={this.loginPopup} loginPopupState={this.state.loginPopupState}/> }/>
         <Route path="/admin/explore" exact render={() => <Explore />} />
         <Route path="/admin/search" exact render={() => <Search />} />
         <Route path="/admin/resultdetails/:id" exact render={({match}) => <ResultDetail match={match} />} />
          <Route path="/imageUpload" exact render={() => <ImageUpload/>}/>
       </div>
     </Router>
   );
 }
}
export default withTranslation('translation') (App);