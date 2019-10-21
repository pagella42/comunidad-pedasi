import React, { Component } from 'react';
import Axios from 'axios';


class UserSearch extends Component {
    constructor(){
        super()
        this.state = {
            posts: [],
            users: [],
        }
    }
    getAllPosts = async () => {
        let response = await Axios.get('http://localhost:4000/data/posts')
        this.setState({ posts: response.data })
    }
    getAllUsers = async () => {
        let response = await Axios.get('http://localhost:4000/data/users')
        this.setState({ users: response.data})
    }
    componentDidMount(){
        this.getAllUsers()
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default UserSearch;