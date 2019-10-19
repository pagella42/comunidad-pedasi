import React, { Component } from 'react';
import axios from 'axios';
import VerifyPost from './VerifyPost';
import ImageUpload from '../../../ImageUpload/ImageUpload'
class CreatePost extends Component {
    constructor(){
        super()
        this.state = {
            categories:[],
            post :{
                title: "",
                content:"",
                category:"Other",
                points:0,
                date:"",
                address:"",
                picture:"",
            },
            verifyPost:{
                show:false,
            }
        }
    }

    handleInputChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        let post = {...this.state.post}
        post[name] = value
        this.setState({post:post})
    }

    verifyPost = () => {
        let verifyPost = {...this.state.verifyPost}
        verifyPost.show = true
        this.setState({verifyPost : verifyPost})
    }

    confirmPost = async () => {
        let usersPhone = this.props.phone
        let post = {...this.state.post}
        let date = new Date()
        post.date = date
        // the post object contains all information about the post - the usersPhone is used to uniquely identify the user in the backend
        let data = post
        await axios.post(`http://localhost:4000/data/post/${usersPhone}`, data )
        this.props.getAllPosts()
    }

    reviewPost = (action) => {
        let verifyPost = {...this.state.verifyPost}
        verifyPost.show = false
        this.setState({verifyPost : VerifyPost})
        if(action === "confirm"){
            this.confirmPost()
        }
    }

    getCategories = async () => {
        let response = await axios.get("http://localhost:4000/data/categories")
        let categories = []
        if(response.data[0] === undefined){
            categories = ["Other"]
        } else {
            response.data.forEach(category => categories.push(category.name))
        }
        this.setState({categories: categories})
    }

    saveUrl = (url) => {
        console.log(url)
        let post = {...this.state.post}
        post.picture = url
        this.setState({post: post})
    }

    async componentDidMount(){
        
        await this.getCategories()
    }

    render() {
        return (
            <div>
                <input type="text" name="title" placeholder="Title" onChange={this.handleInputChange}/>
                <input type="text" name="content" placeholder="Text" onChange={this.handleInputChange}/>
                <input type="text" name="address" placeholder="Adress" onChange={this.handleInputChange}/>
                <select name="category" value={this.state.post.category} onChange={this.handleInputChange}>
                    {this.state.categories.map(category => <option value={category}>{category}</option>)}
                </select>
                <ImageUpload saveUrl={this.saveUrl}/>
                <button onClick={this.verifyPost}>Submit</button>
                {/* Pop up : please review your post */}
                {this.state.verifyPost.show ? <VerifyPost reviewPost={this.reviewPost} post={this.state.post} /> : <div></div>}
            </div>
        );
    }
}

export default CreatePost;