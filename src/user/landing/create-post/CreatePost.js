import React, { Component } from 'react';
import axios from 'axios';
import VerifyPost from './VerifyPost';
import ImageUpload from '../../../ImageUpload/ImageUpload'
class CreatePost extends Component {
    constructor() {
        super()
        this.state = {
            categories: [],
            post: {
                title: "",
                content: "",
                category: "Other",
                points: 0,
                date: "",
                address: "",
                picture: "",
                anonymous: false,
                private: false,
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
        this.props.getAllPosts()
    }

    reviewPost = (action) => {
        let verifyPost = { ...this.state.verifyPost }
        verifyPost.show = false
        this.setState({ verifyPost: VerifyPost })
        if (action === "confirm") {
            this.confirmPost()
        }
    }

    getCategories = async () => {
        let response = await axios.get("http://localhost:4000/data/categories")
        let categories = []
        if (response.data[0] === undefined) {
            categories = ["Other"]
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
        if(this.state.post.anonymous){
            post.anonymous = false
            post.private = false
        }
        else{
            post.anonymous = true
            post.private = false
        }
        
        this.setState({ post: post })
    }

    private = () => {
        let post = { ...this.state.post }
        if(this.state.post.private){
            post.private = false
            post.anonymous= false
        }
        else{
            post.private = true
            post.anonymous= false
        }
        this.setState({ post: post })
    }

    render() {
        return (
            <div>
                <input type="text" name="title" placeholder="Title" onChange={this.handleInputChange} />
                <input type="text" name="content" placeholder="Text" onChange={this.handleInputChange} />
                <input type="text" name="address" placeholder="Adress" onChange={this.handleInputChange} />
                <select name="category" value={this.state.post.category} onChange={this.handleInputChange}>
                    {this.state.categories.map(category => <option value={category}>{category}</option>)}
                </select>
                <ImageUpload saveUrl={this.saveUrl} />
                {this.state.post.private ?
                    <div>Cant hide username when post is private</div> :

                    <div>
                        {/* button to post anonymously */}
                        <button onClick={this.anonymous}>
                            {this.state.post.anonymous ? "Show username" : "Hide username"}
                        </button>

                        {this.state.post.anonymous ? "-->Hiding username" : "-->Showing username"}
                    </div>

                }

                <div>
                    {/* button to post privately */}
                    <button onClick={this.private}>
                        {this.state.post.private ? "Post to feed" : "Send only to Municipality"}
                    </button>

                    {this.state.post.private ? "-->Sending only to Municipality" : "-->Posting to feed"}
                </div>
                <button onClick={this.verifyPost}>Submit</button>
                {/* Pop up : please review your post */}
                {this.state.verifyPost.show ? <VerifyPost reviewPost={this.reviewPost} post={this.state.post} /> : <div></div>}



            </div>
        );
    }
}

export default CreatePost;