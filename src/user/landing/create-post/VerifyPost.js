import React, { Component } from 'react';


class VerifyPost extends Component {

    reviewPost = (event) => {
        debugger
        let name = event.currentTarget.name
        this.props.reviewPost(name)
    }

    render() {
        return (
            <div>
                <div>Are you sure to post this post ? </div>
                <div>
                    <div>{this.props.post.title}</div>
                    <div>{this.props.post.content}</div>
                    <div>{this.props.post.address}</div>
                </div>
                <button name="confirm" onClick={this.reviewPost}>Confirm</button>
                <button name="review" onClick={this.reviewPost}>Go back to post</button>
            </div>
        );
    }
}

export default VerifyPost;