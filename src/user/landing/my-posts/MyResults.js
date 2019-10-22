import React, { Component } from 'react';
import MyResult from './MyResult';
class MyResults extends Component {
  
   


    
    render() {
         console.log(this.props.posts)
         
        
        return (<div>
            {
            
               this.props.posts ? this.props.posts.map(d => <MyResult phone={this.props.phone} post={d} />) : null
            }
        </div>)
        
    }

}
export default MyResults;