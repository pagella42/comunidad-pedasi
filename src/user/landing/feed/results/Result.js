import React, { Component } from 'react';
import axios from 'axios';

class Result extends Component {
    constructor() {
        super()
        this.state = {
            comment: '',
            comments: [],
            responses: [],
            vote : {}
        }
    }
    update = async (event) => {
        await this.setState({
            [event.target.name]: event.target.value,
        })
    }

    getVotes = async () => {
        let response = await axios.get(`http://localhost:4000/data/votes/${this.props.post._id}/${this.props.phone}`)
        let vote = {userVoted: response.data.voted, votesCount: response.data.votes}
        this.setState({vote: vote})
    }

    getComments = async () => {
        let response = await axios.get(`http://localhost:4000/data/comments/${this.props.post._id}`)
        response.data.sort((a, b) => (a.date > b.date) ? -1 : 1)
        this.setState({ comments: response.data })
    }

    getResponses = async () => {
        let response = await axios.get(`http://localhost:4000/data/responses/${this.props.post._id}`)
        response.data.sort((a, b) => (a.date > b.date) ? -1 : 1)
        this.setState({ responses : response.data})
    }

    async componentDidMount() {
        this.getComments()
        this.getResponses()
        this.getVote()
    }

    vote = async (e) => {
        let name = e.currentTarget.name
        await axios[name](`http://localhost:4000/data/votes/${this.props.post._id}/${this.props.phone}`)
        await axios.put(`http://localhost:4000/data/posts/points/${this.props.post._id}/${name}`)
        this.getVote()
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
            <div>Access points from post{post.points}</div>
            <div>Access points from votes count{this.state.vote.votesCount}</div>

            {this.state.voted ? 
            <button name="delete" onClick={this.vote}>Take out vote</button>    
            : <button name="post" onClick={this.vote}>vote</button>   
        }
        
            <div>{post.content}</div>
            <div>{post.address}</div>
            <div>{post.category}</div>
            <div><img src={post.picture} alt="concern picture" /></div>


            {/* render responses */}
            {this.state.responses.length === 0
                ? <div>No response.</div>
                : this.state.responses.map(r => <div> Response: {r.content} Employee: {r.employee} </div>)}

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
        </div>)
    }
}
export default Result;