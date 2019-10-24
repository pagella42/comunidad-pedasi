import React, { Component } from 'react';
import axios from 'axios';
import VerifyPost from './VerifyPost';
import ImageUpload from '../../../ImageUpload/ImageUpload'
import { withTranslation } from 'react-i18next';


class CreatePost extends Component {
    constructor() {
        super()
        this.state = {
            categories: [],
            post: {
                title: "",
                content: "",
                category: "other",
                points: 0,
                date: "",
                address: "",
                picture: "",
                anonymous: false,
                private: false,
                language:""
            },
            verifyPost: {
                show: false,
            },

        }
    }

    handleInputChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        let post = { ...this.state.post }
        post[name] = value
        this.setState({ post: post })
    }

    verifyPost = () => {
        let verifyPost = { ...this.state.verifyPost }
        verifyPost.show = true
        this.setState({ verifyPost: verifyPost })
    }

    confirmPost = async () => {
        let usersPhone = this.props.phone
        let post = { ...this.state.post }
        let date = new Date()
        post.date = date
        // the post object contains all information about the post - the usersPhone is used to uniquely identify the user in the backend
        let data = post
        await axios.post(`http://localhost:4000/data/post/${usersPhone}`, data)
        this.props.getPosts()
    }

    reviewPost = (action) => {
        let verifyPost = { ...this.state.verifyPost }
        verifyPost.show = false
        this.setState({ verifyPost: VerifyPost })
        if (action === "confirm") {
            this.confirmPost()
        }
    }

    validate = (event) => {
        event.preventDefault()
        this.state.post.language?
        this.verifyPost():
        alert('Please choose a language')
    }

    getCategories = async () => {
        let response = await axios.get("http://localhost:4000/data/categories")
        let categories = []
        if (response.data[0] === undefined) {
            categories = ["other"]
        } else {
            response.data.forEach(category => categories.push(category.name))
        }
        this.setState({ categories: categories })
    }

    saveUrl = (url) => {
        console.log(url)
        let post = { ...this.state.post }
        post.picture = url
        this.setState({ post: post })
    }

    async componentDidMount() {

        await this.getCategories()
    }

    anonymous = () => {
        let post = { ...this.state.post }
        if(this.state.post.anonymous){
            post.anonymous = false
            post.private = false
        }
        else{
            post.anonymous = true
            post.private = false
        }
        
        this.setState({ post: post })
    }

    private = () => {
        let post = { ...this.state.post }
        if(this.state.post.private){
            post.private = false
            post.anonymous= false
        }
        else{
            post.private = true
            post.anonymous= false
        }
        this.setState({ post: post })
    }
    

    render() {
        const {t,i18next} = this.props
        return (
            <div>
                <form onSubmit={this.validate}>
                <div onClick={this.props.showCreatePost}>X</div>
                <input required type="text" name="title" placeholder={t("Title")} onChange={this.handleInputChange} />
                <input required type="text" name="content" placeholder={t("Text")} onChange={this.handleInputChange} />
                <input required type="text" name="address" placeholder={t("Adress")} onChange={this.handleInputChange} />
                <select name="category" value={this.state.post.category} onChange={this.handleInputChange}>
                    {this.state.categories.map(category => <option value={category}>{t(category)}</option>)}
                </select>
                <select required name='language' value={this.state.post.language} onChange={this.handleInputChange}>
                    <option value={0}>-</option>
                    <option value='en'>English</option>
                    <option value='es'>Español</option>
                </select>
                
                <ImageUpload saveUrl={this.saveUrl} />
                {this.state.post.private ?
                    <input disabled type='button'  value={t("Hide username")}/>:
                    <div>
                        {/* button to post anonymously */}
                        <input type='button' onClick={this.anonymous} value={this.state.post.anonymous ? t("Show username") : t("Hide username")}/>
                        <br/>
                        {this.state.post.anonymous ?  t("Hiding username") : t("Showing username")}
                    </div>

                }

                <div>
                    {/* button to post privately */}
                    <input type='button' onClick={this.private} value={this.state.post.private ? t("Post to feed") : t("Send only to Municipality")}/>
                    <br/>
                    {this.state.post.private ? t("Sending only to Municipality") : t("Posting to feed")}
                </div>
                <input type='submit' value={t("Submit")}/>
                {/* Pop up : please review your post */}
                {this.state.verifyPost.show ? <VerifyPost reviewPost={this.reviewPost} post={this.state.post} /> : <div></div>}
                </form>


            </div>
        );
    }
}

export default withTranslation('translation') (CreatePost);