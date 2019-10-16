import React, { Component } from 'react';
import Results from './results/Results'
class Feed extends Component {
    constructor(){
        super()
        this.state={}
    }

    componentDidMount(){
        //request data from DB
    }

    render() {

        return (<div>
            {/* call filter comp */}
            <Results data={this.state.data}/>
        </div>)
    }
}
export default Feed;