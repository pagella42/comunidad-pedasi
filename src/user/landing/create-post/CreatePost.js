import React, { Component } from 'react';
import axios from 'axios';
import VerifyPost from './VerifyPost';

class CreatePost extends Component {
    constructor(){
        super()
        this.state = {
            categories:["other", "infrastructure"],
            post :{
                title: "",
                content:"",
                category:"",
                points:0,
                date:"",
                address:"",
            },
            usersPhone: "+1 (881) 599-2995", // For now dummy data // Pass it from Login 
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
        let usersPhone = this.state.usersPhone
        let post = {...this.state.post}
        let date = new Date()
        post.date = date
        // the post object contains all information about the post - the usersPhone is used to uniquely identify the user in the backend
        let data = {post : post, usersPhone : usersPhone}
        await axios.post("http://localhost:4000/data/post", data )
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
        let categories = response.data
        this.setState({categories: categories})
    }

    // async componentDidMount(){
    //     await this.getCategories()
    // }

    render() {
        return (
            <div>
                <input type="text" name="title" placeholder="Title" onChange={this.handleInputChange}/>
                <input type="text" name="content" placeholder="Text" onChange={this.handleInputChange}/>
                <input type="text" name="address" placeholder="Adress" onChange={this.handleInputChange}/>
                <select name="category" onChange={this.handleInputChange}>
                    {this.state.categories.map(category => <option value={category}>{category}</option>)}
                </select>
                <button onClick={this.verifyPost}>Submit</button>
                {/* Pop up : please review your post */}
                {this.state.verifyPost.show ? <VerifyPost reviewPost={this.reviewPost} post={this.state.post} /> : <div></div>}
            </div>
        );
    }
}

export default CreatePost;