import React, { Component } from 'react';
import Axios from 'axios';


class UserSearch extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            users: [],
            user: { name: "", phone: "" }, 
            postFromUser: [],
        }
    }
    handleChange = (e) => {
        let name = e.target.value
        let phone = this.state.users.filter(user => user.name === name).map(c => c.phone)[0]
        let user = {...this.state.user}
        user.name = name
        user.phone = phone
        this.setState({user: user})
    }

    search = () => {
        let posts = this.state.posts
        let postFromUser = posts.filter(post => post.user.phone === this.state.user.phone)
        this.setState({postFromUser : postFromUser})
        this.props.saveFoundPosts(postFromUser, "user")
    }

    getAllPosts = async () => {
        let response = await Axios.get('http://localhost:4000/data/posts')
        this.setState({ posts: response.data })
    }
    getAllUsers = async () => {
        let response = await Axios.get('http://localhost:4000/data/users')
        this.setState({ users: response.data })
    }
    componentDidMount() {
        this.getAllUsers()
        this.getAllPosts()
    }
    render() {
        return (
            <div>
                <div>
                    User:
                </div>
                <input type="text" placeholder="User name" list="data" onChange={this.handleChange} />
                <datalist id="data">
                    {this.state.users.map(user => <option value={user.name} key={user._id} />)}
                </datalist>
                <button onClick={this.search}>Search for posts from user</button>
            </div>
        );
    }
}

export default UserSearch;