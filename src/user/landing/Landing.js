import React, { Component } from 'react';
import Feed from './feed/Feed';
class Landing extends Component {

    render() {
        return (<div>
            // Landing User
            <Feed phone={this.props.phone}/>
        </div>)
    }
}
export default Landing;