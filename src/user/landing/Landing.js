import React, { Component } from 'react';
import Feed from './feed/Feed';
import Header from './Header';
class Landing extends Component {

    render() {
        return (<div>
            <Header/>
            <Feed phone={this.props.phone}/>
        </div>)
    }
}
export default Landing;