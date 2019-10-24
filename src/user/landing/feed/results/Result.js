import React, { Component } from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';

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

    componentDidUpdate(){
        this.getVotes()
    }

    vote = async (e) => {
        let name = e.currentTarget.name
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
        return (<div>
            <br />
            {/* show or not username */}
           <div> {post.anonymous ? t("Anonymous Post") : <span>{t("User")}: {post.user.name}</span> }</div>
            

            <div>{post.title}</div>
            <div>Points: {post.points}</div>


            {this.state.vote.userVoted ?
                <button name="delete" onClick={this.vote}>{t("Take out vote")}</button>
                : <button name="post" onClick={this.vote}>{t("vote")}</button>
            }

            <div>{post.content}</div>
            <div>{post.address}</div>
            <div>{post.category}</div>
            <div><img src={post.picture} alt="concern picture" /></div> 


            {/* render responses */}
            {this.state.responses.length === 0

                ? <div>{t("No response")}</div>
                : this.state.responses.map(r => <div> {t("Response")}: {r.content} {t("Employee")}: {r.employee} </div>)}

            {/* post comment  \/ */}
            <input type="text" name="comment" placeholder={t("Comment something")} value={this.state.comment} onChange={this.update} />
            <button onClick={this.comment}>{t("Send comment")}</button>

            {/* render comments \/ */}
            {this.state.comments.length !== 0 ?
                <div>
                    {this.state.comments.map(c => {
                        return <div>
                            <div>{t("User")}: {c.user}</div>
                            <div>{c.content}</div>
                        </div>
                    })}
                </div>
                : <div>{t("No Comments")}</div>
            }
            {post.date}
            {t(post.status)}
            -----------------------------------------
        </div>)
    }
}
export default withTranslation('translation') (Result);
