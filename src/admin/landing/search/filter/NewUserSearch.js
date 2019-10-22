import React, { Component } from 'react';
import Axios from 'axios'

class NewUserSearch extends Component {
    constructor(){
        super()
        this.state = {
            users : [],
            posts: [],
            user: { name: "", phone: "" },
            userResults : [],
        }
    } 

    handleChange = async (e) => {
        let name = e.target.value
        let phone = this.state.users.filter(user => user.name === name).map(c => c.phone)[0]
        let user = {...this.state.user}
        user.name = name
        user.phone = phone
        await this.setState({user: user})
        this.search()
    }

    search = async () => {
        debugger
        let posts = [...this.state.posts]
        let userResults = posts.filter(post => post.user.phone === this.state.user.phone)
        await this.setState({userResults : userResults})
        this.props.saveResults(this.state.userResults, "user")
    }

    getAllPosts = async () => {
        let response = await Axios.get('http://localhost:4000/data/posts')
        this.setState({ posts: response.data, userResults: response.data })
    }

    getAllUsers = async () => {
        let response = await Axios.get('http://localhost:4000/data/users')
        this.setState({ users: response.data })
    }

    componentDidMount(){
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
            </div>
        );
    }
}

export default NewUserSearch;