import React, { Component } from 'react';
import axios from 'axios';
import VerifyPost from './VerifyPost';
import ImageUpload from '../../../ImageUpload/ImageUpload'
import './createpost.css'


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withTranslation } from 'react-i18next';


class CreatePost extends Component {
    constructor() {
        super()
        this.state = {
            categories: [],
            post: {
                title: "",
                content: "",
                category: "other",
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
    }

    reviewPost = (action) => {
        let verifyPost = { ...this.state.verifyPost }
        verifyPost.show = false
        this.setState({ verifyPost: VerifyPost })
        if (action === "confirm") {
            this.confirmPost()
        }
    }

    validate = (event) => {
        event.preventDefault()
        this.state.post.language?
        this.verifyPost():
        alert('Please choose a language')
    }

    getCategories = async () => {
        let response = await axios.get("http://localhost:4000/data/categories")
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

    private = () => {
        let post = { ...this.state.post }
        if (this.state.post.private) {
            post.private = false
            post.anonymous = false
        }
        else {
            post.private = true
            post.anonymous = false
        }
        this.setState({ post: post })
    }


    render() {
        const {t,i18next} = this.props
        return (
            <div className='createpostcontainer'>
                <Card className='createpost' style={{ maxWidth: 600 }}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom> {"Create a post"}  </Typography>

                        <div> <TextField type="text" id="outlined-title" label="Title" margin="normal" variant="outlined" onChange={this.handleInputChange} name="title" /></div>
                        <div>   <TextField type="text" id="outlined-content" label="content" margin="normal" variant="outlined" onChange={this.handleInputChange} name="content" /></div>
                        <div> <TextField type="text" id="outlined-adress" label="adress" margin="normal" variant="outlined" onChange={this.handleInputChange} name="adress" /></div>



                        <FormControl variant="outlined" >
                            <InputLabel htmlFor="outlined-sort-simple"> Category  </InputLabel>
                            <Select name="category" value={this.state.post.category} onChange={this.handleInputChange} labelWidth={'55'} inputProps={{ name: 'category', id: 'outlined-category-simple', }} >
                                {this.state.categories.map(category => <MenuItem value={category}>{category}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" >
                            <InputLabel htmlFor="outlined-sort-simple"> language </InputLabel>
                            <Select name='language' value={this.state.post.language} onChange={this.handleInputChange} labelWidth={'55'} inputProps={{ name: 'language', id: 'outlined-language-simple', }} >
                                <MenuItem value={0}>-</MenuItem>
                                <MenuItem value='en'>English</MenuItem>
                                <MenuItem value='es'>Español</MenuItem>
                            </Select>
                        </FormControl>

                        <ImageUpload saveUrl={this.saveUrl} />

                        {this.state.post.private ?
                            <Button variant="outlined" disabled onClick={this.anonymous}>  {this.state.post.anonymous ? "Show username" : "Hide username"}  </Button> :
                            <Button variant="outlined" onClick={this.anonymous}>   {this.state.post.anonymous ? "Show username" : "Hide username"}  </Button>
                        }
                        <Button variant="outlined" onClick={this.private}> {this.state.post.private ? "Post to feed" : "Send only to Municipality"} </Button>


                    </CardContent>
                    <CardActions>
                        <Button onClick={this.validate} size="small" color="primary">Submit</Button>
                        <Button onClick={this.props.showCreatePost} size="small" color="primary">Cancel</Button>
                    </CardActions>
                </Card>

                    {/* {this.state.verifyPost.show ? <VerifyPost reviewPost={this.reviewPost} post={this.state.post} /> : <div></div>} */}


                </div>
                );
            }
        }
        
export default withTranslation('translation') (CreatePost);
