import React, { Component } from 'react';
import Result from './Result'
class Results extends Component {
   
    

    render() {
        return (<div>
            {this.props.posts.map(d=> <Result post={d}/>)}
        </div>)
    }
}
export default Results;