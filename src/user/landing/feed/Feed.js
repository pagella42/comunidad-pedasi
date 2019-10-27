import React, { Component } from 'react';
import Results from './results/Results'
import axios from 'axios';
import CreatePost from '../create-post/CreatePost';
import Filter from './filter/Filter';
import './feed.css'
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';
import Consts from '../../../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE

class Feed extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            showCreate: false
        }
    }

    getPosts = async (filter) => {
        let response = await axios.post(CREATE_ROUTE("data/posts"), filter)
        this.setState({ posts: response.data })
    }

    componentDidMount = () => this.getPosts()

    showCreatePost = async () => this.props.isLoggedIn ? this.setState({ showCreate: !this.state.showCreate }) : this.props.loginPopup()

    render() {
        const {t,i18n} = this.props
        return (

            <div id='feedcontainer'>
                <div id="feedinnercont">
                {
                    
                        <div>
                              <div id='postbuttoncont'><Fab  onClick={this.showCreatePost} variant="extended" color="primary" aria-label="add" >{t("POST SOMETHING")}</Fab></div>
                           
                            {this.state.showCreate ?
                                <CreatePost showCreatePost={this.showCreatePost} phone={this.props.phone} getPosts={this.getPosts} /> : null
                            }
                            <Filter getPosts={this.getPosts} />
                            <Results loginPopup={this.props.loginPopup} getPosts={this.getPosts}  posts={this.state.posts} phone={this.props.phone} />
                        </div>
                }
                </div>

             </div>
        )
    }
}
export default withTranslation('translation') (Feed);
