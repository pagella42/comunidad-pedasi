import React, { Component } from 'react';
import Header from '../../header/Header';
import axios from 'axios';
import MyResults from './MyResults';
class MyPosts extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
        }
    }
    getPosts = async () =>{
        let phone = JSON.parse(localStorage.userLogin).phone
        let data = await axios.get(`http://localhost:4000/data/posts/${phone}`)
        await this.setState({ posts: data })
    }
    deletePost = async e =>{
        console.log(e.target.name)
        await axios.delete(`http://localhost:4000/data/post/${e.target.name}`)
        this.getPosts()
    }
    async componentDidMount() {
        this.getPosts()
    }
    render() {
       
       
        
        return (<div>
            <MyResults deletePost={this.deletePost} posts={this.state.posts.data} />
        </div>)
    }
}
export default MyPosts;