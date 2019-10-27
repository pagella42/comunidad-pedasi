import React, { Component } from 'react';
import axios from 'axios';
import VerifyPost from './VerifyPost';
import ImageUpload from '../../../ImageUpload/ImageUpload'
import './createpost.css'


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withTranslation } from 'react-i18next';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


class CreatePost extends Component {
    constructor() {
        super()
        this.state = {
            categories: [],
            post: {
                title: "",
                content: "",
                category: "",
                points: 0,
                date: "",
                address: "",
                picture: "",
                anonymous: false,
                private: false,
                language: ""
            },
            verifyPost: {
                show: false,
            },

        }
    }

    handleInputChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        let post = { ...this.state.post }
        post[name] = value
        this.setState({ post: post })
    }

    verifyPost = () => {
        let verifyPost = { ...this.state.verifyPost }
        verifyPost.show = true
        this.setState({ verifyPost: verifyPost })
    }

    confirmPost = async () => {
        let usersPhone = this.props.phone
        let post = { ...this.state.post }
        let date = new Date()
        post.date = date
        // the post object contains all information about the post - the usersPhone is used to uniquely identify the user in the backend
        let data = post
        await axios.post(`http://localhost:4000/data/post/${usersPhone}`, data)
        this.props.getPosts()
        this.props.showCreatePost()
    }

    reviewPost = (action) => {
        let verifyPost = { ...this.state.verifyPost }
        verifyPost.show = false
        this.setState({ verifyPost: VerifyPost })
        if (action === "confirm") {
            this.confirmPost()
        }
    }

    validatelan = (event) => {
        event.preventDefault()
        this.state.post.language ?
            this.verifyPost() :
            alert('Please choose a language')
    }
    validatecat = (event) => {
        event.preventDefault()
        this.state.post.category ?
            this.verifyPost() :
            alert('Please choose a category')
    }
    validate = (event) => {
        this.validatelan(event)
        this.validatecat(event)
    }

    getCategories = async () => {
        let response = await axios.get("http://localhost:4000/data/categories")
        console.log(response.data)
        let categories = []
        if (response.data[0] === undefined) {
            categories = ["other"]
        } else {
            response.data.forEach(category => categories.push(category.name))
        }
        this.setState({ categories: categories })
    }

    saveUrl = (url) => {
        console.log(url)
        let post = { ...this.state.post }
        post.picture = url
        this.setState({ post: post })
    }

    async componentDidMount() {

        await this.getCategories()
    }

    anonymous = () => {
        let post = { ...this.state.post }
        if (this.state.post.anonymous) {
            post.anonymous = false
            post.private = false
        }
        else {
            post.anonymous = true
            post.private = false
        }

        this.setState({ post: post })
    }

    private = (event) => {
        let post = { ...this.state.post }
        [event.target.name] = event.target.checked
    }


    render() {
        const { t, i18next } = this.props
        return this.state.categories.length < 1 ? null : (
            <div className='createpostcontainer'>
                <Card className='createpost' style={{ maxWidth: 600 }}>
                    <form onSubmit={this.validate}>
                        <CardContent>

                            <Typography color="textSecondary" gutterBottom> {"Create a post"}  </Typography>

                            <div> <TextField className="titlecont" required type="text" id="outlined-title" label="Title" margin="normal" variant="outlined" onChange={this.handleInputChange} name="title" /></div>
                            <div>   <TextField className="contcont" multiline rows="6" required type="text" id="outlined-content" label="content" margin="normal" variant="outlined" onChange={this.handleInputChange} name="content" /></div>

                            <div className="fieldcont">
                                <TextField className="addresscont" required type="text" id="outlined-address" label="address" margin="normal" variant="outlined" onChange={this.handleInputChange} name="address" />

                                <FormControl required variant="outlined" >
                                    <InputLabel htmlFor="outlined-sort-simple"> language </InputLabel>
                                    <Select name='language' value={this.state.post.language} onChange={this.handleInputChange} labelWidth={'70'} inputProps={{ name: 'language', id: 'outlined-language-simple', }} >
                                        <MenuItem value={0}>-</MenuItem>
                                        <MenuItem value='en'>English</MenuItem>
                                        <MenuItem value='es'>Español</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className="categorycont" variant="outlined" >
                                    <InputLabel htmlFor="outlined-sort-simple"> Category  </InputLabel>
                                    <Select required name="category" value={this.state.post.category} onChange={this.handleInputChange} labelWidth={'68'} inputProps={{ name: 'category', id: 'outlined-category-simple', }} >
                                        <MenuItem value={0}>-</MenuItem>
                                        {this.state.categories.map(category => <MenuItem value={category}>{category}</MenuItem>)}
                                    </Select>
                                </FormControl>

                            </div>




                            <div class="imgcotainerbutt"><ImageUpload saveUrl={this.saveUrl} /></div>
                            <div id="anoncont">
                                {this.state.post.private ?
                                    <Button variant="outlined" disabled onClick={this.anonymous}>  {this.state.post.anonymous ? "Show username" : "Hide username"}  </Button> :
                                    <Button variant="outlined" onClick={this.anonymous}>   {this.state.post.anonymous ? "Show username" : "Hide username"}  </Button>
                                }

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.}
                                            onChange={this.private}
                                            value={this.state.post.private} color="primary"
                                        />
                                    }
                                    label="Make this post private"
                                />
                                
                            </div>

                        </CardContent>

                        <CardActions>
                            {this.state.verifyPost.show ? <Typography color="textSecondary" gutterBottom> {"Are you sure you want to post?"}  </Typography> : null}
                            {this.state.verifyPost.show ?
                                <VerifyPost reviewPost={this.reviewPost} post={this.state.post} /> :
                                <div>
                                    <Button label='Submit' type='Submit' size="small" color="primary">Submit</Button>
                                    <Button onClick={this.props.showCreatePost} size="small" color="primary">Cancel</Button>

                                </div>}

                        </CardActions>
                    </form>
                </Card>



            </div>
        );
    }
}

export default withTranslation('translation')(CreatePost);
