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

    getPosts = async (filter) => {
        // create a loader here
        console.log(filter)
        let response = await axios.post("http://localhost:4000/data/posts", filter)
        let posts = response.data
        console.log(posts.map(p => p.points))

        this.setState({posts : posts}) 
        
        console.log(this.state.posts.map(p => p.points))
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