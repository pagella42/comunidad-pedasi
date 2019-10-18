import React, { Component } from 'react'
import axios from 'axios'
import '../styles/ResultDetails.css'

class ResultDetail extends Component {

    constructor() {
        super()
        this.state = {
            post: [],
            responses: [],
            date: new Date(),
            content: "",
            employee: "",
            status: "",
        }
    }

    catchRespCon = event => this.setState({ content: event.target.value })
    catchRespEmp = event => this.setState({ employee: event.target.value })
    catchRespSta = event => this.setState({ status: event.target.value })


    sendResp = async () => {
        await axios.post(`http://localhost:4000/data/response/${this.state.post.data._id}`,
            { content: this.state.content, date: this.state.date, employee: this.state.employee })
        await axios.put(`http://localhost:4000/data/post/status/${this.state.status}/${this.state.post.data._id}`)
        this.getData()
        console.log(this.state.post.data._id)
        console.log(this.state.date)
        console.log(this.state.content)
        console.log(this.state.employee)
        console.log(this.state.status)
    }

    getData = async () => {
        const post = await axios.get(`http://localhost:4000/data/posts/id/${this.props.match.params.id}`)
        const responses = await axios.get(`http://localhost:4000/data/responses/${this.props.match.params.id}`)
        this.setState({ post, responses: responses.data })
    }

    componentDidMount = () => {
        this.getData()
    }

    render() {
        const p = this.state.post.data
        const r = this.state.responses
        return (
            <div >{p
                ?
                <div id="container">
                    <div id="user_info">{/*p.name*/}</div>
                    <div id="title_problem"><h3 >{p.title}</h3></div>
                    <div id="description">{p.content}</div>
                    <div id="photo"><img src={p.picture} alt="Evidence"></img></div>
                    <div id="category">{p.category}</div>
                    <div id="address">{p.address}</div>
                    <div id="container_response">
                        {r.map(c => <div key={c._id}>{c.content} - {c.employee} - {c.date}</div>)}
                        <div id="reponse">Response<input type="text" value={this.state.content} onChange={this.catchRespCon} /></div>
                        <div id="employee">Employee<input type="text" value={this.state.employee} onChange={this.catchRespEmp} /></div>
                        <div id="status">Status<input type="text" value={this.state.status} onChange={this.catchRespSta} /></div>
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