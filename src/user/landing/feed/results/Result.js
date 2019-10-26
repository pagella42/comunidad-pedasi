import React, { Component } from 'react';
import axios from 'axios';
import './result.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons'

import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withTranslation } from 'react-i18next';


library.add(
    faThumbsUpRegular,
    faThumbsUpSolid
)

class Result extends Component {
    constructor() {
        super()
        this.state = {
            comment: '',
            comments: [],
            responses: [],
            vote: {
                userVoted: null,
                votesCount: null,
            }
        }
    }

    update = async (event) => {
        await this.setState({
            [event.target.name]: event.target.value,
        })
    }

    getVotes = async () => {
        let response = await axios.get(`http://localhost:4000/data/votes/${this.props.post._id}/${this.props.phone}`)
        let vote = { userVoted: response.data.voted, votesCount: response.data.votes }
        this.setState({ vote: vote })
    }

    getComments = async () => {
        let response = await axios.get(`http://localhost:4000/data/comments/${this.props.post._id}`)
        response.data.sort((a, b) => (a.date > b.date) ? -1 : 1)
        this.setState({ comments: response.data })
    }

    getResponses = async () => {
        let response = await axios.get(`http://localhost:4000/data/responses/${this.props.post._id}`)
        response.data.sort((a, b) => (a.date > b.date) ? -1 : 1)
        this.setState({ responses: response.data })
    }

    async componentDidMount() {
        this.getComments()
        this.getResponses()
        this.getVotes()
    }

    UNSAFE_componentWillReceiveProps(){
        this.getVotes()
    }

    vote = async (e) => {
        let name = e.currentTarget.id
        if (name === "post") {
            await axios.post(`http://localhost:4000/data/votes/${this.props.post._id}/${this.props.phone}`)
        } else {
            await axios.delete(`http://localhost:4000/data/votes/${this.props.post._id}/${this.props.phone}`)
        }
        await axios.put(`http://localhost:4000/data/post/points/${this.props.post._id}/${name}`)
        await this.props.getPosts()
        this.getVotes()
    }

    comment = async () => {
        let data = { content: this.state.comment, date: new Date(), postId: this.props.post._id, usersPhone: this.props.phone }
        await axios.post(`http://localhost:4000/data/comment`, data)
        this.getComments()
    }


    render() {
        const {t,i18n}=this.props

        let post = this.props.post
        return (<div class="resultcontainer">
            <ExpansionPanel>

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                    <div> <span class="postcategory">Category: {post.category} </span> • <span class="postdate">Posted on: {post.date.slice(0, 10)}</span></div>
                    <Typography > {post.title}  </Typography>
                    <span className='postlike'> {this.state.comments.length} Comments • {this.state.vote.votesCount} Likes</span>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <div class="postname"> {post.anonymous ? "Anonymous Post" : <span>User: {post.user.name}</span>}</div>
                    <div>{post.content}</div>
                    Location:<div>{post.address}</div>
                    Status: {post.status}
                    {post.picture ? <img id="img"  src={post.picture} alt="concern picture"></img>: null}
                    <div> {JSON.parse(localStorage.userLogin).isLoggedIn ?
                        <div>{this.state.vote.userVoted ?
                            <div class="like" id="delete" onClick={this.vote}><FontAwesomeIcon icon={['fas', 'thumbs-up']} /></div>
                            : <div class="like" id="post" onClick={this.vote}><FontAwesomeIcon icon={['far', 'thumbs-up']} /></div>
                        }</div> :
                        <div class="like" id="post" onClick={this.props.loginPopup}><FontAwesomeIcon icon={['far', 'thumbs-up']} /></div>
                    }
                        {this.state.vote.votesCount}</div>



{this.state.responses.length === 0
    ? <div>No response.</div>
    : this.state.responses.map(r => <div> Response: {r.content} Employee: {r.employee} </div>)}



<input type="text" name="comment" placeholder="Comment something" value={this.state.comment} onChange={this.update} />
{JSON.parse(localStorage.userLogin).isLoggedIn ?
    <button onClick={this.comment}>Send comment</button> :
    <button onClick={this.props.loginPopup}>Send comment</button>
}


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
                </ExpansionPanelDetails>
            </ExpansionPanel>

           
            


        

        </div>)
    }
}
export default withTranslation('translation') (Result);
