import React, { Component } from 'react';
class MyResult extends Component {
    render() {
        return (<div>
            {this.props.post.phone}
        </div>)
    }
}
export default MyResult;