import React, { Component } from 'react';
import Results from './results/Results'
import axios from 'axios';
import CreatePost from '../create-post/CreatePost';
import Filter from './filter/Filter';
import './feed.css'
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';
import Consts from '../../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE

class Feed extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            showCreate: false,
            phone: "",
            filter:{},
            user:{}
        }
    }

    updateFilter = (filter, callback) => {
        this.setState({filter}, callback)
    }

    getPosts = () => {
        axios.post(CREATE_ROUTE("data/posts"), this.state.filter).then((response)=>{           
            this.setState({ posts: response.data })
         })
    }

    updateOnelike = (postId, toggleVote) => {
        console.log("start")
        let posts = [... this.state.posts]
        posts.find(post => post._id === postId).points+=toggleVote
        this.setState({posts}, ()=> console.log("end"))
    }

    updateOnecomment = (postId, comment) => {
        let posts = [... this.state.posts]
        posts.find(post => post._id === postId).comments.push(comment)
        this.setState({posts})
    }

    getUser = () => {
        if (localStorage.userLogin) {
            if (JSON.parse(localStorage.userLogin).isLoggedIn) {
                this.setState({ phone: JSON.parse(localStorage.userLogin).phone })
                axios.get(CREATE_ROUTE(`data/user/${JSON.parse(localStorage.userLogin).phone}`)).then((response) => {
                    this.setState({ user: response.data })
                })
            }
        }
    }

    componentDidMount = () => {
        this.getPosts()
        this.getUser()
    }

    showCreatePost = async () => {
        if (localStorage.userLogin !== undefined) {
            if (JSON.parse(localStorage.userLogin).isLoggedIn) {
                this.setState({ showCreate: !this.state.showCreate, phone: JSON.parse(localStorage.userLogin).phone })
            } else { this.props.loginPopup() }
        } else {
            this.props.loginPopup()
        }}


        render() {
            const { t, i18n } = this.props
            return (

                <div id='feedcontainer'>
                    <div id="feedinnercont">
                        {

                            <div>
                                <div id='postbuttoncont'><Fab onClick={this.showCreatePost} variant="extended" color="primary" aria-label="add" >{t("POST SOMETHING")}</Fab></div>

                                {this.state.showCreate ?
                                    <CreatePost showCreatePost={this.showCreatePost} phone={this.state.phone} getPosts={this.getPosts} /> : null
                                }
                                <Filter getPosts={this.getPosts} 
                                updateFilter={this.updateFilter}/>
                                <Results 
                                user={this.state.user}
                                phone={this.state.phone}
                                updateOnelike={this.updateOnelike} 
                                updateOnecomment={this.updateOnecomment} 
                                loginPopup={this.props.loginPopup} 
                                getPosts={this.getPosts} 
                                posts={this.state.posts} phone={this.state.phone} />
                            </div>
                        }
                    </div>

                </div>
            )
        }
    }
    export default withTranslation('translation') (Feed);
