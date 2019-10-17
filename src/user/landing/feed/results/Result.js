import React, { Component } from 'react';
import axios from 'axios';
class Result extends Component {
    constructor() {
        super()
        this.state = {
          comment: ''
        }
    }
    update = async (event) => {
        await this.setState({
            [event.target.name]: event.target.value,
        })
    }
    async comment(){
       await axios.post('', {comment: this.state.comment})
       //clean comment input \/
       this.setState({comment: ""})
    }
    render() {
    let post = this.props.post
        return (<div>
            <div>{post.user.name}</div>
            <div>{post.title}</div>
            <div>{post.points}</div>
            <div>{post.content}</div>
            <div>{post.address}</div>
            <div>{post.category}</div>
            <div>IMAGES</div>
            <div>TOWN RESPONSE</div>

            {/* post comment  \/ */}
            <input type="text" name="comment" placeholder="Comment something" value={this.state.comment} onChange={this.update}/>
            <button onClick={this.comment}>Send comment</button>

            {/* render comments \/ */}
            <div>{post.comments.map(c=> <div>{/* GET USERNAME AND CONTENT */}</div>)}</div>
        </div>)
    }
}
export default Result;