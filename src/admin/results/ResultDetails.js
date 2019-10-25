import React, { Component } from 'react'
import axios from 'axios'
import '../styles/ResultDetails.css'
import Responses from '../responses/Responses';
import Banner from '../banner/Banner';
import Landing from '../../admin/landing/Landing';
import { withTranslation } from 'react-i18next';


class ResultDetail extends Component {

    constructor() {
        super()
        this.state = {
            post: [],
            comments: [],
            responses: [],
        }
    }

    update = event => this.setState({ [event.target.name]: event.target.value })

    getData = async () => {
        const pID = this.props.match.params.id
        const post = await axios.get(`http://localhost:4000/data/posts/id/${pID}`)
        const responses = await axios.get(`http://localhost:4000/data/responses/${pID}`)
        const comments = await axios.get(`http://localhost:4000/data/comments/${pID}`)
        this.setState({ post: post.data, responses: responses.data, comments: comments.data })
    }

    componentDidMount = () => this.getData()

    render() {
        const p = this.state.post
        const r = this.state.responses
        const c = this.state.comments
        const { t, i18n } = this.props
        return (
            <div >
                <Landing />
                <div id="container">
                    {p.user ?
                        <div id="user_info">
                            <h4> {p.user.name}</h4>
                            <p>{p.user.ID}</p>
                            <p>{p.user.phone}</p>
                            <p>{p.user.address}</p>
                            <p>{p.user.email}</p>
                            < Banner userPhone={p.user.phone} />
                        </div>
                        : null}
                    <div id="title_problem"><h3 >{p.title}</h3></div>
                    <div id="description">{p.content}</div>
                    <div id="comments">{c.map(c => <div key={c._id}>{c.content} - {c.user} - {c.date}</div>)}</div>
                    <div id="photo"><img src={p.picture} alt="Evidence"></img></div>
                    <div id="category">{p.category}</div>
                    <div id="address">{p.address}</div>
                    <div id="container_response">
                        {r.map(c => <div key={c._id}>{c.content} - {c.employee} - {c.date}</div>)}
                        < Responses idPost={this.state.post._id} getData={this.getData} />
                    </div>
                    <div id="status_post">{p.status}</div>
                </div>
            </div>
        )
    }
}

export default withTranslation('translation')(ResultDetail)
