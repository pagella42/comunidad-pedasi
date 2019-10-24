import React, { Component } from 'react'
import axios from 'axios'
import { withTranslation } from 'react-i18next';



class Responses extends Component {

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
        const t = this.props.t
        if (window.confirm("Confirm Response")) {
            await axios.post(`http://localhost:4000/data/response/${this.props.idPost}`,
                { content: this.state.content, date: new Date(), employee: this.state.employee })
            await axios.put(`http://localhost:4000/data/post/status/${this.state.status}/${this.props.idPost}`)
            this.props.getData()
        }
        else alert(t("Not sent"))
    }

    render() {
        const {t,i18n} = this.props
        return (
            <div>
                <div id="content">{t("Response")}<input type="text" name="content" value={this.state.name} onChange={this.update} /></div>
                <div id="employee">{t("Employee")}<input type="text" name="employee" value={this.state.name} onChange={this.update} /></div>
                <div id="status">{t("Status")}
                    <select type="text" name="status" value={this.state.name} onChange={this.update} >
                        <option value="Select">{t("Select")}</option>
                        <option value="Attending">{t("Attending")}</option>
                        <option value="Pending">{t("Pending")}</option>
                        <option value="Solved">{t("Solved")}</option>
                    </select>
                </div>
                <div><button type="submit" onClick={this.sendResp} >{t("Send")}</button></div>
            </div>
        )
    }
}

export default withTranslation('translation') (Responses)
