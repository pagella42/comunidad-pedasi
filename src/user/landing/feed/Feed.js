import React, { Component } from 'react';
import Results from './results/Results'
import axios from 'axios';
import CreatePost from '../create-post/CreatePost';
class Feed extends Component {
    constructor(){
        super()
        this.state={
            posts: []
        }
    }

    getAllPosts = async () => {
        // create a loader here
        let response = await axios.get("http://localhost:4000/data/posts")
        let posts = response.data
        posts.sort((a, b) => (a.date > b.date) ? -1 : 1)
        this.setState({posts : posts})
    }

    async componentDidMount(){
        this.getAllPosts()
    }


    render() {
        return (
            <div>
            {/* call filter comp */}
            <CreatePost getAllPosts={this.getAllPosts}/>
            <Results posts={this.state.posts}/>
        </div>
        )
    }
}
export default Feed;