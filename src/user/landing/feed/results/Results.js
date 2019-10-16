import React, { Component } from 'react';
import Result from './Result'
class Results extends Component {
   
    

    render() {
        return (<div>
            {this.props.data.map(d=> <Result data={d}/>)}
        </div>)
    }
}
export default Results;