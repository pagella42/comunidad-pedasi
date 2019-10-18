import React, { Component } from 'react';
import axios from 'axios';

class Result extends Component {
    constructor() {
        super()
        this.state = {
            comment: '',
            comments: [], 
            responses: [],
        }
    }
    update = async (event) => {
        await this.setState({
            [event.target.name]: event.target.value,
        })
    }

    async componentDidMount() {
        let data = await axios.get(`/data/comments/${this.props.post._id}`)
        this.setState({ comments: data })
    }


    comment = async () => {
        //NEED TO RECEIVE PHONE FROM UP
        await axios.post(`/data/comment/${this.props.post._id}/${this.props.phone}`, { content: this.state.comment, date: new Date() })

        this.setState({ comment: "" })
    }



    render() {
        let post = this.props.post
        return (<div>
            <br />
            <div>{post.user.name}</div>
            <div>{post.title}</div>
            <div>{post.points}</div>
            <div>{post.content}</div>
            <div>{post.address}</div>
            <div>{post.category}</div>
            <div><img src={post.picture} alt="concern picture" /></div>


            {/* render responses */}
            {post.responses.length === 0 
                ? <div>No response.</div> 
                : post.reponses.map(r => <div> Response: {r.content} Employee: {r.employee} </div>)}
            {/* <div>{post.responses === undefined
                ? <div></div>
                : post.reponses.map(r => <div> Response: {r.content} Employee: {r.employee} </div>) }</div> */}

            {/* post comment  \/ */}
            <input type="text" name="comment" placeholder="Comment something" value={this.state.comment} onChange={this.update} />
            <button onClick={this.comment}>Send comment</button>

            {/* render comments \/ */}
            <div>{this.state.comments.map(c => {
                return <div>
                    <div>User: {c.user.name}</div>
                    <div>{c.content}</div>
                </div>
            })}</div>
        </div>)
    }
}
export default Result;