import React, { Component } from 'react';
import Feed from './feed/Feed';
import Login from '../../admin/login/Login';
class Landing extends Component {
    
    render() {
        return (<div>
            
            
            <Feed phone={this.props.phone}/>
        </div>)
    }
}
export default Landing;