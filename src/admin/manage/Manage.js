import React, { Component } from 'react'
import Header from '../Header'
import { withTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Consts from '../../Consts'

class Manage extends Component {
    constructor() {
        super()
        this.state = {
            categories: ["Other"],
            statusPost: ["Pending"]
        }
    }

    update = event => this.setState({ [event.target.name]: event.target.value })

    addStatus = () => {
        
    }

    render() {
        const { t, i18n } = this.props
        return (
            <div>
                <Header />

                <div id="fieldcont">

                    <Typography color="textSecondary" gutterBottom> {t("Add New Status")}  </Typography>
                    <div id="content">
                        <TextField style={{ width: "35%" }} id="outlined-name" label={t("New Status")} name="statusPost" value={this.state.name} onChange={this.update} margin="normal" variant="outlined" type="text" />
                    </div>

                    <FormControl variant="outlined" >
                        <InputLabel htmlFor="outlined-sort-simple"> {t("Status")} </InputLabel>
                        <Select type="text" name="statusPost" value={this.state.name} onChange={this.update} labelWidth={70} inputProps={{ name: 'statusPost', id: 'outlined-status-simple', }} >
                            {this.state.statusPost.map(s =>
                            <MenuItem value={s}>{s}</MenuItem>)}
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

export default withTranslation('translation')(Manage)