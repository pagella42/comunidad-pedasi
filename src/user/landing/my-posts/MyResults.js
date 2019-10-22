import React, { Component } from 'react';
import MyResult from './MyResult';
class MyResults extends Component {
   constructor(){
       super()
       this.state={
           posts:[]
       }
   }
   
   async componentDidMount() {
       this.setState({
           posts: this.props.posts
       })
   }
    
    render() {
         
        
        return (<div>
            {
            
               this.state.posts ? this.state.posts.map(d => <MyResult phone={this.props.phone} post={d} />) : null
            }
        </div>)
        
    }

}
export default MyResults;