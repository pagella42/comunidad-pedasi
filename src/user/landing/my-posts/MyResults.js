import React, { Component } from 'react';
import MyResult from './MyResult';
class MyResults extends Component {
   
    
    render() {
        return (<div>
            {
                this.props.posts.map(d => <MyResult phone={this.props.phone} post={d} />)
            }
        </div>)
        
    }

}
export default MyResults;