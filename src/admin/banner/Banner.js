import React, { Component } from 'react'
import axios from 'axios'
import { withTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import './banner.css'
import Consts from '../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE

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
        const user = await axios.get(CREATE_ROUTE(`data/user/${this.props.userPhone}`))
        this.setState({ user: user.data, ban: user.data.ban, banReason: user.data.banReason })
    }

    banner = () => {
        if (window.confirm("Confirm?")) {
            this.setState({
                ban: this.state.ban ? false : true,
                banReason: this.state.banReason
            }, async () => {
                await axios.put(CREATE_ROUTE(`data/user/${this.props.userPhone}`), { ban: this.state.ban })
                await axios.put(CREATE_ROUTE(`data/user/${this.props.userPhone}`), { banReason: this.state.banReason })
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
            <div id="bancontainer">
                <div>{t("Ban user for inappropiate behavior")}:</div>
                {u.ban ? <div>{t("Ban Status")}: {u.ban ? t("Banned") : t("Active")} - {t("Reason")}: {u.banReason}</div> : null}
                <div id="bancontainer">

                <TextField   id="standard-dense"  label={t("Reason")}  name="banReason" value={this.state.name} onChange={this.update} margin="dense"    type="text"  />
               
                <Button size="small"  variant="outlined" onClick={this.banner}>{u.ban ? t("Unban user") : t("Ban user")}</Button>
                </div>
            </div>
        )
    }
}

export default withTranslation('translation') (Banner);
