import React, { Component } from 'react'
import axios from 'axios'


export class Responses extends Component {
    constructor() {
        super()
        this.state = {
            content: "",
            employee: "",
            status: "",
        }
    }

    update = event => this.setState({ [event.target.name]: event.target.value })

    sendResp = async () => {
        console.log(this.props.idPost)
        await axios.post(`http://localhost:4000/data/response/${this.props.idPost}`,
            { content: this.state.content, date: new Date(), employee: this.state.employee })
        await axios.put(`http://localhost:4000/data/post/status/${this.state.status}/${this.props.idPost}`)
        this.props.getData()
    }

    render() {
        return (
            <div>
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
        )
    }
}

export default Responses
