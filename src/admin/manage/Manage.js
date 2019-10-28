import React, { Component } from 'react'
import Header from '../Header'
import axios from 'axios'
import { withTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Consts from '../../Consts'

const CREATE_ROUTE = Consts.CREATE_ROUTE

class Manage extends Component {
    constructor() {
        super()
        this.state = {
            categories: [""],
            newCategory: "",
            status: ["Pending"]
        }
    }

    update = event => this.setState({ [event.target.name]: event.target.value })

    getCategories = async () => {
        let response = await axios.get(CREATE_ROUTE("data/categories"))
        let categories = []
        if (response.data[0] === undefined) {
            categories = ["Other"]
        } else {
            response.data.forEach(category => categories.push(category.name))
        }
        this.setState({ categories }, () => console.log(this.state.categories))
    }

    addCategory = async () => {
        console.log(this.state.newCategory);
        if (window.confirm(`Confirm New Category: ${this.state.newCategory}`)) {
            await axios.post(CREATE_ROUTE(`data/category/${this.state.newCategory}`))
            this.getCategories()
        }
        else alert("Not sent")
        this.setState({ newCategory: "" })
    }

    componentDidMount = async () => {
        this.getCategories()
    }

    render() {
        const { t, i18n } = this.props
        return (
            <div>
                <Header />

                <Card className='logincontainer' style={{ maxWidth: 500 }}>
                    <CardContent>
                        <div id="fieldcont">
                            <FormControl variant="outlined" >
                                <InputLabel htmlFor="outlined-sort-simple"> {t("Categories")} </InputLabel>
                                <Select type="text" name="newCategory" value={this.state.name} onChange={this.update} labelWidth={70} inputProps={{ name: 'categories', id: 'outlined-status-simple', }} >
                                    {this.state.categories.map(c =>
                                        <MenuItem value={c}>{c}</MenuItem>)}
                                </Select>
                            </FormControl>

                            <Typography color="textPrimary" gutterBottom> {t("Add New Category")}  </Typography>
                            <div id="content">
                                <TextField style={{ width: "70%" }} id="outlined-name" label={t("New Category")} name="newCategory" value={this.state.name} onChange={this.update} margin="normal" variant="outlined" type="text" />
                            </div>
                        </div>
                        {this.state.newCategory ?
                            <Button variant="outlined" type="submit" onClick={this.addCategory}> {("Send")} </Button> :
                            <Button disabled variant="outlined" type="submit" onClick={this.addCategory}> {"Send"} </Button>
                        }
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withTranslation('translation')(Manage)