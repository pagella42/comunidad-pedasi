import React, { Component } from 'react';
import axios from 'axios';
import './result.css'
import moment from 'moment'
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

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

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
            },
        }
    }

    update = async (event) => {
        await this.setState({
            [event.target.name]: event.target.value,
        })
    }

    getVotes = async () => {
        let response
        if (this.state.phone) {
            response = await axios.get(CREATE_ROUTE(`data/votes/${this.props.post._id}/${this.props.phone}`))
        } else {
            response = await axios.get(CREATE_ROUTE(`data/votes/${this.props.post._id}`))
        }
        let vote = { userVoted: response.data.voted, votesCount: response.data.votes }
        this.setState({ vote: vote })
    }

    async componentDidMount() {
        let vote = {
            userVoted: null,
            votesCount: this.props.post.points
        }
        this.setState({ vote: vote })
    }

    vote = (e) => {
        let name = e.currentTarget.id
        if (name === "post") {
            //this.props.updateOnelike(this.props.post._id, 1)
            axios.post(CREATE_ROUTE(`data/votes/${this.props.post._id}/${this.props.phone}`))
        }
        // else {
        //     //this.props.updateOnelike(this.props.post._id, -1)
        //     axios.delete(CREATE_ROUTE(`data/votes/${this.props.post._id}/${this.state.phone}`))
        // }
        axios.put(CREATE_ROUTE(`data/post/points/${this.props.post._id}/${name}`))
            .then(() => {
                this.props.getPosts()
            })
    }

    comment = () => {
        let data = { content: this.state.comment, date: new Date(), postId: this.props.post._id, usersPhone: this.props.phone }
        axios.post(CREATE_ROUTE(`data/comment`), data)
        data = { content: this.state.comment, date: new Date(), postId: this.props.post._id, user: this.props.user }
        this.props.updateOnecomment(this.props.post._id, data)
        this.setState({ comment: '' })
    }



    render() {
        const { t, i18n } = this.props


        let post = this.props.post



        return (<div className="resultcontainer">
            <ExpansionPanel>

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                    <div> <span className="postcategory">Category: {post.category} </span> • <span className="postdate">Posted on: {moment(post.date).fromNow()}</span></div>
                    <Typography > {post.title ? post.title[0].toUpperCase() + post.title.slice(1) : null}  </Typography>
                    <span className='postlike'> {post.comments.length} Comments • {this.props.post.points} Likes</span>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <Typography color="textSecondary" gutterBottom> {post.anonymous ? <span><FontAwesomeIcon icon={faUser} /> "Anonymous Post" </span> : <span> <FontAwesomeIcon icon={faUser} /> {post.user.name} </span>} </Typography>

                    <Typography gutterBottom >

                        <span style={{ fontSize: "1.2em" }}>      {post.title ? post.title[0].toUpperCase() + post.title.slice(1) : null}</span>

                        <span style={{ color: "gray" }}> | </span>
                        <span>

                            {
                                localStorage.userLogin !== undefined ?
                                    JSON.parse(localStorage.userLogin).isLoggedIn ?

                                        <span className="like" id="post" onClick={this.vote}>
                                            <FontAwesomeIcon icon={['far', 'thumbs-up']} />
                                        </span>
                                        :
                                        <span className="like" id="post" onClick={this.props.loginPopup}>
                                            <FontAwesomeIcon icon={['far', 'thumbs-up']} />
                                        </span>
                                    : null
                            }


                            {this.props.post.points}</span>

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
                            {post.comments ?
                                <div>
                                    {post.comments.map(c => {
                                        return <div>
                                            <span style={{ fontWeight: "bold" }}> {c.user ? c.user.name : null} :</span>
                                            <span>{c.content} </span>
                                            <span style={{ color: "gray" }}>  • ({c.date ? moment(c.date).fromNow() : null})</span>
                                        </div>
                                    })}
                                </div>
                                : <div>No Comments</div>
                            }
                            <br></br>
                            <div>
                                <TextField id="standard-comment-input" label="Comment" type="text" value={this.state.comment} onChange={this.update} margin="normal" name="comment" />
                                {localStorage.userLogin !== undefined ?
                                    JSON.parse(localStorage.userLogin).isLoggedIn ?
                                        <Button size="small" onClick={this.comment}>Send</Button> :
                                        <Button size="small" onClick={this.comment}>Send</Button> : null}
                            </div>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <br></br>
                    <ExpansionPanel>

                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                            <div style={{ fontWeight: "bold" }}>Municipality response</div>
                            <Typography color="textSecondary" gutterBottom> <span>Status: {post.status}</span></Typography>


                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {post.responses.length === 0
                                ? <div>No response.</div>
                                : post.responses.map(r => <div> <span style={{ fontWeight: "bold" }}> {r.employee}: </span> {r.content}  <span style={{ color: "gray" }}>  • ({r.date.slice(0, 10)})</span> </div>)}

                        </ExpansionPanelDetails>
                    </ExpansionPanel>






                </ExpansionPanelDetails>
            </ExpansionPanel>







        </div>)

    }
}
export default withTranslation('translation')(Result);


