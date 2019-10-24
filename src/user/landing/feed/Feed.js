import React, { Component } from 'react';
import Results from './results/Results'
import axios from 'axios';
import CreatePost from '../create-post/CreatePost';
import Filter from './filter/Filter';
import './feed.css'
import Fab from '@material-ui/core/Fab';


import Button from '@material-ui/core/Button';
class Feed extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            showCreate: false,
            user: [],
        }
    }

    getPosts = async (filter) => {
        let response = await axios.post("http://localhost:4000/data/posts", filter)
        const user = await axios.get(`http://localhost:4000/data/user/${this.props.phone}`)
        this.setState({ posts: response.data, user: user.data })
    }

    componentDidMount() {
        this.getPosts()


    }

    showCreatePost = async () => {
        if (this.props.isLoggedIn) {
            await this.setState({ showCreate: !this.state.showCreate })
        }
        else {
            this.props.loginPopup()
        }
    }


    render() {
        return (
            <div id='feedcontainer'>
                <div id="feedinnercont">
                {
                    this.state.user.ban ?

                        <h3>{this.state.user.banReason}</h3> :

                        <div>
                              <div id='postbuttoncont'><Fab  onClick={this.showCreatePost} variant="extended" color="primary" aria-label="add" >Post something </Fab></div>
                           
                            {this.state.showCreate ?
                                <CreatePost showCreatePost={this.showCreatePost} phone={this.props.phone} getPosts={this.getPosts} /> : null
                            }
                            <Filter getPosts={this.getPosts} />
                            <Results loginPopup={this.props.loginPopup}  posts={this.state.posts} phone={this.props.phone} />
                        </div>
                }
                </div>
            </div>
        )
    }
}
export default Feed;
