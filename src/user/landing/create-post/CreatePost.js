import React, { Component } from 'react';
import axios from 'axios';

class CreatePost extends Component {
    constructor(){
        super()
        this.state = {
            post = {
                title: "",
                content:"",
                //category:"",
                points:0,
                date:"",
                address:"",
            },
            usersPhone: null, // login with number // Pass it from Login
        }
    }

    handleInputChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        let post = {...this.state.post}
        post[name] = value
    }

    createPost = () => {
        let usersPhone = this.state.usersPhone
        let post = {...this.state.post}
        let date = new Date()
        post.date = date
        // send two objects: req.body.post and req.body.phone
        let data = {post : post, usersPhone : usersPhone}
        axios.post("http://localhost:4000/data/post", data )
    }

    render() {
        return (
            <div>
                <input type="text" name="title" placeholder="Title" onChange={this.handleInputChange}/>
                <input type="text" name="content" placeholder="Text" onChange={this.handleInputChange}/>
                <input type="text" name="address" placeholder="Adress" onChange={this.handleInputChange}/>
                <button onClick={this.createPost}>Submit</button>
                {/* Pop up please review your post */}
            </div>
        );
    }
}

export default CreatePost;