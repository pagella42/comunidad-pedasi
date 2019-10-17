import React, { Component } from 'react'
import axios from 'axios'
import '../styles/ResultDetails.css'

class ResultDetail extends Component {

    constructor() {
        super()
        this.state = {
            post: [],
            response: "",
            displayStatus: false
        }
    }

    catchResp = event => this.setState({ response: event.target.value })

    showDropdownStatus = (event) => {
        event.preventDefault()
        this.setState({ displayStatus: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu)
        })
    }

    hideDropdownMenu = () => {
        this.setState({ displayStatus: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu)
        })

    }

    sendResp =  () => {
        this.state.post.data._id? console.log(this.state.post.data._id) : console.log("Wait for data")
        //await axios.post(`http://localhost:4000/data/response/${this.props.data._id}`)
        console.log(this.state.response)
    }

    componentDidMount = async () => {
        const response = await axios.get(`http://localhost:4000/data/posts/id/${this.props.match.params.id}`)
        this.setState({ post: response })
    }

    render() {
        const p = this.state.post.data
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
                        <div>{p.responses[0]}</div>
                        <div id="reponse">Response<input type="text" value={this.state.response} onChange={this.catchResp} /></div>
                        <div className="dropdown" >
                            <div className="button" onClick={this.showDropdownStatus}>Status</div>
                            {this.state.displayStatus ?
                                <ul>
                                    <li>Attending</li>
                                    <li>Solved</li>
                                </ul> :
                                null
                            }
                        </div>
                        <div><button type="submit" onClick={this.sendResp} disabled={!this.state.response} >Send</button></div>
                    </div>
                    <div id="status_post">{p.status}</div>
                </div>
                : console.log("Wait, no data yet")}
            </div>
        )
    }
}
export default ResultDetail