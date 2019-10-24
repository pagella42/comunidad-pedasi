import React, { Component } from 'react';
import MyResult from './MyResult';
import './myresults.css'
class MyResults extends Component {
  
   


    
    render() {
         console.log(this.props.posts)
         
        
        return (<div id="myresultscontainer">
            <div id="myresultsinner">
            {
            
               this.props.posts ? this.props.posts.map(d => <MyResult phone={this.props.phone} post={d} />) : null
            }
        </div></div>)
        
    }

}
export default MyResults;