import React, { Component } from 'react'
import axios from 'axios'
import { withTranslation } from 'react-i18next';


class Banner extends Component {
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
        const {t, i18n} = this.props
        const u = this.state.user
        return (
            <div>
                <div>{t("Ban Status")}: {u.ban ? t("Banned") : t("Active")} - {t("Reason")}: {u.banReason}</div>
                <input type="text" placeholder={t("Reason")} name="banReason" value={this.state.name} onChange={this.update} />
                <button onClick={this.banner}>{u.ban ? t("Unban user") : t("Ban user")}</button>
            </div>
        )
    }
}

export default withTranslation('translation') (Banner);
