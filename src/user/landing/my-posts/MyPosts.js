import React, { Component } from 'react';
import Header from '../Header';
import axios from 'axios';
import MyResults from './MyResults';
class MyPosts extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
        }
    }

    async componentDidMount() {
        let phone = JSON.parse(localStorage.login).phone
        //get data for this user, and sorted by recent 
        let data = await axios.get(`http://localhost:4000/data/posts/${phone}`)
        await this.setState({ posts: data })
    }
    render() {
       
        
        return (<div>
            <Header />
            
            <MyResults posts={this.state.posts} />
        </div>)
    }
}
export default MyPosts;