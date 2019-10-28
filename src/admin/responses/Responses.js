import React, { Component } from 'react'
import axios from 'axios'
import { withTranslation } from 'react-i18next';
import './responses.css'


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Consts from '../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE

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
            await axios.post(CREATE_ROUTE(`data/response/${this.props.idPost}`),
                { content: this.state.content, date: new Date(), employee: this.state.employee })
            await axios.put(CREATE_ROUTE(`data/post/status/${this.state.status}/${this.props.idPost}`))
            this.props.getData()
        }
        else alert(t("Not sent"))
        this.setState({content: ""})
        this.setState({employee: ""})
    }

    render() {
        const { t, i18n } = this.props
        return (
            <div>
                
                <div id="fieldcont">
                    <div id="content">
                        <TextField style={{ width: "55%" }} id="outlined-name" label={t("Response")} name="content" value={this.state.name} onChange={this.update} margin="normal" variant="outlined" type="text" />
                    </div>

                    <div id="employee">
                        <TextField style={{ width: "30%" }} id="outlined-name" label={t("Employee responding")} name="employee" value={this.state.name} onChange={this.update} margin="normal" variant="outlined" type="text" />
                    </div>
               

              

                <FormControl variant="outlined" >
                        <InputLabel htmlFor="outlined-sort-simple"> {t("Status")} </InputLabel>
                        <Select type="text" name="status" value={this.state.name} onChange={this.update}labelWidth={70} inputProps={{ name: 'status', id: 'outlined-status-simple', }} >
                        <MenuItem value="pending">{t("Pending")}</MenuItem>
                        <MenuItem value="in progress">{t("In progress")}</MenuItem>
                        <MenuItem value="resolved">{t("Resolved")}</MenuItem>
                        </Select>
                    </FormControl>
                    
                 </div>
                 {this.state.content && this.state.employee && this.state.status ?
                <Button variant="outlined" type="submit" onClick={this.sendResp}> {("Send")} </Button> :
                <Button disabled variant="outlined" type="submit" onClick={this.sendResp}> {t("Send")} </Button>
                 }
                
            </div>
        )
    }
}

export default withTranslation('translation')(Responses)
