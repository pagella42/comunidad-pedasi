import React, { Component } from 'react';
import Results from './results/Results'
import axios from 'axios';
import CreatePost from '../create-post/CreatePost';
import Filter from './filter/Filter';
class Feed extends Component {
    constructor(){
        super()
        this.state={
            posts: [],
      
        }
    }

    getPosts = async (parameters) => {
        // create a loader here
        let response = await axios.get("http://localhost:4000/data/posts")
        let posts = response.data

        this.setState({posts : posts})  
    }

    async componentDidMount(){
        await this.getPosts()
    }


    render() {
        return (
            <div>
            <CreatePost phone={this.props.phone} getPosts={this.getPosts}/>
            <Filter getPosts={this.getPosts}/>
            <Results posts={this.state.posts} phone={this.props.phone}/>
        </div>
        )
    }
}
export default Feed;