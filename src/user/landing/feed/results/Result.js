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

    getComments = async () => {
        let response = await axios.get(`http://localhost:4000/data/comments/${this.props.post._id}`)
        // response.data.sort((a, b) => (a.date > b.date) ? -1 : 1) // uncomment when Tomer update response
        this.setState({ comments: response.data })
    }

    async componentDidMount() {
        this.getComments()
    }


    comment = async () => {
        let data = { content: this.state.comment, date: new Date(), postId: this.props.post._id, usersPhone: this.props.phone }
        await axios.post(`http://localhost:4000/data/comment`, data)
        this.getComments()
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

            {/* post comment  \/ */}
            <input type="text" name="comment" placeholder="Comment something" value={this.state.comment} onChange={this.update} />
            <button onClick={this.comment}>Send comment</button>

            {/* render comments \/ */}
            {this.state.comments.length !== 0 ?
                <div>
                {this.state.comments.map(c => {
                    return <div>
                        <div>User: {c.user}</div>
                        <div>{c.content}</div>
                    </div>
                })}
                </div>
            : <div>No Comments.</div>
            }
        </div>     )
        }
    }
export default Result;