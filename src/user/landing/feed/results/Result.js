import React, { Component } from 'react';
import axios from 'axios';
import './result.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withTranslation } from 'react-i18next';
import Consts from '../../../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE


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
        let response = await axios.get(CREATE_ROUTE(`data/votes/${this.props.post._id}/${this.props.phone}`))
        let vote = { userVoted: response.data.voted, votesCount: response.data.votes }
        this.setState({ vote: vote })
    }

    getComments = async () => {
        let response = await axios.get(CREATE_ROUTE(`data/comments/${this.props.post._id}`))
        response.data.sort((a, b) => (a.date > b.date) ? -1 : 1)
        this.setState({ comments: response.data })
    }

    getResponses = async () => {
        let response = await axios.get(CREATE_ROUTE(`data/responses/${this.props.post._id}`))
        response.data.sort((a, b) => (a.date > b.date) ? -1 : 1)
        this.setState({ responses: response.data })
    }

    async componentDidMount() {
        this.getComments()
        this.getResponses()
        this.getVotes()
    }

    UNSAFE_componentWillReceiveProps() {
        this.getVotes()
    }

    vote = async (e) => {
        let name = e.currentTarget.id
        if (name === "post") {
            await axios.post(CREATE_ROUTE(`data/votes/${this.props.post._id}/${this.props.phone}`))
        } else {
            await axios.delete(CREATE_ROUTE(`data/votes/${this.props.post._id}/${this.props.phone}`))
        }
        await axios.put(CREATE_ROUTE(`data/post/points/${this.props.post._id}/${name}`))
        await this.props.getPosts()
        this.getVotes()
    }

    comment = async () => {
        let data = { content: this.state.comment, date: new Date(), postId: this.props.post._id, usersPhone: this.props.phone }
        await axios.post(CREATE_ROUTE(`data/comment`), data)
        this.getComments()
        this.setState({ comment: '' })
    }


    render() {
        const { t, i18n } = this.props

        let post = this.props.post
        console.log(post.address)

        return (<div class="resultcontainer">
            <ExpansionPanel>

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                    <div> <span class="postcategory">Category: {post.category} </span> • <span class="postdate">Posted on: {post.date.slice(0, 10)}</span></div>
                    <Typography > {post.title ? post.title[0].toUpperCase() + post.title.slice(1) : null}  </Typography>
                    <span className='postlike'> {this.state.comments.length} Comments • {this.state.vote.votesCount} Likes</span>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <Typography color="textSecondary" gutterBottom> {post.anonymous ? <span><FontAwesomeIcon icon={faUser} /> "Anonymous Post" </span> : <span> <FontAwesomeIcon icon={faUser} /> {post.user.name} </span>} </Typography>

                    <Typography gutterBottom >

                  <span style={{ fontSize: "1.2em" }}>      {post.title ? post.title[0].toUpperCase() + post.title.slice(1) : null}</span>

                    <span style={{ color: "gray" }}> | </span>
                        <span> {JSON.parse(localStorage.userLogin).isLoggedIn ?
                            <span>{this.state.vote.userVoted ?
                                <span class="like" id="delete" onClick={this.vote}><FontAwesomeIcon icon={['fas', 'thumbs-up']} /></span>
                                : <span class="like" id="post" onClick={this.vote}><FontAwesomeIcon icon={['far', 'thumbs-up']} /></span>
                            }</span> :
                            <span class="like" id="post" onClick={this.props.loginPopup}><FontAwesomeIcon icon={['far', 'thumbs-up']} /></span>
                        }
                            {this.state.vote.votesCount}</span>

                    </Typography>

                    <hr style={{ width: "100%" }}></hr>

                    <div className="bigcont">
                        <div>
                            <Typography color="textSecondary" gutterBottom> Location: <span>{post.address}</span> </Typography>


                            <div className="contcont"><div>{post.content[0].toUpperCase() + post.content.slice(1)}</div></div>

                        </div>
                        <div>
                            {post.picture ? <img className="img" src={post.picture} alt="concern picture"></img> : null}
                        </div>
                    </div>
                            <br></br>



                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                            <div style={{ fontWeight: "bold" }}> Comments</div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {this.state.comments.length !== 0 ?
                                <div>
                                    {this.state.comments.map(c => {
                                        return <div>  <span style={{ fontWeight: "bold" }}>{c.user}:</span>  <span>{c.content} </span> •  </div>
                                    })} </div>
                                : <div>No Comments.</div>
                            }
                            <input type="text" name="comment" placeholder="Comment something" value={this.state.comment} onChange={this.update} />
                            {JSON.parse(localStorage.userLogin).isLoggedIn ?
                                <button onClick={this.comment}>Send comment</button> :
                                <button onClick={this.props.loginPopup}>Send comment</button>
                            }
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <br></br>
                    <ExpansionPanel>

                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                            <div style={{ fontWeight: "bold" }}>Municipality response</div>
                            <Typography color="textSecondary" gutterBottom> <div>Status: {post.status}</div></Typography>


                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {this.state.responses.length === 0
                                ? <div>No response.</div>
                                : this.state.responses.map(r => <div> Response: {r.content} Employee: {r.employee} </div>)}

                        </ExpansionPanelDetails>
                    </ExpansionPanel>






                </ExpansionPanelDetails>
            </ExpansionPanel>







        </div>)
    }
}
export default withTranslation('translation')(Result);


