import React, { Component } from 'react'
import axios from 'axios'

class ResultDetail extends Component {

    constructor() {
        super()
        this.state = {
            post: []
        }
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
                    {/*<div id="user_info">{p.name}</div>*/}
                    <div id="title_problem">{p.title}</div>
                    <div id="description">{p.content}</div>
                    <div id="photo"><img src={p.picture} alt="Evidence"></img></div>
                        <div id="category">{p.category}</div>
                        <div id="address">{p.address}</div>
                        <div id="response">Response</div>
                        <div id="status_post">Status Post</div>
                    </div>
                    : console.log("Wait, no data yet")}
            </div>
        )
            }
        }
export default ResultDetail