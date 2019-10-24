import React, { Component } from 'react';
import Results from './results/Results'
import axios from 'axios';
import CreatePost from '../create-post/CreatePost';
import Filter from './filter/Filter';
import { withTranslation } from 'react-i18next';

class Feed extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            showCreate: false
        }
    }

    getPosts = async (filter) => {
        let response = await axios.post("http://localhost:4000/data/posts", filter)
        this.setState({ posts: response.data })
    }

    componentDidMount = () => this.getPosts()

    showCreatePost = async () => this.props.isLoggedIn ? this.setState({ showCreate: !this.state.showCreate }) : this.props.loginPopup()

    render() {
        const {t,i18n} = this.props
        return (
            <div>

                <button onClick={this.showCreatePost}>{t("POST SOMETHING")}</button>
                {this.state.showCreate ?
                    <CreatePost showCreatePost={this.showCreatePost} phone={this.props.phone} getPosts={this.getPosts} /> 
                    : null
                }
                <Filter getPosts={this.getPosts} />
                <Results posts={this.state.posts} phone={this.props.phone} getPosts={this.getPosts} />
            </div>
        )
    }
}
export default withTranslation('translation') (Feed);
