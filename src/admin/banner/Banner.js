import React, { Component } from 'react'
import axios from 'axios'

export class Banner extends Component {
    constructor() {
        super()
        this.state = {
            user: [],
            ban: "",
            banReason: ""
        }
    }

    update = event => this.setState({ [event.target.name]: event.target.value })

    getUser = async () => {
        const user = await axios.get(`http://localhost:4000/data/user/${this.props.userPhone}`)
        console.log(user.data)
        this.setState({ user: user.data, ban: user.data.ban, banReason: user.data.banReason })
    }

    banner = () => {
        if (window.confirm("Confirm?")) {
            this.setState({
                ban: this.state.ban ? false : true,
                banReason: this.state.banReason
            }, async () => {
                await axios.put(`http://localhost:4000/data/user/${this.props.userPhone}`, { ban: this.state.ban })
                await axios.put(`http://localhost:4000/data/user/${this.props.userPhone}`, { banReason: this.state.banReason })
                this.getUser()
            })
        }
        else alert("Canceled")
    }

    componentDidMount = () => { this.getUser() }

    render() {
        const u = this.state.user
        return (
            <div>
                <div>Ban Status: {u.ban ? "Banned" : "No banned"} - Reason: {u.banReason}</div>
                <input type="text" placeholder="Reason" name="banReason" value={this.state.name} onChange={this.update} />
                <button onClick={this.banner}>{u.ban ? "Unban user" : "Ban user"}</button>
            </div>
        )
    }
}

export default Banner
