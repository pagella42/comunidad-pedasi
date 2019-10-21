import React, { Component } from 'react';
import Axios from 'axios';

class Filter extends Component {
    constructor() {
        super()
        this.state = {
            keyword: "",
            found: [],
            posts: [],
            keywordSearch: [
                {name: "title", checked: false},
                {name: "text", checked: false},
                {name: "comments", checked: false},
                {name: "responses", checked: false},

            ]
        }
    }

    handleChange = (e) => {
        let name = e.target.name
        if (name === "search-keyword") {
            let choice = e.target.id
            let checked = e.target.checked

            let keywordSearch = [...this.state.keywordSearch]
            let keywordIndex = keywordSearch.findIndex(keyword => keyword.name === choice)
            keywordSearch[keywordIndex].checked = checked
            this.setState({ keywordSearch: keywordSearch })

        } else {
            let value = e.target.value
            this.setState({ [name]: value })
        }
    }

    handleSearch = () => {
        let keywordSearch = [ ...this.state.keywordSearch ]
        let checkedCheckboxes = keywordSearch.filter(keyword => keyword.checked === true)
        let options = checkedCheckboxes
        this.search(options, this.state.keyword)
    }

    getAllPosts = async () => {
        let response = await Axios.get('http://localhost:4000/data/posts')
        this.setState({posts: response.data})
    }

    search = (options, text) => {
        let searchArray = text.toLowerCase()
        let filteredPosts = []
        this.state.posts.map(post => {
             options.forEach(option => {
                let value = post[option.name].toLowerCase()
                if (value.includes(searchArray)) {
                    filteredPosts.push(post)
                } else { return undefined }
            })
        })
        this.setState({ found: filteredPosts })
    }

    componentDidMount(){
        this.getAllPosts()
    }

    render() {
        return (
            <div>
                <input type="text" name="keyword" placeholder="Search by Keyword" onChange={this.handleChange} />
                <div>
                    <input type="checkbox" name="search-keyword" id="title" onClick={this.handleChange} />
                    <label htmlFor="title-checkbox">title</label>
                </div>
                <div>
                    <input type="checkbox" name="search-keyword" id="text" onClick={this.handleChange} />
                    <label htmlFor="text-checkbox">text</label>
                </div>
                <div>
                    <input type="checkbox" name="search-keyword" id="comments" onClick={this.handleChange} />
                    <label htmlFor="comments-checkbox">comments</label>
                </div>
                <div>
                    <input type="checkbox" name="search-keyword" id="responses" onClick={this.handleChange} />
                    <label htmlFor="response-checkbox">response</label>
                </div>
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default Filter;