import React, { Component } from 'react';
import Results from './results/Results'
import axios from 'axios';
import CreatePost from '../create-post/CreatePost';
class Feed extends Component {
    constructor(){
        super()
        this.state={
            posts: [],
            filter: 'Public Disturbance',
        }
    }

    getAllPosts = async () => {
        // create a loader here
        let response = await axios.get("http://localhost:4000/data/posts")
        let posts = response.data
        posts.sort((a, b) => (a.date > b.date) ? -1 : 1)
        this.setState({posts : posts})  
    }

    getFilterdPosts = async () => {
        let response = await axios.get(`http://localhost:4000/data/posts/category/${this.state.filter}`)
        let posts = response.data
        posts.sort((a, b) => (a.date > b.date) ? -1 : 1)
        this.setState({posts : posts})  
    }

    async componentDidMount(){
        this.state.filter? await this.getFilterdPosts() :
        await this.getAllPosts()
    }


    render() {
        return (
            <div>
            {/* call filter comp */}
            <CreatePost phone={this.props.phone} getAllPosts={this.getAllPosts}/>
            <Results posts={this.state.posts} phone={this.props.phone}/>
        </div>
        )
    }
}
export default Feed;