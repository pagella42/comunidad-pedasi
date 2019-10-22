import React, { Component } from 'react';
import Axios from 'axios'
class NewKeywordSearch extends Component {
    constructor() {
        super()
        this.state = {
            keywordResults: [],
            keywordSearch: [
                { name: "title", checked: false },
                { name: "content", checked: false },
                { name: "comments", checked: false },
                { name: "responses", checked: false },
            ],
            allPosts: [],
            keyword: "", 
        }
    }

    handleChange = async (e) => {
        let name = e.target.name
        if (name === "search-keyword") {
            let choice = e.target.id
            let checked = e.target.checked

            let keywordSearch = [...this.state.keywordSearch]
            let keywordIndex = keywordSearch.findIndex(keyword => keyword.name === choice)
            keywordSearch[keywordIndex].checked = checked
            await this.setState({ keywordSearch: keywordSearch })

        } else {
            let value = e.target.value
            await this.setState({ [name]: value })
        }
        this.handleSearch()
    }

    handleSearch = async () => {
        let keywordSearch = [...this.state.keywordSearch]
        let checkedCheckboxes = keywordSearch.filter(keyword => keyword.checked === true)
        let options = checkedCheckboxes
        await this.search(options, this.state.keyword)
    }


    search = async (options, text) => {
        let searchArray = text.toLowerCase()
        let filteredPosts = []
        let nothing
        this.state.posts.map(post => {
            options.forEach(option => {
                if (option.name === "comments" || option.name === "responses") {
                    post[option.name].forEach(name => {
                        let value = name.content.toLowerCase()
                        if (value.includes(searchArray)) {
                            filteredPosts.includes(post) ? nothing = null : filteredPosts.push(post)
                        } else { return undefined }
                    })
                } else {
                    let value = post[option.name].toLowerCase()
                    if (value.includes(searchArray)) {
                        filteredPosts.includes(post) ? nothing = null : filteredPosts.push(post)
                    } else { return undefined }
                }
            })
        })
        this.setState({ keywordResults: filteredPosts, posts: filteredPosts })
        await this.props.saveResults(filteredPosts, "keyword")
    }


    getAllPosts = async () => {
        let response = await Axios.get('http://localhost:4000/data/posts')
        this.setState({ posts: response.data })
    }

    componentDidMount() {
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
                    <input type="checkbox" name="search-keyword" id="content" onClick={this.handleChange} />
                    <label htmlFor="content-checkbox">content</label>
                </div>
                <div>
                    <input type="checkbox" name="search-keyword" id="comments" onClick={this.handleChange} />
                    <label htmlFor="comments-checkbox">comments</label>
                </div>
                <div>
                    <input type="checkbox" name="search-keyword" id="responses" onClick={this.handleChange} />
                    <label htmlFor="responses-checkbox">responses</label>
                </div>
            </div>
        );
    }

}

export default NewKeywordSearch;