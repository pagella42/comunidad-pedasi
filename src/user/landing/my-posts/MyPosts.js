import React, { Component } from 'react';
import Header from '../../header/Header';
import axios from 'axios';
import MyResults from './MyResults';
import Consts from '../../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE
class MyPosts extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
        }
    }
    getPosts = async () =>{
        let phone = JSON.parse(localStorage.userLogin).phone
        let data = await axios.get(CREATE_ROUTE(`data/posts/${phone}`))
        await this.setState({ posts: data })
    }
    deletePost = async e =>{
        console.log(e.target.name)
        await axios.delete(CREATE_ROUTE(`data/post/${e.target.name}`))
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