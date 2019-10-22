import React, { Component } from 'react'
import axios from 'axios'
import '../styles/ResultDetails.css'

class ResultDetail extends Component {

    constructor() {
        super()
        this.state = {
            post: [],
            comments: [],
            responses: [],
            content: "",
            employee: "",
            status: "",
            ban: "",
            banReason: ""
        }
    }

    update = event => this.setState({ [event.target.name]: event.target.value })

    banner = () => {
        this.setState({
            ban: true,
            banReason: this.state.banReason
        }, () => {

            axios.put(`http://localhost:4000/data/user/${this.state.post.user.phone}`, { key: "ban", value: this.state.ban })
            axios.put(`http://localhost:4000/data/user/${this.state.post.user.phone}`, { key: "banReason", value: this.state.banReason })
        })
    }

    sendResp = async () => {
        await axios.post(`http://localhost:4000/data/response/${this.state.post._id}`,
            { content: this.state.content, date: new Date(), employee: this.state.employee })
        await axios.put(`http://localhost:4000/data/post/status/${this.state.status}/${this.state.post._id}`)
        this.getData()
    }

    getData = async () => {
        const pID = this.props.match.params.id
        const post = await axios.get(`http://localhost:4000/data/posts/id/${pID}`)
        const responses = await axios.get(`http://localhost:4000/data/responses/${pID}`)
        const comments = await axios.get(`http://localhost:4000/data/comments/${pID}`)
        this.setState({ post: post.data, responses: responses.data, comments: comments.data }, () => console.log(this.state.post))
    }

    componentDidMount = () => { this.getData() }

    render() {
        const p = this.state.post
        const r = this.state.responses
        const c = this.state.comments
        const b = this.state.ban
        return (
            <div >{p
                ?
                <div id="container">
                    <div id="user_info">
                        <h3>{p.user ? p.user.name : ""}</h3>
                        <input type="text" placeholder="Reason to ban" name="banReason" value={this.state.name} onChange={this.update} />
                        <button value={this.state.ban} onClick={this.banner}>Ban user</button>
                    </div>
                    <div id="title_problem"><h3 >{p.title}</h3></div>
                    <div id="description">{p.content}</div>
                    <div id="comments">{c.map(c => <div key={c._id}>{c.content} - {c.user} - {c.date}</div>)}</div>
                    <div id="photo"><img src={p.picture} alt="Evidence"></img></div>
                    <div id="category">{p.category}</div>
                    <div id="address">{p.address}</div>
                    <div id="container_response">
                        {r.map(c => <div key={c._id}>{c.content} - {c.employee} - {c.date}</div>)}
                        <div id="content">Response<input type="text" name="content" value={this.state.name} onChange={this.update} /></div>
                        <div id="employee">Employee<input type="text" name="employee" value={this.state.name} onChange={this.update} /></div>
                        <div id="status">Status
                            <select type="text" name="status" value={this.state.name} onChange={this.update} >
                                <option value="Attending">Attending</option>
                                <option value="Pending">Pending</option>
                                <option value="Solved">Solved</option>
                            </select>
                        </div>
                        <div><button type="submit" onClick={this.sendResp} >Send</button></div>
                    </div>
                    <div id="status_post">{p.status}</div>
                </div>
                : console.log("Wait, no data yet")}
            </div>
        )
    }
}
export default ResultDetail
